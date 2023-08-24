import React from "react";
import './Product.css';

export function Product ({obj}) {
    return (
        <p>{obj['name']}</p>
    );
};