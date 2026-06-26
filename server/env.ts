import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv } from "./load-env";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
loadEnv(root);
