import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Container, Box, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const data = [
    { quarter: 'Q1', individuals: 5000, companies: 8000 },
    { quarter: 'Q2', individuals: 7000, companies: 6000 },
    { quarter: 'Q3', individuals: 9000, companies: 4000 },
    { quarter: 'Q4', individuals: 6000, companies: 7000 },
];

const theme = createTheme({
    typography: {
        fontFamily: 'Poppins, Arial, sans-serif',
    },
});

const CrowdFundingChart = () => {
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md" sx={{ mt: 4, margin: '5px' }}>
                <Typography variant="h5" component="h1" gutterBottom>
                    Crowd Funding Analysis
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <BarChart width={500} height={300} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="quarter" />
                        <YAxis />
                        <Tooltip />
                        <Legend layout="horizontal" verticalAlign="bottom" align="center" gutterTop="" />
                        <Bar dataKey="individuals" fill="#FF9800" radius={[15, 15, 0, 0]} />
                        <Bar dataKey="companies" fill="#9C27B0" radius={[15, 15, 0, 0]} />
                    </BarChart>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default CrowdFundingChart;