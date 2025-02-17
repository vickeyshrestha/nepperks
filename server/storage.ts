import { InsertUser, User, Business, Transaction, Reward } from "@shared/schema";
import { users, businesses, transactions, rewards } from "@shared/schema";
import session from "express-session";
import { db } from "./db";
import { eq } from "drizzle-orm";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Business operations
  createBusiness(business: Partial<Business>): Promise<Business>;
  getBusiness(id: number): Promise<Business | undefined>;
  getBusinessByUserId(userId: number): Promise<Business | undefined>;

  // Transaction operations
  createTransaction(transaction: Partial<Transaction>): Promise<Transaction>;
  getTransactionsByCustomer(customerId: number): Promise<Transaction[]>;
  getTransactionsByBusiness(businessId: number): Promise<Transaction[]>;

  // Reward operations
  createReward(reward: Partial<Reward>): Promise<Reward>;
  getRewardsByBusiness(businessId: number): Promise<Reward[]>;

  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createBusiness(business: Partial<Business>): Promise<Business> {
    const [newBusiness] = await db
      .insert(businesses)
      .values({
        ...business,
        verified: false,
        qrCode: `NEPPERKS-${Date.now()}`,
      })
      .returning();
    return newBusiness;
  }

  async getBusiness(id: number): Promise<Business | undefined> {
    const [business] = await db
      .select()
      .from(businesses)
      .where(eq(businesses.id, id));
    return business;
  }

  async getBusinessByUserId(userId: number): Promise<Business | undefined> {
    const [business] = await db
      .select()
      .from(businesses)
      .where(eq(businesses.userId, userId));
    return business;
  }

  async createTransaction(transaction: Partial<Transaction>): Promise<Transaction> {
    const [newTransaction] = await db
      .insert(transactions)
      .values({
        ...transaction,
        points: Math.floor((transaction.amount || 0) / 100),
        timestamp: new Date(),
        status: "pending",
      })
      .returning();
    return newTransaction;
  }

  async getTransactionsByCustomer(customerId: number): Promise<Transaction[]> {
    return db
      .select()
      .from(transactions)
      .where(eq(transactions.customerId, customerId));
  }

  async getTransactionsByBusiness(businessId: number): Promise<Transaction[]> {
    return db
      .select()
      .from(transactions)
      .where(eq(transactions.businessId, businessId));
  }

  async createReward(reward: Partial<Reward>): Promise<Reward> {
    const [newReward] = await db
      .insert(rewards)
      .values({
        ...reward,
        active: true,
      })
      .returning();
    return newReward;
  }

  async getRewardsByBusiness(businessId: number): Promise<Reward[]> {
    return db
      .select()
      .from(rewards)
      .where(eq(rewards.businessId, businessId))
      .where(eq(rewards.active, true));
  }
}

export const storage = new DatabaseStorage();