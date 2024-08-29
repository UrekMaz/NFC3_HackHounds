import React from 'react';
import { Card, CardContent } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './card.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const ChartCard = ({ title, data, description, dataKey, fill }) => (
    <Card className="chart-card" variant="outlined" sx={{ borderRadius: '32px', borderWidth: '3px' }}>
        <CardContent>
            <div className="chart-header text-xl font-semibold mb-4">
                {title}
            </div>
            <p className="chart-description mb-4 text-gray-700" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                {description}
            </p>
            <ResponsiveContainer width="100%" height={500}> {/* Increased height */}
                <PieChart>
                    <Pie
                        data={data}
                        dataKey={dataKey}
                        nameKey="state"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill={fill}
                        labelLine={false}
                        label={renderCustomizedLabel}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend layout="horizontal" align="center" wrapperStyle={{ marginTop: '20px' }} />
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
);

export default ChartCard;
