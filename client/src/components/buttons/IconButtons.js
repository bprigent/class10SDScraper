import React from "react";
import "./iconButtons.css";

export function GreyIconButton ({target, href, iconType}) {
    return <a className="greyIconButtonWrapper" target={target} href={href}><span className="material-icons">{iconType}</span></a>;
}
