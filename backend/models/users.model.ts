import mongoose, {Schema, model} from "mongoose";

interface UserType{
    firstName:string,
    lastName:string,
    username:string,
    password:string,
}

const userSchema = new Schema<UserType>({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minlength:2,
        maxlength:50,
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxlength:50,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        maxlength:50,
    }
});

export const User = model('user',userSchema);


