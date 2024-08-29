import React, { useState, useEffect } from 'react';
import './CrowdFunding.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Container, Box, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLanguage } from '../../../LanguageContext';
import translateText from '../../../translator'; // Adjust the import path as necessary

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
  const { language } = useLanguage();
  const [translatedText, setTranslatedText] = useState('Crowd Funding');

  useEffect(() => {
    const fetchTranslation = async () => {
      if (language !== 'en') {
        const translation = await translateText('Crowd Funding', language);
        setTranslatedText(translation);
        console.log(translation);
      } else {
        setTranslatedText('Crowd Funding');
      }
    };

    fetchTranslation();
  }, [language]);



return (
    <div className="container-graph">
        <ThemeProvider theme={theme}>
            <Container maxWidth="md" sx={{ mt: 4, margin: '5px', alignItems: 'center' }}>
                <div className="heading">
                    {translatedText}
                </div>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <BarChart width={500} height={300} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="quarter" />
                        <YAxis />
                        <Tooltip />
                        <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                        <Bar dataKey="individuals" fill="#FF9800" radius={[15, 15, 0, 0]} />
                        <Bar dataKey="companies" fill="#9C27B0" radius={[15, 15, 0, 0]} />
                    </BarChart>
                </Box>
            </Container>
        </ThemeProvider>
        {/* Additional description about crowd funding */}
        <div className="funding-description-container">
            <p className="funding-description">
                Our crowdfunding efforts have been crucial in gathering the funds needed to support these NGOs. 
                We extend our heartfelt thanks to all our donors for their unwavering support and generous contributions to our cause.
            </p>
        </div>
    </div>
);
};

export default CrowdFundingChart;
