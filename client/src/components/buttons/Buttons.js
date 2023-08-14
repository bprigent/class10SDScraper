import React from "react";
import './Buttons.css';

export function SmallGreenButton ({onClick, copy}) {
    return <button className="smallGreenButton" onClick={onClick}>{copy}</button>
}

export function SmallGreyButton ({onClick, copy}) {
    return <button className="smallGreyButton" onClick={onClick}>{copy}</button>
}