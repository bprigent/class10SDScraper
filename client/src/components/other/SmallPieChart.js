import React from 'react';
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";
import { Pie } from 'react-chartjs-2';
import './SmallPieChart.css';

const SmallPieChart = ({ inputPercentage }) => {
    const validPercentage = (typeof inputPercentage === 'number' && inputPercentage >= 0 && inputPercentage <= 100) ? inputPercentage : 0;

    const data = {
        datasets: [{
            data: [validPercentage, 100 - validPercentage],
            backgroundColor: ['#17BA7F', '#CF2979']
        }]
    };

    return (
        <div className="pie-container">
            <div className="pie-chart">
                <Pie data={data} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
        </div>
    );
};

export default SmallPieChart;