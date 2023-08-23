import React, { useState } from 'react';
import './Tabs.css';

function Tabs(props) {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    return (
        <div>
            <div className="sd-tab-headers">
                {props.titles.map((title, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTabIndex(index)}
                        className={activeTabIndex === index ? "sd-tab-button active" : "sd-tab-button"}
                    >
                        {title}
                    </button>
                ))}
            </div>
            <div className="sd-tab-content">
                {React.Children.map(props.children, (child, index) => {
                    if (index !== activeTabIndex) return undefined;
                    return child;
                })}
            </div>
        </div>
    );
};

export default Tabs;
