import React from "react";
import './Buttons.css';

export function SmallGreyButton ({onClick, copy}) {
    return <button className="smallGreyButton" onClick={onClick}>{copy}</button>
}