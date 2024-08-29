import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios'; // Import axios
import './Events.css'; // Importing the CSS file
import FundPieChart from './PieChart';
import Header from '../assets/components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt, faBullseye, faDollarSign, faUsers, faChartLine } from '@fortawesome/free-solid-svg-icons';


// Custom Card Component
function CustomCard() {
  return (
    <Card className="event-card">
      <div className="event-card-bg" style={{ backgroundImage: "url('../assets/images/events_pic.jpeg')" }}>
        <Card.Body className="event-card-body">
          <Card.Title className="event-card-title">Story Telling</Card.Title>
          <Button variant="primary" className="event-card-button">Suggested Event</Button>
        </Card.Body>
      </div>
    </Card>
  );
}

// EventRow Component
function EventRow({ event }) {
  const crowdfund = event.fund; // Adjust this if you have different data for crowdfund
  const fund = event.fundCollect;

  return (
    <div className="event-card">
    <div className="event-header">
      <h3 className="event-title">{event.ogName}</h3>
      <div className="funding-status">
        {Math.round((fund / crowdfund) * 100)}% Funded
      </div>
    </div>
    <div className="event-body">
      <div className="event-details">
        <div className="detail-item">
          <FontAwesomeIcon icon={faCalendarAlt} />
          <span>{event.date}</span>
        </div>
        <div className="detail-item">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <span>{event.loc}</span>
        </div>
        <div className="detail-item">
          <FontAwesomeIcon icon={faBullseye} />
          <span>Goal: ${event.fund}</span>
        </div>
        <div className="detail-item">
          <FontAwesomeIcon icon={faDollarSign} />
          <span>Current Funding: ${event.fundCollect}</span>
        </div>
        <div className="detail-item">
          <FontAwesomeIcon icon={faUsers} />
          <span>No of volunteers: {event.vol}</span>
        </div>
      </div>
      <div className="funding-chart">
        <FundPieChart crowdfund={crowdfund} fund={fund} />
        <div className="funding-label">
          {Math.round((fund / crowdfund) * 100)}%
        </div>
      </div>
    </div>
  </div>
  );
}

// Main Layout Component
function TwoColumnGrid() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch event data from the server
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getEvent');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleAddEventClick = () => {
    console.log('Navigating to /uploadevent');
    navigate('/uploadevent');
  };

  return (
    <>
      <Header />
      <div className="grid-container">
        <div className="grid-item button-container">
          {/* <button onClick={handleAddEventClick}>
            Add Event
          </button> */}
          <button className="button" onClick={() => navigate('/uploadevent')}>Add Event</button>
        </div>
        <div className="grid-item card-container">
          <CustomCard />
        </div>
        <div className="current-events">
          <h2>CURRENT EVENTS</h2>
        </div>
        <div className="event-list">
          {events.map((event) => (
            <EventRow key={event._id} event={event} />
          ))}
        </div>
      </div>
    </>
  );
}

export default TwoColumnGrid;