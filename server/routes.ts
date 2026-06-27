import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import type { SitePackage, SiteRegion } from "@shared/types";
import {
  requireAuth,
  requireStaff,
  requireAdmin,
  toPublicUser,
  verifyPassword,
} from "./auth";
import { dataStore } from "./data-store";
import { appendPrivateTourToGoogleSheet } from "./google-sheets";
import { storage } from "./storage";
import { userStore } from "./user-store";

async function attachUser(req: Request, _res: Response, next: NextFunction) {
  if (req.session.userId) {
    const user = await userStore.getUserById(req.session.userId);
    if (user) {
      (req as Request & { currentUser?: ReturnType<typeof toPublicUser> }).currentUser =
        toPublicUser(user);
    } else {
      // Session survived a deploy but the user store was reset — clear stale cookie.
      req.session.destroy(() => {});
    }
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.use(attachUser);

  // ── Auth ──────────────────────────────────────────────────────────────────
  app.get("/api/auth/me", (req, res) => {
    const user = (req as Request & { currentUser?: ReturnType<typeof toPublicUser> })
      .currentUser;
    res.json(user ?? null);
  });

  app.post("/api/auth/register", async (req, res) => {
    const schema = z.object({
      email: z.string().trim().email(),
      password: z.string().min(6),
      fullName: z.string().min(2),
      phone: z.string().optional(),
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }
    const { email, password, fullName, phone } = parsed.data;
    try {
      if (await userStore.getUserByEmail(email)) {
        return res.status(409).json({ error: "Email already registered" });
      }
      const user = await userStore.createUser({
        email,
        password,
        fullName,
        phone,
        role: "customer",
      });
      req.session.userId = user.id;
      res.status(201).json(toPublicUser(user));
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({
        error: error instanceof Error ? error.message : "Registration failed",
      });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    const schema = z.object({
      email: z.string().trim().email(),
      password: z.string().min(1),
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }
    let user = await userStore.getUserByEmail(parsed.data.email);
    if (!user) {
      await userStore.reloadUsers();
      user = await userStore.getUserByEmail(parsed.data.email);
    }
    if (!user || !verifyPassword(parsed.data.password, user.passwordHash)) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    req.session.userId = user.id;
    res.json(toPublicUser(user));
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ ok: true });
    });
  });

  // ── Public site data ──────────────────────────────────────────────────────
  app.get("/api/site/packages", (_req, res) => {
    res.json(dataStore.getPackages());
  });

  app.get("/api/site/packages/:id", (req, res) => {
    const pkg = dataStore.getPackage(req.params.id);
    if (!pkg) return res.status(404).json({ error: "Package not found" });
    res.json(pkg);
  });

  app.get("/api/site/regions", (_req, res) => {
    res.json(dataStore.getRegions());
  });

  app.get("/api/site/reviews", (_req, res) => {
    res.json(dataStore.getReviews(false));
  });

  app.post("/api/site/reviews", (req, res) => {
    const schema = z.object({
      name: z.string().min(1),
      rating: z.number().min(1).max(5),
      message: z.string().min(1),
      photos: z.array(z.string()).optional(),
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }
    const review = dataStore.createReview({
      ...parsed.data,
      approved: false,
      featured: false,
    });
    res.status(201).json(review);
  });

  const privateTourSchema = z.object({
    fullName: z.string().trim().min(2),
    email: z.string().trim().email(),
    contactNumber: z.string().trim().min(8),
    cityState: z.string().trim().min(2),
    maleAdults: z.string().trim().min(1),
    femaleAdults: z.string().trim().min(1),
    kids0to5: z.string().optional().default(""),
    kids6to12: z.string().optional().default(""),
    others: z.string().optional().default(""),
    primaryDestination: z.string().trim().min(1),
    alternativeDestination: z.string().optional().default(""),
    tripStartDate: z.string().trim().min(1),
    numberOfDays: z.string().trim().min(1),
    flexibleDates: z.string().trim().min(1),
    travelStyle: z.string().trim().min(1),
    transportNeeded: z.string().optional().default(""),
    transportType: z.string().optional().default(""),
    budget: z.string().trim().min(1),
    accommodation: z.string().optional().default(""),
    roomType: z.string().optional().default(""),
    meals: z.string().optional().default(""),
    foodPreference: z.string().optional().default(""),
    specialRequirements: z.string().optional().default(""),
    preferredCallBackTime: z.string().optional().default(""),
    howDidYouHear: z.string().optional().default(""),
  });

  app.post("/api/site/private-tours", async (req, res) => {
    const parsed = privateTourSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    const inquiry = dataStore.createPrivateTourInquiry(parsed.data);
    let sheetSynced = false;

    if (process.env.GOOGLE_SHEET_WEBHOOK_URL?.trim()) {
      try {
        await appendPrivateTourToGoogleSheet(parsed.data, inquiry.createdAt);
        sheetSynced = true;
      } catch (error) {
        console.error("Private tour Google Sheet sync failed:", error);
      }
    }

    res.status(201).json({ ok: true, id: inquiry.id, sheetSynced });
  });

  // ── Bookings (auth required) ──────────────────────────────────────────────
  app.post("/api/bookings", requireAuth, (req, res) => {
    const user = (req as Request & { currentUser: ReturnType<typeof toPublicUser> }).currentUser;
    const schema = z.object({
      packageId: z.string(),
      numberOfPeople: z.number().min(1),
      preferredDate: z.string().optional(),
      specialRequests: z.string().optional(),
      phone: z.string().optional(),
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }
    const pkg = dataStore.getPackage(parsed.data.packageId);
    if (!pkg) return res.status(404).json({ error: "Package not found" });

    const booking = dataStore.createBooking({
      packageId: parsed.data.packageId,
      userId: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: parsed.data.phone || user.phone || "",
      numberOfPeople: parsed.data.numberOfPeople,
      preferredDate: parsed.data.preferredDate,
      specialRequests: parsed.data.specialRequests,
      status: "pending",
    });
    res.status(201).json(booking);
  });

  app.get("/api/bookings/mine", requireAuth, (req, res) => {
    const user = (req as Request & { currentUser: ReturnType<typeof toPublicUser> }).currentUser;
    const mine = dataStore.getBookings().filter((b) => b.userId === user.id);
    res.json(mine);
  });

  // ── Admin / staff ─────────────────────────────────────────────────────────
  app.get("/api/admin/dashboard", requireStaff, async (_req, res) => {
    const stats = dataStore.getDashboardStats();
    const allUsers = await userStore.getUsers();
    stats.totalUsers = allUsers.filter((u) => u.role === "customer").length;
    stats.staffUsers = allUsers.filter((u) => u.role !== "customer").length;
    res.json(stats);
  });

  app.post("/api/admin/import-packages", requireStaff, (req, res) => {
    const schema = z.object({
      packages: z.array(z.record(z.unknown())),
      regions: z.array(z.record(z.unknown())).optional(),
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }
    const packages = parsed.data.packages as SitePackage[];
    dataStore.importPackages(packages);
    if (parsed.data.regions) {
      dataStore.importRegions(parsed.data.regions as SiteRegion[]);
    }
    res.json({ count: packages.length });
  });

  app.get("/api/admin/packages", requireStaff, (_req, res) => {
    res.json(dataStore.getPackages());
  });

  app.post("/api/admin/packages", requireStaff, (req, res) => {
    const schema = z.object({
      id: z.string().optional(),
      title: z.string().min(1),
      region: z.enum(["North", "South", "East", "West", "Foreign", "Trekking"]),
      location: z.string().min(1),
      duration: z.string().min(1),
      price: z.number().positive(),
      originalPrice: z.number().optional(),
      image: z.string().min(1),
      gallery: z.array(z.string()).optional(),
      itineraryPdfUrl: z.string().optional(),
      description: z.string().min(1),
      details: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
      highlights: z.array(z.string()),
      itinerary: z.array(
        z.object({ day: z.number(), title: z.string(), description: z.string() }),
      ),
      whyChoose: z.array(z.string()).optional(),
      isHot: z.boolean().optional(),
      discount: z.number().optional(),
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }
    const id =
      parsed.data.id ||
      parsed.data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    const pkg = dataStore.createPackage({ ...parsed.data, id } as SitePackage);
    res.status(201).json(pkg);
  });

  app.patch("/api/admin/packages/:id", requireStaff, (req, res) => {
    try {
      const pkg = dataStore.updatePackage(req.params.id, req.body);
      res.json(pkg);
    } catch {
      res.status(404).json({ error: "Package not found" });
    }
  });

  app.delete("/api/admin/packages/:id", requireStaff, (req, res) => {
    dataStore.deletePackage(req.params.id);
    res.json({ ok: true });
  });

  app.get("/api/admin/reviews", requireStaff, (_req, res) => {
    res.json(dataStore.getReviews(true));
  });

  app.patch("/api/admin/reviews/:id", requireStaff, (req, res) => {
    try {
      const review = dataStore.updateReview(req.params.id, req.body);
      res.json(review);
    } catch {
      res.status(404).json({ error: "Review not found" });
    }
  });

  app.delete("/api/admin/reviews/:id", requireStaff, (req, res) => {
    dataStore.deleteReview(req.params.id);
    res.json({ ok: true });
  });

  app.get("/api/admin/bookings", requireStaff, (_req, res) => {
    res.json(dataStore.getBookings());
  });

  app.patch("/api/admin/bookings/:id", requireStaff, (req, res) => {
    try {
      const booking = dataStore.updateBooking(req.params.id, req.body);
      res.json(booking);
    } catch {
      res.status(404).json({ error: "Booking not found" });
    }
  });

  app.get("/api/admin/users", requireAdmin, async (_req, res) => {
    const allUsers = await userStore.getUsers();
    res.json(
      allUsers.map((u) => ({
        id: u.id,
        email: u.email,
        fullName: u.fullName,
        phone: u.phone,
        role: u.role,
        createdAt: u.createdAt,
      })),
    );
  });

  app.patch("/api/admin/users/:id/role", requireAdmin, async (req, res) => {
    const schema = z.object({ role: z.enum(["admin", "employee", "customer"]) });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }
    try {
      const user = await userStore.updateUserRole(req.params.id, parsed.data.role);
      res.json(toPublicUser(user));
    } catch {
      res.status(404).json({ error: "User not found" });
    }
  });

  // ── Legacy DB routes (kept for compatibility) ─────────────────────────────
  app.get("/api/regions", async (_req, res) => {
    try {
      const data = await storage.getRegions();
      res.json(data);
    } catch {
      res.status(500).json({ error: "Failed to fetch regions" });
    }
  });

  app.get("/api/packages", async (_req, res) => {
    try {
      const data = await storage.getPackages();
      res.json(data.length ? data : dataStore.getPackages());
    } catch {
      res.json(dataStore.getPackages());
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
