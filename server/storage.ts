import { type User, type InsertUser, type Verification, type InsertVerification } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createVerification(verification: InsertVerification): Promise<Verification>;
  getVerification(id: string): Promise<Verification | undefined>;
  getAllVerifications(): Promise<Verification[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private verifications: Map<string, Verification>;

  constructor() {
    this.users = new Map();
    this.verifications = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createVerification(insertVerification: InsertVerification): Promise<Verification> {
    const id = randomUUID();
    const verification: Verification = {
      id,
      claim: insertVerification.claim,
      verdict: insertVerification.verdict,
      confidence: insertVerification.confidence,
      status: insertVerification.status,
      sources: JSON.stringify(insertVerification.sources),
      createdAt: new Date(),
    };
    this.verifications.set(id, verification);
    return verification;
  }

  async getVerification(id: string): Promise<Verification | undefined> {
    return this.verifications.get(id);
  }

  async getAllVerifications(): Promise<Verification[]> {
    return Array.from(this.verifications.values());
  }
}

export const storage = new MemStorage();
