import React from "react";

const SubHeading:React.FC<{subHeading:string}> = ({subHeading}) => {
    return <div className="">
        <p className="text-slate-400 text-center font-medium mx-auto px-4">{subHeading}</p>
    </div>
}

export default SubHeading;