import React from "react";

const Button:React.FC<{label:string,style?:React.CSSProperties, onClick?:(e:React.MouseEvent<HTMLButtonElement>)=>void}> = ({label, style, onClick}) => {
    return <div className="mt-6 flex justify-center">
        <button onClick={onClick} className="w-full h-[3rem] rounded-lg text-white font-bold text-xl text-center bg-slate-900" style={style}>{label}</button>
    </div>
}

export default Button;