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
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  // Serve static files with explicit MIME types
  app.use(express.static(distPath, {
    setHeaders: (res, filePath) => {
      // Ensure correct MIME types for assets
      if (filePath.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      } else if (filePath.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      } else if (filePath.endsWith('.json')) {
        res.setHeader('Content-Type', 'application/json');
      } else if (filePath.endsWith('.woff') || filePath.endsWith('.woff2')) {
        res.setHeader('Content-Type', 'font/woff2');
      } else if (filePath.endsWith('.svg')) {
        res.setHeader('Content-Type', 'image/svg+xml');
      }
      
      // Ensure service worker has correct MIME type
      if (filePath.endsWith('service-worker.js')) {
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Service-Worker-Allowed', '/');
      }
    }
  }));

  // SPA fallback - serve index.html ONLY for navigation requests
  // NOT for asset requests (prevents CSS/JS returning HTML)
  app.use("*", (req, res) => {
    // Don't fallback to index.html for asset paths
    if (req.originalUrl.startsWith('/assets/') || 
        req.originalUrl.endsWith('.js') || 
        req.originalUrl.endsWith('.css') || 
        req.originalUrl.endsWith('.json') ||
        req.originalUrl.endsWith('.map') ||
        req.originalUrl.endsWith('.woff') ||
        req.originalUrl.endsWith('.woff2') ||
        req.originalUrl.endsWith('.svg') ||
        req.originalUrl.endsWith('.png') ||
        req.originalUrl.endsWith('.jpg') ||
        req.originalUrl.endsWith('.jpeg') ||
        req.originalUrl.endsWith('.gif') ||
        req.originalUrl.endsWith('.ico')) {
      return res.status(404).send('Not Found');
    }
    
    // Serve index.html for all other routes (SPA navigation)
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
