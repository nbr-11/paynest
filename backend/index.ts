import express from "express";
import connectToDb from "./db";
import mainRouter from "./routes";
import cors from "cors";

const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1',mainRouter);


connectToDb()
?.then(()=>{
    console.log("connection to database was successfull");

    app.listen(PORT, ()=>{
        console.log("server is running on port 3000");
    })
});




