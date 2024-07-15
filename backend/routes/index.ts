import express from "express";
import { userRouter } from "./users.routes";
import {accountRouter} from "./account.routes"

export const router = express.Router();

router.use("/user",userRouter);
router.use("/account",accountRouter);

export default router;