import React from 'react';
import Header from './Header';
import CrowdFundingChart from './Org Home/CrowdFundingChart';
import { LanguageProvider } from '../../LanguageContext';
import StatePieCharts from './Org Home/InstitutionNumberPieChart';
import LineChart from './Org Home/LineChart';
import './userHome.css';
import Footer from './Footer';
import Fund from "./Fund"
import NavigateToHtml from './NavigateToHTML';

const UserHome = () => {
    return (
        <LanguageProvider>
            <div>
                {/* Header section */}
                <Header />

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
        At <strong className="text-blue-600">Care Connect</strong>, our goal is to improve lives across India by supporting a diverse range of NGOs. 
        We have partnered with numerous organizations, focusing on sectors such as old age homes and orphanages, 
        to bring about positive change and provide essential services to those in need.
    </p>
</div>





{/* Pie charts section */}
<div className="my-8">
    <StatePieCharts />
</div>

{/* Additional description about the state charts */}
<div className="bg-gray-100 p-6 rounded-lg shadow-md mt-6">
    <p className="text-gray-700">
        These charts depict the distribution of Old Age Homes and Orphanages across different states in India that <strong className="text-blue-600">Care Connect</strong> collaborates with. 
        Through these partnerships, we strive to enhance living conditions and offer support to the elderly and orphaned children nationwide.
    </p>
</div>

{/* Line chart section */}
<div className="my-8">
    <LineChart />
</div>

{/* Additional description about the line chart */}
<div className="bg-gray-100 p-6 rounded-lg shadow-md mt-6">
    <p className="text-gray-700">
        The line chart above shows the growth in the number of individuals assisted by our partner NGOs over the past two years. It highlights the substantial impact of our collective efforts in improving the lives of those in need.
    </p>
</div>

{/* Our Mission Section */}
<div className="bg-gray-100 p-6 rounded-lg shadow-md mt-6">
    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
    <p className="text-gray-700">
        At <strong className="text-blue-600">Care Connect</strong>, our mission is to foster a community of care and support. 
        By linking NGOs, volunteers, and donors, we aim to bridge the gap between those who can help and those who need assistance, nurturing a culture of compassion and community.
    </p>
</div>

{/* Get Involved Section */}
<div className="bg-gray-100 p-6 rounded-lg shadow-md mt-6">
    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Get Involved</h3>
    <p className="text-gray-700">
        Every individual has the power to make a difference. Join us in our mission to bring positive change to the lives of those in need. 
        Whether through volunteering your time, donating to a cause, or partnering with us, there are numerous ways to contribute and make an impact.
    </p>
</div>

{/* Crowd funding chart section */}
<div className="my-8">
    <CrowdFundingChart />
</div>
<div className="my-8">
    <Fund />
</div>




                {/* Footer section */}
                <Footer />
            </div>
        </LanguageProvider>
    );
};

export default UserHome;
