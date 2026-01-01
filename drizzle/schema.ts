import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, date } from "drizzle-orm/mysql-core";

// Core user table with subscription management
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  // Subscription fields
  subscriptionStatus: mysqlEnum("subscriptionStatus", ["trial", "active", "cancelled", "overdue", "expired"]).default("trial").notNull(),
  subscriptionPlan: mysqlEnum("subscriptionPlan", ["monthly", "yearly"]).default("monthly"),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }),
  trialEndsAt: timestamp("trialEndsAt"),
  subscriptionEndsAt: timestamp("subscriptionEndsAt"),
  lastPaymentAt: timestamp("lastPaymentAt"),
  // Account status
  isActive: boolean("isActive").default(true).notNull(),
  isSuspended: boolean("isSuspended").default(false).notNull(),
  suspendedReason: text("suspendedReason"),
  // Profile
  phone: varchar("phone", { length: 20 }),
  location: varchar("location", { length: 255 }),
  profileImageUrl: text("profileImageUrl"),
  // Timestamps
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

// Horse profiles
export const horses = mysqlTable("horses", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  breed: varchar("breed", { length: 100 }),
  age: int("age"),
  dateOfBirth: date("dateOfBirth"),
  height: int("height"), // in centimeters
  weight: int("weight"), // in kilograms
  color: varchar("color", { length: 50 }),
  gender: mysqlEnum("gender", ["stallion", "mare", "gelding"]),
  discipline: varchar("discipline", { length: 100 }), // dressage, jumping, eventing, etc.
  level: varchar("level", { length: 50 }), // beginner, intermediate, advanced, competition
  registrationNumber: varchar("registrationNumber", { length: 100 }),
  microchipNumber: varchar("microchipNumber", { length: 100 }),
  notes: text("notes"),
  photoUrl: text("photoUrl"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Health records
export const healthRecords = mysqlTable("healthRecords", {
  id: int("id").autoincrement().primaryKey(),
  horseId: int("horseId").notNull(),
  userId: int("userId").notNull(),
  recordType: mysqlEnum("recordType", ["vaccination", "deworming", "dental", "farrier", "veterinary", "injury", "medication", "other"]).notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  recordDate: date("recordDate").notNull(),
  nextDueDate: date("nextDueDate"),
  vetName: varchar("vetName", { length: 100 }),
  vetPhone: varchar("vetPhone", { length: 20 }),
  vetClinic: varchar("vetClinic", { length: 200 }),
  cost: int("cost"), // in pence/cents
  documentUrl: text("documentUrl"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Training sessions
export const trainingSessions = mysqlTable("trainingSessions", {
  id: int("id").autoincrement().primaryKey(),
  horseId: int("horseId").notNull(),
  userId: int("userId").notNull(),
  sessionDate: date("sessionDate").notNull(),
  startTime: varchar("startTime", { length: 10 }), // HH:MM format
  endTime: varchar("endTime", { length: 10 }),
  duration: int("duration"), // in minutes
  sessionType: mysqlEnum("sessionType", ["flatwork", "jumping", "hacking", "lunging", "groundwork", "competition", "lesson", "other"]).notNull(),
  discipline: varchar("discipline", { length: 100 }),
  trainer: varchar("trainer", { length: 100 }),
  location: varchar("location", { length: 200 }),
  goals: text("goals"),
  exercises: text("exercises"),
  notes: text("notes"),
  performance: mysqlEnum("performance", ["excellent", "good", "average", "poor"]),
  weather: varchar("weather", { length: 100 }),
  temperature: int("temperature"), // in celsius
  isCompleted: boolean("isCompleted").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Feeding plans
export const feedingPlans = mysqlTable("feedingPlans", {
  id: int("id").autoincrement().primaryKey(),
  horseId: int("horseId").notNull(),
  userId: int("userId").notNull(),
  feedType: varchar("feedType", { length: 100 }).notNull(), // hay, grain, supplements, etc.
  brandName: varchar("brandName", { length: 100 }),
  quantity: varchar("quantity", { length: 50 }).notNull(), // e.g., "2kg", "1 scoop"
  unit: varchar("unit", { length: 20 }), // kg, lbs, scoops, flakes
  mealTime: mysqlEnum("mealTime", ["morning", "midday", "evening", "night"]).notNull(),
  frequency: varchar("frequency", { length: 50 }).default("daily"), // daily, twice daily, etc.
  specialInstructions: text("specialInstructions"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Documents storage
export const documents = mysqlTable("documents", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  horseId: int("horseId"),
  healthRecordId: int("healthRecordId"),
  fileName: varchar("fileName", { length: 255 }).notNull(),
  fileType: varchar("fileType", { length: 50 }).notNull(), // pdf, image, etc.
  fileSize: int("fileSize"), // in bytes
  fileUrl: text("fileUrl").notNull(),
  fileKey: varchar("fileKey", { length: 500 }).notNull(),
  category: mysqlEnum("category", ["health", "registration", "insurance", "competition", "other"]).default("other"),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Weather logs for AI analysis
export const weatherLogs = mysqlTable("weatherLogs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  temperature: int("temperature"), // celsius
  humidity: int("humidity"), // percentage
  windSpeed: int("windSpeed"), // km/h
  precipitation: int("precipitation"), // mm
  conditions: varchar("conditions", { length: 100 }), // sunny, cloudy, rainy, etc.
  uvIndex: int("uvIndex"),
  visibility: int("visibility"), // km
  ridingRecommendation: mysqlEnum("ridingRecommendation", ["excellent", "good", "fair", "poor", "not_recommended"]),
  aiAnalysis: text("aiAnalysis"),
  checkedAt: timestamp("checkedAt").defaultNow().notNull(),
});

// System settings for admin
export const systemSettings = mysqlTable("systemSettings", {
  id: int("id").autoincrement().primaryKey(),
  settingKey: varchar("settingKey", { length: 100 }).notNull().unique(),
  settingValue: text("settingValue"),
  settingType: mysqlEnum("settingType", ["string", "number", "boolean", "json"]).default("string"),
  description: text("description"),
  isEncrypted: boolean("isEncrypted").default(false),
  updatedBy: int("updatedBy"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Activity logs for admin monitoring
export const activityLogs = mysqlTable("activityLogs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  action: varchar("action", { length: 100 }).notNull(),
  entityType: varchar("entityType", { length: 50 }), // user, horse, health_record, etc.
  entityId: int("entityId"),
  details: text("details"),
  ipAddress: varchar("ipAddress", { length: 45 }),
  userAgent: text("userAgent"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Backup logs
export const backupLogs = mysqlTable("backupLogs", {
  id: int("id").autoincrement().primaryKey(),
  backupType: mysqlEnum("backupType", ["full", "incremental", "users", "horses"]).notNull(),
  status: mysqlEnum("status", ["pending", "running", "completed", "failed"]).notNull(),
  fileName: varchar("fileName", { length: 255 }),
  fileSize: int("fileSize"),
  fileUrl: text("fileUrl"),
  errorMessage: text("errorMessage"),
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
});

// Stables/Teams for multi-user management
export const stables = mysqlTable("stables", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  description: text("description"),
  ownerId: int("ownerId").notNull(), // The user who created the stable
  location: varchar("location", { length: 255 }),
  logo: text("logo"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Stable members with role-based permissions
export const stableMembers = mysqlTable("stableMembers", {
  id: int("id").autoincrement().primaryKey(),
  stableId: int("stableId").notNull(),
  userId: int("userId").notNull(),
  role: mysqlEnum("role", ["owner", "admin", "trainer", "member", "viewer"]).notNull(),
  permissions: text("permissions"), // JSON string of specific permissions
  isActive: boolean("isActive").default(true).notNull(),
  joinedAt: timestamp("joinedAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Invitations to join stables
export const stableInvites = mysqlTable("stableInvites", {
  id: int("id").autoincrement().primaryKey(),
  stableId: int("stableId").notNull(),
  invitedByUserId: int("invitedByUserId").notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  role: mysqlEnum("role", ["admin", "trainer", "member", "viewer"]).notNull(),
  token: varchar("token", { length: 100 }).notNull().unique(),
  status: mysqlEnum("status", ["pending", "accepted", "declined", "expired"]).default("pending").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  acceptedAt: timestamp("acceptedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Events and calendar
export const events = mysqlTable("events", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  stableId: int("stableId"),
  horseId: int("horseId"),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  eventType: mysqlEnum("eventType", ["training", "competition", "veterinary", "farrier", "lesson", "meeting", "other"]).notNull(),
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate"),
  location: varchar("location", { length: 255 }),
  isAllDay: boolean("isAllDay").default(false).notNull(),
  isRecurring: boolean("isRecurring").default(false).notNull(),
  recurrenceRule: text("recurrenceRule"), // iCal RRULE format
  color: varchar("color", { length: 7 }), // Hex color code
  isCompleted: boolean("isCompleted").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Event reminders
export const eventReminders = mysqlTable("eventReminders", {
  id: int("id").autoincrement().primaryKey(),
  eventId: int("eventId").notNull(),
  userId: int("userId").notNull(),
  reminderTime: timestamp("reminderTime").notNull(),
  reminderType: mysqlEnum("reminderType", ["email", "push", "sms"]).notNull(),
  isSent: boolean("isSent").default(false).notNull(),
  sentAt: timestamp("sentAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Feed costs tracking
export const feedCosts = mysqlTable("feedCosts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  horseId: int("horseId"),
  feedType: varchar("feedType", { length: 100 }).notNull(),
  brandName: varchar("brandName", { length: 100 }),
  quantity: varchar("quantity", { length: 50 }).notNull(),
  unit: varchar("unit", { length: 20 }),
  costPerUnit: int("costPerUnit").notNull(), // in pence/cents
  purchaseDate: date("purchaseDate").notNull(),
  supplier: varchar("supplier", { length: 200 }),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Vaccinations tracking
export const vaccinations = mysqlTable("vaccinations", {
  id: int("id").autoincrement().primaryKey(),
  horseId: int("horseId").notNull(),
  userId: int("userId").notNull(),
  vaccineName: varchar("vaccineName", { length: 200 }).notNull(),
  vaccineType: varchar("vaccineType", { length: 100 }), // flu, tetanus, etc.
  dateAdministered: date("dateAdministered").notNull(),
  nextDueDate: date("nextDueDate"),
  batchNumber: varchar("batchNumber", { length: 100 }),
  vetName: varchar("vetName", { length: 100 }),
  vetClinic: varchar("vetClinic", { length: 200 }),
  cost: int("cost"), // in pence/cents
  notes: text("notes"),
  documentUrl: text("documentUrl"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Deworming tracking
export const dewormings = mysqlTable("dewormings", {
  id: int("id").autoincrement().primaryKey(),
  horseId: int("horseId").notNull(),
  userId: int("userId").notNull(),
  productName: varchar("productName", { length: 200 }).notNull(),
  activeIngredient: varchar("activeIngredient", { length: 200 }),
  dateAdministered: date("dateAdministered").notNull(),
  nextDueDate: date("nextDueDate"),
  dosage: varchar("dosage", { length: 100 }),
  weight: int("weight"), // horse weight at time of treatment
  cost: int("cost"), // in pence/cents
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Shareable profile links
export const shareLinks = mysqlTable("shareLinks", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  horseId: int("horseId"),
  linkType: mysqlEnum("linkType", ["horse", "stable", "medical_passport"]).notNull(),
  token: varchar("token", { length: 100 }).notNull().unique(),
  isPublic: boolean("isPublic").default(false).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  expiresAt: timestamp("expiresAt"),
  viewCount: int("viewCount").default(0).notNull(),
  lastViewedAt: timestamp("lastViewedAt"),
  settings: text("settings"), // JSON string for privacy settings
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Competitions tracking
export const competitions = mysqlTable("competitions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  horseId: int("horseId").notNull(),
  competitionName: varchar("competitionName", { length: 200 }).notNull(),
  venue: varchar("venue", { length: 200 }),
  date: date("date").notNull(),
  discipline: varchar("discipline", { length: 100 }), // dressage, jumping, etc.
  level: varchar("level", { length: 50 }),
  class: varchar("class", { length: 100 }), // specific class/event name
  placement: varchar("placement", { length: 50 }), // 1st, 2nd, etc. or score
  score: varchar("score", { length: 50 }),
  notes: text("notes"),
  cost: int("cost"), // entry fee in pence/cents
  winnings: int("winnings"), // prize money in pence/cents
  documentUrl: text("documentUrl"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Document tags for better organization
export const documentTags = mysqlTable("documentTags", {
  id: int("id").autoincrement().primaryKey(),
  documentId: int("documentId").notNull(),
  tag: varchar("tag", { length: 50 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Stripe webhook events for idempotency
export const stripeEvents = mysqlTable("stripeEvents", {
  id: int("id").autoincrement().primaryKey(),
  eventId: varchar("eventId", { length: 255 }).notNull().unique(),
  eventType: varchar("eventType", { length: 100 }).notNull(),
  processed: boolean("processed").default(false).notNull(),
  payload: text("payload"), // Full event payload for debugging
  error: text("error"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  processedAt: timestamp("processedAt"),
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Horse = typeof horses.$inferSelect;
export type InsertHorse = typeof horses.$inferInsert;
export type HealthRecord = typeof healthRecords.$inferSelect;
export type InsertHealthRecord = typeof healthRecords.$inferInsert;
export type TrainingSession = typeof trainingSessions.$inferSelect;
export type InsertTrainingSession = typeof trainingSessions.$inferInsert;
export type FeedingPlan = typeof feedingPlans.$inferSelect;
export type InsertFeedingPlan = typeof feedingPlans.$inferInsert;
export type Document = typeof documents.$inferSelect;
export type InsertDocument = typeof documents.$inferInsert;
export type WeatherLog = typeof weatherLogs.$inferSelect;
export type InsertWeatherLog = typeof weatherLogs.$inferInsert;
export type SystemSetting = typeof systemSettings.$inferSelect;
export type InsertSystemSetting = typeof systemSettings.$inferInsert;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type InsertActivityLog = typeof activityLogs.$inferInsert;
export type BackupLog = typeof backupLogs.$inferSelect;
export type InsertBackupLog = typeof backupLogs.$inferInsert;
export type Stable = typeof stables.$inferSelect;
export type InsertStable = typeof stables.$inferInsert;
export type StableMember = typeof stableMembers.$inferSelect;
export type InsertStableMember = typeof stableMembers.$inferInsert;
export type StableInvite = typeof stableInvites.$inferSelect;
export type InsertStableInvite = typeof stableInvites.$inferInsert;
export type Event = typeof events.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;
export type EventReminder = typeof eventReminders.$inferSelect;
export type InsertEventReminder = typeof eventReminders.$inferInsert;
export type FeedCost = typeof feedCosts.$inferSelect;
export type InsertFeedCost = typeof feedCosts.$inferInsert;
export type Vaccination = typeof vaccinations.$inferSelect;
export type InsertVaccination = typeof vaccinations.$inferInsert;
export type Deworming = typeof dewormings.$inferSelect;
export type InsertDeworming = typeof dewormings.$inferInsert;
export type ShareLink = typeof shareLinks.$inferSelect;
export type InsertShareLink = typeof shareLinks.$inferInsert;
export type Competition = typeof competitions.$inferSelect;
export type InsertCompetition = typeof competitions.$inferInsert;
export type DocumentTag = typeof documentTags.$inferSelect;
export type InsertDocumentTag = typeof documentTags.$inferInsert;
export type StripeEvent = typeof stripeEvents.$inferSelect;
export type InsertStripeEvent = typeof stripeEvents.$inferInsert;
