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

  app.use(express.static(distPath));

  // SPA fallback — serve index.html for client-side routes
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(indexPath);
  });
}

(async () => {
  await runApp(serveStatic);
})();
