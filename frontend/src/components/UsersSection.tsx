import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface userType{
    readonly id:string
    firstName:string,
    lastName:string,
    username:string,
}

const UsersSection:React.FC = () => {


    const nav = useNavigate();

    const [users, setUsers] = useState<userType[]>([])
    const [filter, setFilter] = useState<string>("");

    useEffect(()=>{
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res)=>{
              console.log(res.data);
               setUsers(res.data.users);
        })
    },[filter])

    return <div className="px-4">
    
    <p className="text-xl font-bold mb-4">Users</p>

    <input type="text" className="w-full border-2 rounded-lg h-[2.5rem] p-2" placeholder="Search users..." onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
        setFilter(e.target.value);
    }}/>

    <div className="h-[20rem] mt-3 overflow-auto py-2 flex flex-col gap-4">


         {/* //dynamic render */}
         {
            users.map((user, index)=>{
                return <div className="w-full flex justify-between items-center">
                <div className="flex w-[20rem] justify-start gap-3 items-center">
                    <img src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`} alt=""  className="w-[3rem] h-[3rem] rounded-full"/>
                     <p className="text-xl font-bold">{`${user.firstName} ${user.lastName}`}</p>
                </div>
    
                <button onClick={(e:React.MouseEvent<HTMLButtonElement>)=>{
                    nav(`/transfer?id=${user.id}&name=${user.firstName}`);
                }}className="bg-slate-900 h-[3rem] text-white w-[7rem] font-bold rounded-lg">Send Money</button>
            </div>
            })
         }
        

    </div>
    
    </div>
}

export default UsersSection;