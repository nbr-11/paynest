import React, {useEffect, useState} from "react";
import AppBar from "../components/AppBar";
import BalanceBar from "../components/BalanceBar";
import UsersSection from "../components/UsersSection";
import axios from "axios";

interface User{
    username:string,
    firstName:string,
    lastName:string,
    password:string,
}
const Dashboard:React.FC = () => {

    const [user, setUser] = useState<User>({
        username:"",
        firstName:"",
        lastName:"",
        password:""
    })

    const [balance, setBalance] = useState<number>(0);

    useEffect(()=>{
        axios
        .get(`http://localhost:3000/api/v1/user/me`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res)=>{
            console.log(res.data.user);
            setUser(res.data.user);
        })
    },[]);

    useEffect(()=>{
        axios
        .get(`http://localhost:3000/api/v1/account/balance`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((response)=>{
            setBalance(response.data.balance);
        })
    })

    return <div className="w-full h-full bg-white">
    
        <AppBar firstName={user?.firstName} lastName={user?.lastName}/>

        <BalanceBar balance={balance}/>

        <UsersSection/>

        
    
    </div>
}

export default Dashboard;