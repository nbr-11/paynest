import express from "express";
import { signIn, signUp, updateUserInfo, filterUsersOnName, me} from "../controllers/users.controller";
import { isAuth } from "../middlewares/authMiddleware";

export const userRouter  = express.Router();

userRouter.post('/signup',signUp);
userRouter.post('/signin',signIn);
userRouter.put('/',isAuth, updateUserInfo);
userRouter.get("/bulk",isAuth,filterUsersOnName);
userRouter.get("/me",isAuth,me);