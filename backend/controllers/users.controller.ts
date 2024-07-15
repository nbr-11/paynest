import { Request, Response } from "express";
import zod from "zod";
import { User } from "../models/users.model";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { Account } from "../models/account.model";
import mongoose from "mongoose";

interface signUpRequestBodyType{
    username:string,
    password:string,
    firstName: string,
    lastName: string,
}




export const me  = async (request:Request, response:Response) => {
    try{

        const user = await User.findById(request.userId);

        if(!user){
            return response
            .status(400)
            .json({
                isLoggedIn:false,
            })
        }

        user.password = "";

        return response
        .status(200)
        .json({
            isLoggedIn: true,
            user,
        })

    } catch(e){
        return response
        .status(403)
        .json({
            isLoggedIn: false
        })
    }
}

const signUpSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
});

export const signUp = async (request:Request<{},{},signUpRequestBodyType>, response:Response)=>{

    //getting the request body
    const body = request.body;

    //validating the inputs
    const {success} = signUpSchema.safeParse(body);

    if(!success){
        return response
        .status(422)
        .json({
            message: "Incorrect inputs"
        })
    }

    //checking if the user already exists
    const user = await User.findOne({username:body.username});

    if(user){
        return response
        .status(409)
        .json({
            message:"Username/Email already taken"
        });
    }

    //create a new user in the database
    // generating a jwt token and returning it as a response

    const dbUser = await User.create(body);
    //create an account for the user
    const account = await Account.create({user:dbUser._id, balance:Math.ceil(Math.random()*1000)});
    const token  = jwt.sign({userId:dbUser._id}, config.JWT_SECRET);

    return response.json({
        message:"User Created Successfully",
        token:token,
    });

}


interface SingInRequestBodyType{
    username:string,
    password:string,
}

const signInSchema  = zod.object({
    username:zod.string().email(),
    password:zod.string(),
});

export const signIn = async (request:Request<{},{},SingInRequestBodyType>, response:Response) => {
    
    const body = request.body;

    const {success} = signInSchema.safeParse(body);

    if(!success){
        return response 
        .status(422)
        .json({
            message :"Incorrect Inputs"
        });
    }

    const user  = await User.findOne({username:body.username});

    if(!user){
        return response
        .status(404)
        .json({
            message:"user does not exists"
        })
    }

    if(user.password !== body.password){
        return response
        .status(403)
        .json({
            message:"Incorrect Password"
        })
    }

    user.password = "";

    const token  = jwt.sign({
        userId:user._id,
    }, config.JWT_SECRET);

    return response 
           .status(200)
           .json({
                message:"User has successfully logged in",
                token:token,
           });
    
}




interface UpdateUserReuqestBodyType {
    password?:string,
    firstName?:string,
    lastName?:string,
}

const updateBodySchema  = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
});

export const updateUserInfo = async (request:Request<{},{},UpdateUserReuqestBodyType>, response:Response) => {
    
    //getting the body

    const body = request.body;
    const {success} = updateBodySchema.safeParse(body);

    if(!success){
        return response
        .status(422)
        .json({
            message:"Incorrect inputs"
        })
    }

    //updating the value in the database

    try{
        const user = await User.findByIdAndUpdate(request.userId, body);
    } catch(e) {
        return response
        .status(411)
        .json({
            message:"Error while updating the user in the database"
        })
    }
    
    return response
    .status(200)
    .json({
        message:"user updated successfully"
    })
    
}

const filterSchema = zod.string();

export const filterUsersOnName = async(request:Request<{},{},{},{filter:string}>, response:Response) => {

    const filter = request.query.filter || "";

    const {success} = filterSchema.safeParse(filter);

    if(!success){
        return response
        .status(422)
        .json({
            message:"Incorrect inputs"
        })
    }

    const filteredUserInDb = await User.find({
        $or:[
            {
                firstName:{
                    $regex:filter
                }
            },
            {
                lastName:{
                    $regex:filter
                }
            }
        ]
    });

    return response
    .status(200)
    .json({
        users:filteredUserInDb.map((user,index)=>({
            id:user._id,
            firstName:user.firstName,
            lastName:user.lastName,
            username:user.username
        }))
    });

}