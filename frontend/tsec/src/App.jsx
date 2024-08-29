import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Login.jsx'
import Events from './events/Events.jsx'
import FundPieChart from './events/PieChart.jsx'
function App() {
  const crowdfund = 1000;  // Total crowdfund
  const fund = 500;     
  return (
    <>
      <FundPieChart crowdfund={crowdfund} fund={fund} />
    </>
  )
}


export default App
