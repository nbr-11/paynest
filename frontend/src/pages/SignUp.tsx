import React, { useState } from "react";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox"
import Button from "../components/Button";
import ButtonWarning from "../components/ButtonWarning";
import axios from "axios";


const Signin: React.FC = () => {

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");


    return <div className=" bg-white rounded-lg p-4 flex flex-col justify-evenly w-[22rem] shadow-lg">
        
        <Heading label={"Sign Up"} text="Enter your information to create an account"/>

 
        <InputBox placeholder={"John"} label={"First Name"} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFirstName(e.target.value);
        }}></InputBox>

        <InputBox placeholder={"Doe"} label={"Last Name"} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setLastName(e.target.value);
        }}></InputBox>

        <InputBox placeholder={"johndoe@example.com"} label={"Email"} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
        }}></InputBox>

        <InputBox placeholder={"password"} label={"password"} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
        }}></InputBox>


       <Button onClick={async (e:React.MouseEvent<HTMLButtonElement>)=>{
            try{

                const response = await axios.post('http://localhost:3000/api/v1/user/signup/',{
                    username:email,
                    password:password,
                    firstName:firstName,
                    lastName:lastName,
                });
                localStorage.setItem("token", response.data.token);
               

            } catch(e){
                console.log("somehting went wrong while signing you in")
            }
            
        }} label={"Sign Up"}></Button>

       <ButtonWarning warning={"Already have an account ?"} label={"login"} to={"/signin"}></ButtonWarning>


    </div>
}

export default Signin;