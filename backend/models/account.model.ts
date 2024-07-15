import mongoose, {Schema, model} from "mongoose";


const accountSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
    },
    balance:{
        type:Number,
        required:true,
    }
});


export const Account = model('account',accountSchema);