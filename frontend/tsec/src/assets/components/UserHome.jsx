import React from 'react';
import Header from './Header';
import CrowdFundingChart from './Org Home/CrowdFundingChart';
import Footer from './Footer';
const UserHome = () => {
    return (
        <div>
            <Header/>
            <CrowdFundingChart/>
            <Footer/>
        </div>
    );
};

export default UserHome;