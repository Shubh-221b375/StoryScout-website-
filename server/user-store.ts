import { eq } from "drizzle-orm";
import { users } from "@shared/schema";
import type { SiteUser, UserRole } from "@shared/types";
import { hashPassword } from "./auth";
import { dataStore } from "./data-store";
import { db, isDatabaseReady } from "./db";

const DEFAULT_USERS: Array<{
  id: string;
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
}> = [
  {
    id: "admin-1",
    email: "admin@storyscout.in",
    password: "admin123",
    fullName: "StoryScout Admin",
    role: "admin",
  },
  {
    id: "employee-1",
    email: "team@storyscout.in",
    password: "team123",
    fullName: "StoryScout Team",
    role: "employee",
  },
  {
    id: "test-admin-1",
    email: "test@storyscout.in",
    password: "test123",
    fullName: "Test Admin",
    role: "admin",
  },
];

function rowToSiteUser(row: typeof users.$inferSelect): SiteUser {
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.passwordHash,
    fullName: row.fullName,
    phone: row.phone ?? undefined,
    role: row.role as UserRole,
    createdAt: row.createdAt?.toISOString() ?? new Date().toISOString(),
  };
}

export const userStore = {
  usesDatabase: () => isDatabaseReady(),

  async getUserById(id: string): Promise<SiteUser | undefined> {
    if (!isDatabaseReady() || !db) return dataStore.getUserById(id);
    try {
      const rows = await db.select().from(users).where(eq(users.id, id)).limit(1);
      return rows[0] ? rowToSiteUser(rows[0]) : undefined;
    } catch {
      return dataStore.getUserById(id);
    }
  },

  async getUserByEmail(email: string): Promise<SiteUser | undefined> {
    if (!isDatabaseReady() || !db) return dataStore.getUserByEmail(email);
    try {
      const rows = await db
        .select()
        .from(users)
        .where(eq(users.email, email.toLowerCase()))
        .limit(1);
      return rows[0] ? rowToSiteUser(rows[0]) : undefined;
    } catch {
      return dataStore.getUserByEmail(email);
    }
  },

  async getUsers(): Promise<SiteUser[]> {
    if (!isDatabaseReady() || !db) return dataStore.getUsers();
    try {
      const rows = await db.select().from(users);
      return rows.map(rowToSiteUser);
    } catch {
      return dataStore.getUsers();
    }
  },

  async createUser(input: {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    role?: UserRole;
  }): Promise<SiteUser> {
    const email = input.email.toLowerCase();
    const passwordHash = hashPassword(input.password);

    if (!isDatabaseReady() || !db) {
      return dataStore.createUser({ ...input, email });
    }

    try {
      const [row] = await db
        .insert(users)
        .values({
          email,
          passwordHash,
          fullName: input.fullName,
          phone: input.phone,
          role: input.role ?? "customer",
        })
        .returning();
      return rowToSiteUser(row);
    } catch (error) {
      console.warn("DB insert failed, saving user locally:", error);
      return dataStore.createUser({ ...input, email });
    }
  },

  async updateUserRole(id: string, role: UserRole): Promise<SiteUser> {
    if (!isDatabaseReady() || !db) return dataStore.updateUserRole(id, role);

    try {
      const [row] = await db
        .update(users)
        .set({ role })
        .where(eq(users.id, id))
        .returning();
      if (!row) throw new Error("User not found");
      return rowToSiteUser(row);
    } catch {
      return dataStore.updateUserRole(id, role);
    }
  },

  async reloadUsers(): Promise<void> {
    if (!isDatabaseReady()) dataStore.reloadUsers();
  },

  async ensureDefaultUsers(): Promise<void> {
    if (!isDatabaseReady() || !db) {
      dataStore.reloadUsers();
      return;
    }

    for (const user of DEFAULT_USERS) {
      const existing = await this.getUserByEmail(user.email);
      if (!existing) {
        await db.insert(users).values({
          id: user.id,
          email: user.email,
          passwordHash: hashPassword(user.password),
          fullName: user.fullName,
          role: user.role,
        });
      }
    }
  },
};
