import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { Paper, Typography } from '@mui/material';
import './lineChart.css';

const VolunteerLineChart = () => {
    // Extended data for the past 24 months (in hundreds)
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const volunteerData = [
        400, 700, 300, 500, 800, 1000, 600, 1200, 800, 500, 900, 1100, 450, 750, 320, 520, 850, 1050, 620, 1250, 830, 530, 920, 1150
    ]; // Representing data in hundreds

    // Format the data as needed by recharts
    const data = months.map((month, index) => ({
        month: `${month} ${index < 12 ? '2023' : '2024'}`, // Adding year for clarity
        volunteers: volunteerData[index]
    }));

    return (
        <div className='line-chart-container'>
            <Paper 
                style={{ 
                    padding: 20, 
                    borderRadius: 32, 
                    border: '2px solid #CCCCCC', 
                    width: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                }}
            >
                <Typography variant="h6" className='line-chart-header' gutterBottom>
                    Volunteer Count Over the Past 24 Months
                </Typography>

                <LineChart
                    width={1200}
                    height={300}
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="volunteers" stroke="#ff9100" strokeWidth={3} />
                </LineChart>
            </Paper>
        </div>
    );
};

export default VolunteerLineChart;
