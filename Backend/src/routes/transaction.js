import express from "express";
import { buy } from "../controllers/transactions.js";

const transactionRoutes = express.Router();

transactionRoutes.post("/payment", buy);

export default transactionRoutes;
