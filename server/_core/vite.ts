import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  // SPA fallback for development - serve index.html for non-static routes
  app.use((req, res, next) => {
    // Skip if it's an API route, tRPC route, or static asset
    if (
      req.originalUrl.startsWith("/api/") ||
      req.originalUrl.startsWith("/trpc") ||
      req.originalUrl.startsWith("/assets/") ||
      req.originalUrl.match(/\.[a-z0-9]+$/i)
    ) {
      return next();
    }

    const url = req.originalUrl;

    (async () => {
      try {
        const clientTemplate = path.resolve(
          import.meta.dirname,
          "../..",
          "client",
          "index.html",
        );

        // always reload the index.html file from disk incase it changes
        let template = await fs.promises.readFile(clientTemplate, "utf-8");
        template = template.replace(
          `src="/src/main.tsx"`,
          `src="/src/main.tsx?v=${nanoid()}"`,
        );

        // Transform first so Vite plugins (e.g. vite-plugin-manus-runtime) can
        // inject their own inline <script> blocks, THEN apply the nonce so that
        // ALL inline scripts (source + injected) carry the same per-request nonce.
        const rawPage = await vite.transformIndexHtml(url, template);

        const nonce = res.locals.cspNonce;
        const page = nonce
          ? rawPage.replace(
              /<script(?!\s+src=)([^>]*)>/gi,
              `<script$1 nonce="${nonce}">`,
            )
          : rawPage;

        res.status(200).set({ "Content-Type": "text/html" }).end(page);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    })();
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // File extensions that should NOT fall through to SPA
  const STATIC_FILE_EXTENSIONS = [
    ".js",
    ".css",
    ".json",
    ".map",
    ".woff",
    ".woff2",
    ".svg",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".ico",
    ".txt",
    ".mp4",
    ".webm",
  ];

  // Serve static files with explicit MIME types and cache headers.
  // index:false is REQUIRED so that express.static does NOT auto-serve
  // dist/public/index.html for the "/" route.  If it did, the response
  // would bypass the SPA fallback below, meaning the per-request CSP nonce
  // would never be injected into the inline scripts → blank white screen.
  //
  // Similarly, redirect direct requests to /index.html so they also go
  // through the SPA fallback (nonce injection).
  app.use((req, _res, next) => {
    // Let the SPA fallback handle index.html directly so nonce injection runs.
    if (req.path === "/index.html") {
      req.url = "/";
    }
    next();
  });

  app.use(
    express.static(distPath, {
      index: false,
      setHeaders: (res, filePath) => {
        // Ensure correct MIME types for assets
        if (filePath.endsWith(".js")) {
          res.setHeader("Content-Type", "application/javascript");
        } else if (filePath.endsWith(".css")) {
          res.setHeader("Content-Type", "text/css");
        } else if (filePath.endsWith(".json")) {
          res.setHeader("Content-Type", "application/json");
        } else if (filePath.endsWith(".woff")) {
          res.setHeader("Content-Type", "font/woff");
        } else if (filePath.endsWith(".woff2")) {
          res.setHeader("Content-Type", "font/woff2");
        } else if (filePath.endsWith(".svg")) {
          res.setHeader("Content-Type", "image/svg+xml");
        }

        // Cache control headers
        // service-worker.js must not be cached (stale SW breaks offline functionality)
        if (filePath.endsWith("service-worker.js")) {
          res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
          res.setHeader("Pragma", "no-cache");
          res.setHeader("Expires", "0");
          res.setHeader("Content-Type", "application/javascript");
          res.setHeader("Service-Worker-Allowed", "/");
        } else if (filePath.includes("/assets/")) {
          // Hashed assets: aggressive caching (immutable)
          // Note: filePath is resolved by express.static, so this safely matches /assets/ directory
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }
      },
    }),
  );

  // SPA fallback - serve index.html ONLY for navigation requests
  // NOT for asset requests (prevents CSS/JS returning HTML)
  // NOTE: express.static above is configured with index:false so it does NOT
  // serve index.html for directory requests (e.g. "/"). All HTML delivery
  // goes through this fallback, which injects the per-request CSP nonce.
  app.use((req, res, next) => {
    // Skip if it's an API or tRPC route — must never serve HTML for these
    if (
      req.originalUrl.startsWith("/api/") ||
      req.originalUrl.startsWith("/trpc")
    ) {
      return next();
    }

    // Don't fallback to index.html for asset paths or files with extensions
    const isStaticFile =
      req.originalUrl.startsWith("/assets/") ||
      STATIC_FILE_EXTENSIONS.some((ext) => req.originalUrl.endsWith(ext));

    if (isStaticFile) {
      return res.status(404).send("Not Found");
    }

    // Serve index.html for all other routes (SPA navigation)
    // Inject CSP nonce into inline scripts if present
    const indexPath = path.resolve(distPath, "index.html");
    const nonce = res.locals.cspNonce;

    // index.html must never be cached so users always get the latest version
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    if (nonce && fs.existsSync(indexPath)) {
      fs.readFile(indexPath, "utf-8", (err, html) => {
        if (err) {
          return res.status(500).send("Internal Server Error");
        }

        // Add nonce to every inline <script> tag (scripts without src=, e.g.
        // the JSON-LD block and the vite-plugin-manus-runtime bundle).
        // The regex excludes tags whose FIRST attribute is src= (external
        // scripts) which are already permitted by CSP's 'self' directive.
        const modifiedHtml = html.replace(
          /<script(?!\s+src=)([^>]*)>/gi,
          `<script$1 nonce="${nonce}">`,
        );

        res.setHeader("Content-Type", "text/html");
        res.send(modifiedHtml);
      });
    } else {
      res.sendFile(indexPath);
    }
  });
}
