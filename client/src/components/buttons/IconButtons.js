import React from "react";
import "./iconButtons.css";

export function GreyIconButton ({target, href, iconType}) {
    return <a className="greyIconButtonWrapper" target={target} href={href}><span className="material-icons-20">{iconType}</span></a>;
}

export function SmallGreyIconButton ({onClick, iconType}) {
    return <div className="smallGreyIconButtonWrapper" onClick={onClick}><span className="material-icons-16">{iconType}</span></div>;
}