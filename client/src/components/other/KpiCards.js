import React from "react";
import './KpiCards.css';

export function SmallKpiCard ({title, largeNum, largeNumMetric, smallNum, smallNumMetric}) {
    return (
        <div className="SKP-parent_w">
            <p className="SKP-title_w">{title}</p>
            <div className="SKP-number_w">
                <p className="SKP-largeNum">{largeNum}</p>
                <p className="SKP-largeNumMetric">{largeNumMetric}</p>
                <p className="SKP-smallNum">{smallNum}</p>
                <p className="SKP-smallNumMetric">{smallNumMetric}</p>
            </div>
        </div>
    );
};