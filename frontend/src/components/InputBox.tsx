import React from "react";

interface InputBoxProps {
    label: string,
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?:string,
    typeVal?:string

}

const InputBox:React.FC<InputBoxProps> = ({label, onChange, placeholder,typeVal}) => {
    return <div className="mt-2 flex flex-col gap-2">
        <label htmlFor={label} className="font-medium">{label}</label>
        <input type={typeVal?typeVal:"text"} id={label} className="border-2 border-slate-300 h-[2.5rem] p-2 font-medium rounded-lg " placeholder={placeholder} onChange={onChange}/>
    </div>
}

export default InputBox;