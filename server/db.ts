import "./env";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import type { Sql } from "postgres";
import * as schema from "@shared/schema";

const databaseUrl = process.env.DATABASE_URL;

export let db: ReturnType<typeof drizzle> | null = null;
let sqlClient: Sql | null = null;
let databaseReady = false;

export function isDatabaseReady() {
  return databaseReady && db !== null;
}

/** Test connection and enable DB only when Supabase is reachable with tables. */
export async function initDbConnection(): Promise<boolean> {
  if (!databaseUrl) {
    console.log("DATABASE_URL not set — using local file storage for users");
    return false;
  }

  try {
    sqlClient = postgres(databaseUrl, {
      connect_timeout: 15,
      idle_timeout: 20,
      max: 3,
    });
    await sqlClient`SELECT 1`;
    // Verify users table exists (db:push must have run)
    await sqlClient`SELECT 1 FROM users LIMIT 1`;
    db = drizzle(sqlClient, { schema });
    databaseReady = true;
    return true;
  } catch (error) {
    console.warn(
      "PostgreSQL unavailable — using local file storage for users.",
      error instanceof Error ? error.message : error,
    );
    if (sqlClient) {
      try {
        await sqlClient.end({ timeout: 2 });
      } catch {
        /* ignore */
      }
    }
    sqlClient = null;
    db = null;
    databaseReady = false;
    return false;
  }
}
