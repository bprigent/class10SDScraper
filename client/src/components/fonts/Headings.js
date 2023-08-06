import React from "react";
import "./Headings.css"

export function H1 ({copy}) {
    return (
        <h1 className='fonts-h1'>{copy}</h1>
    );
}

export function H2 ({copy}) {
    return (
        <h2 className='fonts-h2'>{copy}</h2>
    );
}