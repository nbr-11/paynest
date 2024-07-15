import React from "react";
import SubHeading from "../components/SubHeading";

const Heading:React.FC<{label:string, text:string}> = ({label,text}) => {
    return <div className="mb-4">
        <h1 className="text-center font-bold text-4xl mb-1">{label}</h1>
        <SubHeading subHeading={text}></SubHeading>
    </div>
}

export default Heading;