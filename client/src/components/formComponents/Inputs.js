import React from "react";
import "./inputs.css";

export function InputSearch ({value, onChange, placeholder, type}) {
    return (
        <input className="input_search" onChange={onChange} value={value} placeholder={placeholder} type={type}></input>
    );
}

export function InputSubmitButton ({value}) {
    return (
        <input className="input_form_button" type="submit" value={value}></input>
    );
}