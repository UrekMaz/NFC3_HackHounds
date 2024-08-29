import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Login.jsx'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import UserHome from './assets/components/UserHome.jsx';
import OrgHome from './assets/components/OrgHome.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/org-home" element={<OrgHome />} />
      </Routes>
    </Router>
  );

}

export default App;