import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  userType: text("user_type", { enum: ["customer", "business"] }).notNull(),
  phone: text("phone"),
  email: text("email").notNull(),
});

export const businesses = pgTable("businesses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  address: text("address").notNull(),
  description: text("description").notNull(),
  qrCode: text("qr_code").notNull(),
  verified: boolean("verified").default(false),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").references(() => users.id),
  businessId: integer("business_id").references(() => businesses.id),
  amount: integer("amount").notNull(),
  points: integer("points").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
  receiptImage: text("receipt_image"),
  status: text("status", { enum: ["pending", "verified", "rejected"] }).notNull(),
});

export const rewards = pgTable("rewards", {
  id: serial("id").primaryKey(),
  businessId: integer("business_id").references(() => businesses.id),
  name: text("name").notNull(),
  description: text("description").notNull(),
  pointsCost: integer("points_cost").notNull(),
  active: boolean("active").default(true),
});

// Insert Schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  fullName: true,
  userType: true,
  phone: true,
  email: true,
});

export const insertBusinessSchema = createInsertSchema(businesses).pick({
  name: true,
  address: true,
  description: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).pick({
  amount: true,
  receiptImage: true,
});

export const insertRewardSchema = createInsertSchema(rewards).pick({
  name: true,
  description: true,
  pointsCost: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Business = typeof businesses.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;
export type Reward = typeof rewards.$inferSelect;
