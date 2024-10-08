import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Login.jsx'
import TwoColumnGrid from "./events/Events.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';
import UserEvent from './userEvent/UserEvent.jsx'
import ReactDOM from 'react-dom/client';


import UserHome from './assets/components/UserHome.jsx';
import OrgHome from './assets/components/OrgHome.jsx';

import SuggestedEvents from './assets/components/SuggestedEvents.jsx';
import AddEvent from './assets/compo/AddEvent.jsx';
import Streamlit from './streamlit.jsx';
import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";
import CommunityHomePage from './assets/components/CommunityHomePage.jsx'
import ChatPage from './assets/components/ChatCommunity.jsx'
import Inventory from './assets/components/InventoryTable.jsx'
import Volunteer from './volunteer/Volunteer.jsx'
import KommunicateChat from './chat.js';

Kommunicate.init("3f215f3d237e4894c29b6a44649a7e48a", {
  automaticChatOpenOnNavigation: false,
  popupWidget: false,
  botIds: ["careconnect-anv3z"], // Replace with your actual bot ID
  widgetSettings: {
    primaryColor: "#7b2cbf"
  }
});

function App() {
  return (
    
    <Router>
      <LanguageProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user-home" element={<UserHome />} />
        <Route path='/org-home' element={<OrgHome />} />
        <Route path='/logout' element={<Login />} />
        <Route path="/analytics" element={<Streamlit/>}/>
        {/* <Route path="/inventory" element={<OrgHome />} /> */}
        <Route path="/suggested-events" element={<SuggestedEvents />} />
        <Route path="/events" element={<TwoColumnGrid/>}/>
        <Route path="/userevent" element={<UserEvent/>}/>
        <Route path="/uploadevent" element={<AddEvent/>}/>
       <Route path="/inventory" element={<Inventory/>}/>
        <Route path="/volunteer" element={<Volunteer/>}/>

        <Route path="/community" element={<CommunityHomePage />} />
        <Route path="/chatPage" element={<ChatPage />} />

      </Routes>
      </LanguageProvider>
    </Router>
  );
}

export default App;