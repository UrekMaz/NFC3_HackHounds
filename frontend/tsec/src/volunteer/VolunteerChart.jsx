import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { Paper, Typography } from '@mui/material';
import axios from 'axios'; 
const VolunteerLineChart = () => {
  // Sample data for the past 12 months (in hundreds)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const volunteerData = [400, 700, 300, 500, 800, 1000, 600, 1200, 800, 500, 900, 1100]; // Representing data in hundreds

  // Format the data as needed by recharts
  const data = months.map((month, index) => ({
    month,
    volunteers: volunteerData[index]
  }));

  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h6" gutterBottom>
        Volunteer Count Over the Past Year
      </Typography>
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="volunteers" stroke="#8884d8" />
      </LineChart>
    </Paper>
  );
};

export default VolunteerLineChart;