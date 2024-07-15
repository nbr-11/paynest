import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import mongoose from "mongoose";


declare global {
    namespace Express {
      interface Request {
        userId?: mongoose.Schema.Types.ObjectId;
      }
    }
  }


export const isAuth  = async(request:Request, response:Response, next:NextFunction) => {

    const authHeader = request.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return response
        .status(403)
        .json({
            message:"Token not found",
        });
    }

    const jwtToken = authHeader.split(" ")[1];

    try{

        const dedcodedPayload  = jwt.verify(jwtToken,config.JWT_SECRET) as jwt.JwtPayload;
        request.userId = dedcodedPayload.userId as mongoose.Schema.Types.ObjectId;

        next();

    } catch(e){
        return response
               .status(403)
               .json({
                    message:"You are not authorized to access the requested resource",
               })
    }


} 