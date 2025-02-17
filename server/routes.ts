import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertBusinessSchema, insertTransactionSchema, insertRewardSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Business routes
  app.post("/api/businesses", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const business = await storage.createBusiness({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(business);
  });

  app.get("/api/businesses/:id", async (req, res) => {
    const business = await storage.getBusiness(parseInt(req.params.id));
    if (!business) return res.sendStatus(404);
    res.json(business);
  });

  // Transaction routes
  app.post("/api/transactions", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const parsed = insertTransactionSchema.parse(req.body);
    const transaction = await storage.createTransaction({
      ...parsed,
      customerId: req.user.id,
    });
    res.status(201).json(transaction);
  });

  app.get("/api/transactions/customer", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const transactions = await storage.getTransactionsByCustomer(req.user.id);
    res.json(transactions);
  });

  app.get("/api/transactions/business/:businessId", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const transactions = await storage.getTransactionsByBusiness(parseInt(req.params.businessId));
    res.json(transactions);
  });

  // Reward routes
  app.post("/api/rewards", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const parsed = insertRewardSchema.parse(req.body);
    const business = await storage.getBusinessByUserId(req.user.id);
    if (!business) return res.sendStatus(403);
    
    const reward = await storage.createReward({
      ...parsed,
      businessId: business.id,
    });
    res.status(201).json(reward);
  });

  app.get("/api/rewards/business/:businessId", async (req, res) => {
    const rewards = await storage.getRewardsByBusiness(parseInt(req.params.businessId));
    res.json(rewards);
  });

  const httpServer = createServer(app);
  return httpServer;
}
