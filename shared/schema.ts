import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, jsonb, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table (auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  fullName: text("full_name").notNull(),
  phone: text("phone"),
  role: varchar("role").notNull().default("customer"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Reviews table
export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  rating: integer("rating").notNull(),
  message: text("message").notNull(),
  photos: jsonb("photos").$type<string[]>().default([]),
  approved: boolean("approved").default(false),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Regions table
export const regions = pgTable("regions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().unique(),
  description: text("description"),
  image: text("image"),
  displayOrder: integer("display_order").default(0),
});

// Packages table
export const packages = pgTable("packages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: varchar("slug").notNull().unique(),
  regionId: varchar("region_id").notNull(),
  destination: text("destination"),
  description: text("description"),
  image: text("image"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  duration: text("duration"),
  groupSize: text("group_size"),
  difficulty: varchar("difficulty").default("moderate"),
  highlights: text("highlights").array().default(sql`'{}'::text[]`),
  inclusions: text("inclusions").array().default(sql`'{}'::text[]`),
  exclusions: text("exclusions").array().default(sql`'{}'::text[]`),
  itinerary: jsonb("itinerary").default({}),
  priceDetails: jsonb("price_details").default({}),
  cancellationPolicy: text("cancellation_policy"),
  isHot: boolean("is_hot").default(false),
  isFeatured: boolean("is_featured").default(false),
  discount: integer("discount").default(0),
  whatsappLink: text("whatsapp_link"),
  instagramLink: text("instagram_link"),
  contactPhone: text("contact_phone"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Bookings/Inquiries table
export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  packageId: varchar("package_id").notNull(),
  userId: varchar("user_id"),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  numberOfPeople: integer("number_of_people").notNull(),
  preferredDate: text("preferred_date"),
  specialRequests: text("special_requests"),
  status: varchar("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertRegionSchema = createInsertSchema(regions).omit({ id: true });
export const insertPackageSchema = createInsertSchema(packages).omit({ id: true, createdAt: true, updatedAt: true });
export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true, createdAt: true });
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertReviewSchema = createInsertSchema(reviews).omit({ id: true, createdAt: true });

// Type exports
export type InsertRegion = z.infer<typeof insertRegionSchema>;
export type Region = typeof regions.$inferSelect;
export type InsertPackage = z.infer<typeof insertPackageSchema>;
export type Package = typeof packages.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;
