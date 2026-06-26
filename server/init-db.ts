import { userStore } from "./user-store";
import { initDbConnection } from "./db";

export async function initDatabase() {
  const connected = await initDbConnection();
  if (!connected) {
    console.log("User accounts saved to .local/site-data.json");
    return;
  }

  try {
    await userStore.ensureDefaultUsers();
    console.log("Database connected — users stored in PostgreSQL");
  } catch (error) {
    console.warn("Could not seed default users in database:", error);
  }
}
