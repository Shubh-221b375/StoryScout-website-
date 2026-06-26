import { type Region, type InsertRegion, type Package, type InsertPackage, type Booking, type InsertBooking, regions, packages, bookings } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Regions
  getRegions(): Promise<Region[]>;
  getRegion(id: string): Promise<Region | undefined>;
  createRegion(region: InsertRegion): Promise<Region>;
  
  // Packages
  getPackages(): Promise<Package[]>;
  getPackagesByRegion(regionId: string): Promise<Package[]>;
  getPackage(id: string): Promise<Package | undefined>;
  getPackageBySlug(slug: string): Promise<Package | undefined>;
  createPackage(pkg: InsertPackage): Promise<Package>;
  updatePackage(id: string, pkg: Partial<InsertPackage>): Promise<Package>;
  
  // Bookings
  getBookings(): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: string, booking: Partial<InsertBooking>): Promise<Booking>;
}

export class DatabaseStorage implements IStorage {
  async getRegions(): Promise<Region[]> {
    if (!db) throw new Error("Database not available");
    return await db.select().from(regions).orderBy(regions.displayOrder || regions.name);
  }

  async getRegion(id: string): Promise<Region | undefined> {
    if (!db) throw new Error("Database not available");
    const result = await db.select().from(regions).where(eq(regions.id, id)).limit(1);
    return result[0];
  }

  async createRegion(region: InsertRegion): Promise<Region> {
    if (!db) throw new Error("Database not available");
    const result = await db.insert(regions).values(region).returning();
    return result[0];
  }

  async getPackages(): Promise<Package[]> {
    if (!db) throw new Error("Database not available");
    return await db.select().from(packages).orderBy(packages.createdAt);
  }

  async getPackagesByRegion(regionId: string): Promise<Package[]> {
    if (!db) throw new Error("Database not available");
    return await db.select().from(packages).where(eq(packages.regionId, regionId)).orderBy(packages.title);
  }

  async getPackage(id: string): Promise<Package | undefined> {
    if (!db) throw new Error("Database not available");
    const result = await db.select().from(packages).where(eq(packages.id, id)).limit(1);
    return result[0];
  }

  async getPackageBySlug(slug: string): Promise<Package | undefined> {
    if (!db) throw new Error("Database not available");
    const result = await db.select().from(packages).where(eq(packages.slug, slug)).limit(1);
    return result[0];
  }

  async createPackage(pkg: InsertPackage): Promise<Package> {
    if (!db) throw new Error("Database not available");
    const result = await db.insert(packages).values(pkg).returning();
    return result[0];
  }

  async updatePackage(id: string, pkg: Partial<InsertPackage>): Promise<Package> {
    if (!db) throw new Error("Database not available");
    const result = await db.update(packages).set({ ...pkg, updatedAt: new Date() }).where(eq(packages.id, id)).returning();
    return result[0];
  }

  async getBookings(): Promise<Booking[]> {
    if (!db) throw new Error("Database not available");
    return await db.select().from(bookings).orderBy(bookings.createdAt);
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    if (!db) throw new Error("Database not available");
    const result = await db.select().from(bookings).where(eq(bookings.id, id)).limit(1);
    return result[0];
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    if (!db) throw new Error("Database not available");
    const result = await db.insert(bookings).values(booking).returning();
    return result[0];
  }

  async updateBooking(id: string, booking: Partial<InsertBooking>): Promise<Booking> {
    if (!db) throw new Error("Database not available");
    const result = await db.update(bookings).set(booking).where(eq(bookings.id, id)).returning();
    return result[0];
  }
}

export class MockStorage implements IStorage {
  private mockRegions: Region[] = [];
  private mockPackages: Package[] = [];
  private mockBookings: Booking[] = [];

  async getRegions(): Promise<Region[]> {
    return this.mockRegions;
  }

  async getRegion(id: string): Promise<Region | undefined> {
    return this.mockRegions.find(r => r.id === id);
  }

  async createRegion(region: InsertRegion): Promise<Region> {
    const newRegion: Region = {
      id: crypto.randomUUID(),
      ...region,
      displayOrder: region.displayOrder ?? 0,
    } as Region;
    this.mockRegions.push(newRegion);
    return newRegion;
  }

  async getPackages(): Promise<Package[]> {
    return this.mockPackages;
  }

  async getPackagesByRegion(regionId: string): Promise<Package[]> {
    return this.mockPackages.filter(p => p.regionId === regionId);
  }

  async getPackage(id: string): Promise<Package | undefined> {
    return this.mockPackages.find(p => p.id === id);
  }

  async getPackageBySlug(slug: string): Promise<Package | undefined> {
    return this.mockPackages.find(p => p.slug === slug);
  }

  async createPackage(pkg: InsertPackage): Promise<Package> {
    const newPackage: Package = {
      id: crypto.randomUUID(),
      ...pkg,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Package;
    this.mockPackages.push(newPackage);
    return newPackage;
  }

  async updatePackage(id: string, pkg: Partial<InsertPackage>): Promise<Package> {
    const index = this.mockPackages.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Package not found");
    this.mockPackages[index] = { ...this.mockPackages[index], ...pkg, updatedAt: new Date() } as Package;
    return this.mockPackages[index];
  }

  async getBookings(): Promise<Booking[]> {
    return this.mockBookings;
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    return this.mockBookings.find(b => b.id === id);
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const newBooking: Booking = {
      id: crypto.randomUUID(),
      ...booking,
      status: booking.status ?? "pending",
      createdAt: new Date(),
    } as Booking;
    this.mockBookings.push(newBooking);
    return newBooking;
  }

  async updateBooking(id: string, booking: Partial<InsertBooking>): Promise<Booking> {
    const index = this.mockBookings.findIndex(b => b.id === id);
    if (index === -1) throw new Error("Booking not found");
    this.mockBookings[index] = { ...this.mockBookings[index], ...booking } as Booking;
    return this.mockBookings[index];
  }
}

// Use DatabaseStorage if db is available, otherwise use MockStorage
export const storage: IStorage = db ? new DatabaseStorage() : new MockStorage();
