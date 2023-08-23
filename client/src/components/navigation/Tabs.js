import React, { useState } from 'react';
import './Tabs.css';

function Tabs(props) {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    return (
        <div>
            <div className="tab-headers">
                {props.titles.map((title, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTabIndex(index)}
                        className={activeTabIndex === index ? "tab-button active" : "tab-button"}
                    >
                        {title}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {React.Children.map(props.children, (child, index) => {
                    if (index !== activeTabIndex) return undefined;
                    return child;
                })}
            </div>
        </div>
    );
};

export default Tabs;
