import fs from "node:fs";
import path from "node:path";
import type {
  SiteBooking,
  SitePackage,
  SiteRegion,
  SiteReview,
  SiteUser,
  UserRole,
} from "@shared/types";
import { hashPassword } from "./auth";

interface StoreData {
  users: SiteUser[];
  packages: SitePackage[];
  regions: SiteRegion[];
  reviews: SiteReview[];
  bookings: SiteBooking[];
  seeded: boolean;
}

const DATA_DIR = path.resolve(import.meta.dirname, "..", ".local");
const DATA_FILE = path.join(DATA_DIR, "site-data.json");

function defaultData(): StoreData {
  return {
    users: [],
    packages: [],
    regions: [],
    reviews: [],
    bookings: [],
    seeded: false,
  };
}

class DataStore {
  private data: StoreData = defaultData();

  constructor() {
    this.load();
    if (!this.data.seeded) {
      this.seed();
    }
    this.ensureDefaultUsers();
  }

  private ensureDefaultUsers() {
    const defaults: Array<{
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

    let changed = false;
    for (const user of defaults) {
      if (!this.data.users.some((u) => u.email === user.email)) {
        this.data.users.push({
          id: user.id,
          email: user.email,
          passwordHash: hashPassword(user.password),
          fullName: user.fullName,
          role: user.role,
          createdAt: new Date().toISOString(),
        });
        changed = true;
      }
    }
    if (changed) this.save();
  }

  private load() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        this.data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
      }
    } catch {
      this.data = defaultData();
    }
  }

  private save() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(this.data, null, 2));
  }

  /** Reload users from disk (picks up new accounts without server restart). */
  reloadUsers() {
    try {
      if (!fs.existsSync(DATA_FILE)) return;
      const fresh = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8")) as StoreData;
      this.data.users = fresh.users ?? [];
      this.ensureDefaultUsers();
    } catch {
      // keep in-memory users on read failure
    }
  }

  private seed() {
    const now = new Date().toISOString();
    this.data.users = [
      {
        id: "admin-1",
        email: "admin@storyscout.in",
        passwordHash: hashPassword("admin123"),
        fullName: "StoryScout Admin",
        role: "admin",
        createdAt: now,
      },
      {
        id: "employee-1",
        email: "team@storyscout.in",
        passwordHash: hashPassword("team123"),
        fullName: "StoryScout Team",
        role: "employee",
        createdAt: now,
      },
    ];
    this.data.reviews = [
      {
        id: "review-1",
        name: "Aarav Sharma",
        rating: 5,
        message:
          "Flawless logistics and stunning summit sunrise. StoryScout made Kuari Pass feel effortless.",
        approved: true,
        featured: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
      },
      {
        id: "review-2",
        name: "Riya Mehta",
        rating: 5,
        message:
          "Brahmatal in peak winter was magical—warm meals, cozy tents, and a super caring trek lead.",
        approved: true,
        featured: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
      },
      {
        id: "review-3",
        name: "Karan Verma",
        rating: 4,
        message:
          "Great briefing and safety focus. Would join again for Pangarchulla next season!",
        approved: true,
        featured: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
      },
    ];
    this.data.seeded = true;
    this.save();
  }

  // Users
  getUsers() {
    return this.data.users;
  }

  getUserById(id: string) {
    return this.data.users.find((u) => u.id === id);
  }

  getUserByEmail(email: string) {
    return this.data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  createUser(input: {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    role?: UserRole;
  }) {
    const user: SiteUser = {
      id: crypto.randomUUID(),
      email: input.email.toLowerCase(),
      passwordHash: hashPassword(input.password),
      fullName: input.fullName,
      phone: input.phone,
      role: input.role ?? "customer",
      createdAt: new Date().toISOString(),
    };
    this.data.users.push(user);
    this.save();
    return user;
  }

  updateUserRole(id: string, role: UserRole) {
    const user = this.getUserById(id);
    if (!user) throw new Error("User not found");
    user.role = role;
    this.save();
    return user;
  }

  // Packages
  getPackages() {
    return this.data.packages;
  }

  getPackage(id: string) {
    return this.data.packages.find((p) => p.id === id);
  }

  createPackage(pkg: SitePackage) {
    this.data.packages.push(pkg);
    this.save();
    return pkg;
  }

  updatePackage(id: string, updates: Partial<SitePackage>) {
    const index = this.data.packages.findIndex((p) => p.id === id);
    if (index === -1) throw new Error("Package not found");
    this.data.packages[index] = { ...this.data.packages[index], ...updates, id };
    this.save();
    return this.data.packages[index];
  }

  deletePackage(id: string) {
    this.data.packages = this.data.packages.filter((p) => p.id !== id);
    this.save();
  }

  importPackages(packages: SitePackage[]) {
    this.data.packages = packages;
    this.save();
    return this.data.packages;
  }

  // Regions
  getRegions() {
    return this.data.regions;
  }

  importRegions(regions: SiteRegion[]) {
    this.data.regions = regions;
    this.save();
    return this.data.regions;
  }

  // Reviews
  getReviews(includeUnapproved = false) {
    return includeUnapproved
      ? this.data.reviews
      : this.data.reviews.filter((r) => r.approved);
  }

  getReview(id: string) {
    return this.data.reviews.find((r) => r.id === id);
  }

  createReview(review: Omit<SiteReview, "id" | "createdAt">) {
    const item: SiteReview = {
      ...review,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    this.data.reviews.unshift(item);
    this.save();
    return item;
  }

  updateReview(id: string, updates: Partial<SiteReview>) {
    const index = this.data.reviews.findIndex((r) => r.id === id);
    if (index === -1) throw new Error("Review not found");
    this.data.reviews[index] = { ...this.data.reviews[index], ...updates, id };
    this.save();
    return this.data.reviews[index];
  }

  deleteReview(id: string) {
    this.data.reviews = this.data.reviews.filter((r) => r.id !== id);
    this.save();
  }

  // Bookings
  getBookings() {
    return this.data.bookings;
  }

  getBooking(id: string) {
    return this.data.bookings.find((b) => b.id === id);
  }

  createBooking(booking: Omit<SiteBooking, "id" | "createdAt">) {
    const item: SiteBooking = {
      ...booking,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    this.data.bookings.unshift(item);
    this.save();
    return item;
  }

  updateBooking(id: string, updates: Partial<SiteBooking>) {
    const index = this.data.bookings.findIndex((b) => b.id === id);
    if (index === -1) throw new Error("Booking not found");
    this.data.bookings[index] = { ...this.data.bookings[index], ...updates, id };
    this.save();
    return this.data.bookings[index];
  }

  getDashboardStats() {
    const bookings = this.data.bookings;
    const pending = bookings.filter((b) => b.status === "pending").length;
    const confirmed = bookings.filter((b) => b.status === "confirmed").length;
    const revenue = bookings
      .filter((b) => b.status !== "cancelled")
      .reduce((sum, b) => {
        const pkg = this.getPackage(b.packageId);
        return sum + (pkg ? pkg.price * b.numberOfPeople : 0);
      }, 0);

    return {
      totalPackages: this.data.packages.length,
      totalBookings: bookings.length,
      pendingBookings: pending,
      confirmedBookings: confirmed,
      totalReviews: this.data.reviews.length,
      approvedReviews: this.data.reviews.filter((r) => r.approved).length,
      totalUsers: this.data.users.filter((u) => u.role === "customer").length,
      staffUsers: this.data.users.filter((u) => u.role !== "customer").length,
      estimatedRevenue: revenue,
      recentBookings: bookings.slice(0, 5),
    };
  }
}

export const dataStore = new DataStore();
