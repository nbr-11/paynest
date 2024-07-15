import React from "react";

const BalanceBar:React.FC<{balance:number}> = ({balance}) => {


    return <div className="px-4 h-[4rem] flex items-center">
         <div className="flex justify-between gap-3">
             <p className="font-bold text-xl">Your Balance:</p>
             <p className="font-bold text-xl">₹{`${balance}`}</p>
         </div>
    </div>
}

export default BalanceBar