import React from "react";
import { Link } from "react-router-dom";

const ButtonWarning:React.FC<{warning:string, label:string, to:string}> = ({warning, label, to}) => {
    return <div className="pt-1">
        <p className="text-center">
            {warning+" "}

            <Link to={to} className="underline">{label}</Link>
        </p>
    </div>
}

export default ButtonWarning;