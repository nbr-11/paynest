import mongoose from "mongoose";


const connectToDb = () =>{
    try{
        return mongoose.connect("mongodb+srv://nishant:1234567890@cluster0.qp4tlwu.mongodb.net/");
    } catch(e){

        console.log("error while connecting to the database");
    }
}

export default connectToDb;






