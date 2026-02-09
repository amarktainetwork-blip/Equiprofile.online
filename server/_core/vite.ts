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
    // Skip if it's an API route or static asset
    if (
      req.originalUrl.startsWith("/api/") ||
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

        // Inject CSP nonce if available
        const nonce = res.locals.cspNonce;
        if (nonce) {
          // Add nonce to any inline scripts (for vite-plugin-manus-runtime or other plugins)
          template = template.replace(
            /<script(?!\s+src=)([^>]*)>/gi,
            `<script$1 nonce="${nonce}">`,
          );
        }

        const page = await vite.transformIndexHtml(url, template);
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

  // Serve static files with explicit MIME types and cache headers
  app.use(
    express.static(distPath, {
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
        // NO CACHE for index.html and service-worker.js to prevent stale versions
        if (filePath.endsWith("index.html")) {
          res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
          res.setHeader("Pragma", "no-cache");
          res.setHeader("Expires", "0");
        } else if (filePath.endsWith("service-worker.js")) {
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
  app.use((req, res, next) => {
    // Skip if it's an API route
    if (req.originalUrl.startsWith("/api/")) {
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

    if (nonce && fs.existsSync(indexPath)) {
      fs.readFile(indexPath, "utf-8", (err, html) => {
        if (err) {
          return res.status(500).send("Internal Server Error");
        }

        // Add nonce to any inline scripts (for manus-runtime or other plugins)
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
