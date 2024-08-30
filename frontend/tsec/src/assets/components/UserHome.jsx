import React, { useState, useEffect, useRef } from 'react';
import HeaderUser from './HeaderUser';
import CrowdFundingChart from './Org Home/CrowdFundingChart';
import { useLanguage } from '../../LanguageContext';
import StatePieCharts from './Org Home/InstitutionNumberPieChart';
import LineChart from './Org Home/LineChart';
import './userHome.css';
import Footer from './Footer';
import Fund from "./Fund";
import { useLocation } from 'react-router-dom';
import translateText from '../../translator'; // Adjust the import path as necessary
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

const UserHome = () => {
    const { language } = useLanguage(); // Destructure language from context
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userId = params.get('userId');

    // Ref to the Fund section
    const fundRef = useRef(null);

    // State to hold translated text
    const [textContent, setTextContent] = useState({
        impactDescription: 'At Care Connect, our goal is to improve lives across India by supporting a diverse range of NGOs. We have partnered with numerous organizations, focusing on sectors such as old age homes and orphanages, to bring about positive change and provide essential services to those in need.',
        stateChartsDescription: 'These charts depict the distribution of Old Age Homes and Orphanages across different states in India that Care Connect collaborates with. Through these partnerships, we strive to enhance living conditions and offer support to the elderly and orphaned children nationwide.',
        missionDescription: 'At Care Connect, our mission is to foster a community of care and support. By linking NGOs, volunteers, and donors, we aim to bridge the gap between those who can help and those who need assistance, nurturing a culture of compassion and community.',
        getInvolvedDescription: 'Every individual has the power to make a difference. Join us in our mission to bring positive change to the lives of those in need. Whether through volunteering your time, donating to a cause, or partnering with us, there are numerous ways to contribute and make an impact.',
    });

    useEffect(() => {
        const fetchTranslations = async () => {
            if (language !== 'en') {
                try {
                    const translatedTexts = await Promise.all(
                        Object.keys(textContent).map(async key => {
                            const translation = await translateText(textContent[key], language);
                            return { key, translation };
                        })
                    );
                    const translated = translatedTexts.reduce((acc, { key, translation }) => {
                        acc[key] = translation;
                        return acc;
                    }, {});
                    setTextContent(translated);
                } catch (error) {
                    console.error('Error fetching translations:', error);
                }
            } else {
                // Reset to default English text if language is English
                setTextContent({
                    impactDescription: 'At Care Connect, our goal is to improve lives across India by supporting a diverse range of NGOs. We have partnered with numerous organizations, focusing on sectors such as old age homes and orphanages, to bring about positive change and provide essential services to those in need.',
                    stateChartsDescription: 'These charts depict the distribution of Old Age Homes and Orphanages across different states in India that Care Connect collaborates with. Through these partnerships, we strive to enhance living conditions and offer support to the elderly and orphaned children nationwide.',
                    missionDescription: 'At Care Connect, our mission is to foster a community of care and support. By linking NGOs, volunteers, and donors, we aim to bridge the gap between those who can help and those who need assistance, nurturing a culture of compassion and community.',
                    getInvolvedDescription: 'Every individual has the power to make a difference. Join us in our mission to bring positive change to the lives of those in need. Whether through volunteering your time, donating to a cause, or partnering with us, there are numerous ways to contribute and make an impact.',
                });
            }
        };

        fetchTranslations();
    }, [language]); // Re-run effect when language changes

    const scrollToFund = () => {
        fundRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            <HeaderUser userId={userId} />

            {/* Banner image */}
            <div className='banner-image'>
                <img 
                    src='../../public/assets/images/HomePageBanner.jpg' 
                    alt='banner' 
                    style={{ height: '500px', width: '100%', objectFit: 'cover', borderRadius: '0 0 0 0' }} 
                />
            </div>

            {/* Section describing the impact */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Making a Difference Across India</h2>
                <p className="text-gray-700">
                    {textContent.impactDescription}
                </p>
            </div>

            {/* Pie charts section */}
            <div className="my-8">
                <StatePieCharts />
            </div>

            {/* Additional description about the state charts */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-6">
                <p className="text-gray-700">
                    {textContent.stateChartsDescription}
                </p>
            </div>

            {/* Line chart section */}
            <div className="my-8">
                <LineChart />
            </div>

            {/* Our Mission Section */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
                <p className="text-gray-700">
                    {textContent.missionDescription}
                </p>
            </div>

            {/* Get Involved Section */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Get Involved</h3>
                <p className="text-gray-700">
                    {textContent.getInvolvedDescription}
                </p>
            </div>

            {/* Crowd funding chart section */}
            <div className="my-8">
                <CrowdFundingChart />
            </div>
            <div className="my-8" ref={fundRef}>
                <Fund />
            </div>

            {/* Floating donation button */}
            <button 
                onClick={scrollToFund} 
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    backgroundColor: '#ff9100',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    fontSize: '24px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                }}
                aria-label="Donate"
            >
                💰
            </button>

            {/* Floating Chat Button */}
            <button className="floating-chat-button">
                <FontAwesomeIcon icon={faComments} />
            </button>

            {/* Footer section */}
            <Footer />
        </div>
    );
};

export default UserHome;
