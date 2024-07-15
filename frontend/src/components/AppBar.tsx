import React from "react";


const AppBar:React.FC<{firstName:string,lastName:string}> = ({firstName, lastName}) => {
    return <div className="px-4 flex justify-between items-center h-[6rem] border-b-2  border-b-slate-200">
           <h1 className="font-bold text-2xl">Payments App</h1>

           <div className=" flex justify-between items-center gap-3">
              <p className="text-xl">Hello, {`${firstName}`}</p>
              <img src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}`} alt="" className="h-[2.5rem] w-[2.5rem] rounded-full"/>
           </div>
    </div>
}

export default AppBar;