import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Login.jsx'
import Events from './events/Events.jsx'
import FundPieChart from './events/PieChart.jsx'
// import Home from './Home/CrowdFundingChart.jsx'
import Header from './assets/components/Header.jsx'
import Footer from './assets/components/Footer.jsx'
function App() {
  const crowdfund = 1000;  // Total crowdfund
  const fund = 500;     
  return (
    <>
      <FundPieChart crowdfund={crowdfund} fund={fund} />
    <Login/>
    {/* <Home/>  */}
    {/* <Header/> */}
    {/* <Footer/> */}
    </>
  )
}


export default App
