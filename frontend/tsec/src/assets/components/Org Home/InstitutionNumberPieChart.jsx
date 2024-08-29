    import React from 'react';
    import ChartCard from './CardChart'; // Adjust the import path as necessary
    import { Legend, ResponsiveContainer, PieChart } from 'recharts';
    import './card.css';
    const chartData = [
    { state: 'Maharashtra', oldAgeHomes: 30, orphanages: 20 },
    { state: 'Karnataka', oldAgeHomes: 25, orphanages: 15 },
    { state: 'Tamil Nadu', oldAgeHomes: 20, orphanages: 25 },
    { state: 'West Bengal', oldAgeHomes: 35, orphanages: 10 },
    { state: 'Uttar Pradesh', oldAgeHomes: 28, orphanages: 22 },
    { state: 'Rajasthan', oldAgeHomes: 22, orphanages: 18 },
    { state: 'Gujarat', oldAgeHomes: 18, orphanages: 12 },
    { state: 'Kerala', oldAgeHomes: 40, orphanages: 30 },
    { state: 'Punjab', oldAgeHomes: 15, orphanages: 10 },
    { state: 'Madhya Pradesh', oldAgeHomes: 20, orphanages: 15 },
    ];

    const InstitutionNumberPieChart = () => (
    <div className="charts-container">
        <div className="inner-cards">
        <ChartCard
            title="Old Age Homes Across Indian States"
            description="This chart shows the distribution of old age homes across different states in India. Kerala has the highest number of old age homes, and many events and activities are organized there for the elderly."
            data={chartData}
            dataKey="oldAgeHomes"
            fill="#8884d8"
        />
        <ChartCard
            title="Orphanages Across Indian States"
            decription="This chart shows the distribution of old age homes across different states in India."
            data={chartData}
            dataKey="orphanages"
            description="This chart shows the distribution of orphanages across different states in India. Kerala also has the highest number of orphanages, and numerous events and activities are organized there for the children."
            fill="#82ca9d"
        />
        </div>
    </div>
    );

    export default InstitutionNumberPieChart;