import { InsertUser, User, Business, Transaction, Reward } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private businesses: Map<number, Business>;
  private transactions: Map<number, Transaction>;
  private rewards: Map<number, Reward>;
  sessionStore: session.Store;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.businesses = new Map();
    this.transactions = new Map();
    this.rewards = new Map();
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createBusiness(business: Partial<Business>): Promise<Business> {
    const id = this.currentId++;
    const newBusiness: Business = {
      ...business,
      id,
      verified: false,
      qrCode: `NEPPERKS-${id}`,
    } as Business;
    this.businesses.set(id, newBusiness);
    return newBusiness;
  }

  async getBusiness(id: number): Promise<Business | undefined> {
    return this.businesses.get(id);
  }

  async getBusinessByUserId(userId: number): Promise<Business | undefined> {
    return Array.from(this.businesses.values()).find(
      (business) => business.userId === userId,
    );
  }

  async createTransaction(transaction: Partial<Transaction>): Promise<Transaction> {
    const id = this.currentId++;
    const newTransaction: Transaction = {
      ...transaction,
      id,
      points: Math.floor((transaction.amount || 0) / 100), // 1 point per 100 spent
      timestamp: new Date(),
      status: "pending",
    } as Transaction;
    this.transactions.set(id, newTransaction);
    return newTransaction;
  }

  async getTransactionsByCustomer(customerId: number): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).filter(
      (transaction) => transaction.customerId === customerId,
    );
  }

  async getTransactionsByBusiness(businessId: number): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).filter(
      (transaction) => transaction.businessId === businessId,
    );
  }

  async createReward(reward: Partial<Reward>): Promise<Reward> {
    const id = this.currentId++;
    const newReward: Reward = { ...reward, id, active: true } as Reward;
    this.rewards.set(id, newReward);
    return newReward;
  }

  async getRewardsByBusiness(businessId: number): Promise<Reward[]> {
    return Array.from(this.rewards.values()).filter(
      (reward) => reward.businessId === businessId && reward.active,
    );
  }
}

export const storage = new MemStorage();
