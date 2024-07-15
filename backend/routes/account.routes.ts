import express from "express";
import { getUserBalance, transferFunds } from "../controllers/account.controller";
import { isAuth } from "../middlewares/authMiddleware";

export const accountRouter = express.Router();


accountRouter.get("/balance",isAuth, getUserBalance);
accountRouter.post("/transfer",isAuth, transferFunds);

