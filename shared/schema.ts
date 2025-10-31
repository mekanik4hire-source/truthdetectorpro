import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const verifications = pgTable("verifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  claim: text("claim").notNull(),
  verdict: text("verdict").notNull(),
  confidence: integer("confidence").notNull(),
  status: text("status").notNull(),
  sources: text("sources").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const verificationSourceSchema = z.object({
  name: z.string(),
  url: z.string(),
  credibility: z.number(),
});

export type VerificationSource = z.infer<typeof verificationSourceSchema>;

export const insertVerificationSchema = createInsertSchema(verifications).omit({
  id: true,
  createdAt: true,
}).extend({
  sources: z.array(verificationSourceSchema),
});

export type InsertVerification = z.infer<typeof insertVerificationSchema>;
export type Verification = typeof verifications.$inferSelect;

export const verificationResultSchema = z.object({
  id: z.string(),
  claim: z.string(),
  verdict: z.string(),
  confidence: z.number(),
  status: z.string(),
  sources: z.array(verificationSourceSchema),
  createdAt: z.string().datetime(),
});

export type VerificationResult = z.infer<typeof verificationResultSchema>;
