import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import axios from "axios";
import { useSearchParams } from "react-router-dom";



const Transfer: React.FC = () => {
    const [searchParam] = useSearchParams();
    
    const id = searchParam.get("id");
    const name = searchParam.get("name");

    const [amount, setAmount] = useState<number>(0);



    return <div className="bg-white rounded-lg p-6 flex flex-col justify-evenly w-[25rem] shadow-lg">
        <Heading label={"Send Money"} text={""}></Heading>


        <div className="flex gap-3 justify-start items-center">
            <img src={`https://ui-avatars.com/api/?name=${name}`} alt="" className="w-[4rem] h-[4rem] rounded-full" />
            <p className="text-2xl font-bold">{`${name}`}</p>

        </div>

        <InputBox typeVal={"number"} label={"Amount (in Rs)"} placeholder={"Enter amount"} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setAmount(Number(e.target.value));
        }}></InputBox>


        <Button onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{
            axios.post(`http://localhost:3000/api/v1/account/transfer`,{
                to:id,
                amount:amount,
            },{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            }).then(()=>{
                console.log("transaction completed successfully!");
            })
        }} label={"Initiate Transfer"} style={{ "backgroundColor": "rgb(20, 196, 67)" }}></Button>
    </div>
}

export default Transfer;