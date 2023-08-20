import React from "react";
import './KpiCards.css';

export function SmallKpiCard ({title, largeNum, largeNumMetric, smallNum, smallNumMetric}) {
    // If largeNum or smallNum are not numbers, display '---'
    const displayLargeNum = (typeof largeNum === 'number' && !isNaN(largeNum)) ? largeNum : '0';
    const displaySmallNum = (typeof smallNum === 'number' && !isNaN(smallNum)) ? smallNum : '0';

    
    
    return (
        <div className="SKP-parent_w">
            <p className="SKP-title_w">{title}</p>
            <div className="SKP-number_w">
                <p className="SKP-largeNum">{displayLargeNum}</p>
                <p className="SKP-largeNumMetric">{largeNumMetric}</p>
                <p className="SKP-smallNum">{displaySmallNum}</p>
                <p className="SKP-smallNumMetric">{smallNumMetric}</p>
            </div>
        </div>
    );
};

export function ThreeKpiCard ({title, largeNum, largeNumMetric, smallNum, smallNumMetric, secondSmallNum, secondSmallNumMetric}) {
    
    // If largeNum or smallNum are not numbers, display '---'
    const displayLargeNum = (typeof largeNum === 'number' && !isNaN(largeNum)) ? largeNum : '0';
    const displaySmallNum = (typeof smallNum === 'number' && !isNaN(smallNum)) ? smallNum : '0';
    const displaySecondSmallNum = (typeof secondSmallNum === 'number' && !isNaN(secondSmallNum)) ? secondSmallNum : '0';

    
    return (
        <div className="SKP-parent_w">
            <p className="SKP-title_w">{title}</p>
            <div className="SKP-number_w">
                <p className="SKP-largeNum">{displayLargeNum}</p>
                <p className="SKP-largeNumMetric">{largeNumMetric}</p>
            </div>
            <div className="SKP-number_w">
                <p className="SKP-smallNum">{displaySmallNum}</p>
                <p className="SKP-smallNumMetric">{smallNumMetric}</p>
            </div>
            <div className="SKP-number_w">
                <p className="SKP-smallNum">{displaySecondSmallNum}</p>
                <p className="SKP-smallNumMetric">{secondSmallNumMetric}</p>
            </div>
        </div>
    );
};