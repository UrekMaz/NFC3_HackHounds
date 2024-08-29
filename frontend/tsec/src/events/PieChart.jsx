import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const FundPieChart = ({ crowdfund, fund }) => {
    // Data to be displayed on the pie chart
    const data = [
        { name: 'Fund Received', value: fund },
        { name: 'Remaining Fund', value: crowdfund - fund }
    ];

    // Colors for each segment
    const COLORS = ['#7B2CBF', '#FF9100'];

    return (
        <PieChart width={400} height={400}>
            <Pie
                data={data}
                cx="50%" 
                cy="50%" 
                outerRadius={100} 
                fill="#8884d8"
                dataKey="value"
                label
            >
                {
                    data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))
                }
            </Pie>
            <Tooltip />
        </PieChart>
    );
};

export default FundPieChart;
