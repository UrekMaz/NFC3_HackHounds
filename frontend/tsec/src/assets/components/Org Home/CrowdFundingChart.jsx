import React, { useState, useEffect } from 'react';
import './CrowdFunding.css'; // Ensure this file contains only necessary custom styles
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
  // Add your theme customization here if needed
});

const CrowdFundingChart = () => {
  const { language } = useLanguage();
  const [translatedText, setTranslatedText] = useState('Crowd Funding');
  const [description, setDescription] = useState('Our crowdfunding efforts have been crucial in gathering the funds needed to support these NGOs. We extend our heartfelt thanks to all our donors for their unwavering support and generous contributions to our cause.');

  useEffect(() => {
    const fetchTranslation = async () => {
      if (language !== 'en') {
        const [translatedTitle, translatedDescription] = await Promise.all([
          translateText('Crowd Funding', language),
          translateText('Our crowdfunding efforts have been crucial in gathering the funds needed to support these NGOs. We extend our heartfelt thanks to all our donors for their unwavering support and generous contributions to our cause.', language)
        ]);
        setTranslatedText(translatedTitle);
        setDescription(translatedDescription);
      } else {
        setTranslatedText('Crowd Funding');
        setDescription('Our crowdfunding efforts have been crucial in gathering the funds needed to support these NGOs. We extend our heartfelt thanks to all our donors for their unwavering support and generous contributions to our cause.');
      }
    };

    fetchTranslation();
  }, [language]);

  return (
    <div className="container-graph bg-transparent">
      <ThemeProvider theme={theme}>
        <Container maxWidth="md" sx={{ mt: 4, margin: '5px', alignItems: 'center' }}>
          <h2 className="text-3xl font-bold text-gray-600 mb-4">
            {translatedText}
          </h2>
          <Box sx={{ display: 'flex', justifyContent: 'center', boxShadow: 3 }}>
            <BarChart width={600} height={400} data={data} className="shadow-lg">
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
      <div className="funding-description-container mt-4">
        <p className="funding-description text-gray-700 text-center">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CrowdFundingChart;