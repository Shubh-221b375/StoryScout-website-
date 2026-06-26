import fs from "node:fs";
import { type Server } from "node:http";
import path from "node:path";

import express, { type Express, type Request } from "express";

import runApp from "./app";

export async function serveStatic(app: Express, _server: Server) {
  const distPath = path.resolve(import.meta.dirname, "public");
  const indexPath = path.resolve(distPath, "index.html");

  if (!fs.existsSync(indexPath)) {
    throw new Error(
      `Could not find ${indexPath}. Run "npm run build" before starting the server.`,
    );
  }

  app.use(express.static(distPath, { index: "index.html", fallthrough: true }));

  // SPA fallback — only for HTML navigations (not static files)
  app.get(/^(?!\/api).*/, (req, res, next) => {
    if (path.extname(req.path)) return next();
    res.sendFile(indexPath);
  });
}

(async () => {
  await runApp(serveStatic);
})();
