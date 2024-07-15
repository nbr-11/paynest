import { Account } from "../models/account.model";
import { request, Request, Response} from "express";
import { User } from "../models/users.model";
import zod from "zod";
import mongoose from "mongoose";

export const getUserBalance = async (request:Request, response:Response) => {

    const {userId} = request;

    try{
        const accountForUser = await Account.findOne({user:userId});


        return response
        .status(200)
        .json({
            balance:accountForUser?.balance
        })

    } catch(e){
        console.log("Something went wrong while fetching user balance");

        return response
        .status(500)
        .json({
            message:"Internal Server Error"
        });
    }
    
}



interface transferFunds{
    to:mongoose.Schema.Types.ObjectId,
    amount:number,
}


const transferFundsSchema = zod.object({
    to:zod.string(),
    amount:zod.number(),
})

export const transferFunds = async (request:Request<{},{},transferFunds>, response:Response) => {

    //input validation
    const body = request.body;

    const {success} = transferFundsSchema.safeParse(body);

    if(!success){
        return response
        .status(422)
        .json({
            message:"Incorrect inputs"
        })
    }


    const session = await mongoose.startSession();

    // starting a transaction
    session.startTransaction();


    //get from user's account details
    //get to user's account details

    // const toUserId = new mongoose.Types.ObjectId(request.body.to)


    const fromUser = await Account.findOne({user:request.userId}).session(session);
    

    const toUser = await Account.findOne({user:request.body.to}).session(session);
    

    if(!fromUser || !toUser){

        await session.abortTransaction();
        return response
        .status(400)
        .json({
            message:"user not found",
        })
    }

    //check whether the from user has enough balance to do the transaction

    if(fromUser.balance<body.amount){

        await session.abortTransaction();
        return response
        .status(400)
        .json({
            message:"Insufficient balance"
        })
    }

    //decrement the from user's balance by amount

    await Account.updateOne({user:request.userId},{
        $inc:{
            balance:-((body.amount))
        }
    })
    .session(session);

    //increment the to user's balance by amount

    await Account.updateOne({user:request.body.to},{
        $inc:{
            balance:(body.amount)
        }
    })
    .session(session);

    //return a successfull reponse

    //commit the transaction
    await session.commitTransaction();
    
    return response
    .status(200)
    .json({
        message:"The transfer was successfull"
    })


}