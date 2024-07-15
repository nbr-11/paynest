import React, { useState } from "react";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import ButtonWarning from "../components/ButtonWarning";
import axios from "axios";

const SignIn: React.FC = () => {


   

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return <div className="bg-white rounded-lg p-4 flex flex-col justify-evenly w-[22rem]">
        <Heading label={"Sign In"} text="Enter you credentials to access your account"></Heading>

        <InputBox label={"Email"} placeholder={"johndoe@example.com"} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
        }} />

        <InputBox label={"Password"}  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
        }} />

        <Button label={"SignIn"} onClick={async (e:React.MouseEvent<HTMLButtonElement>)=>{
            try{

                const response = await axios.post('http://localhost:3000/api/v1/user/signin/',{
                    username:email,
                    password:password
                });
                localStorage.setItem("token", response.data.token);
               

            } catch(e){
                console.log("somehting went wrong while signing you in")
            }
            
        }}>


        </Button>

        <ButtonWarning warning={"Dont't have an account ?"} label={"Sign Up"} to={"/signup"}></ButtonWarning>

    </div>
}

export default SignIn;