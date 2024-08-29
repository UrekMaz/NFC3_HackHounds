import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Events.css'; // Importing the CSS file
import FundPieChart from './PieChart';
import Header from '../assets/components/Header';

// Custom Card Component
function CustomCard() {
  return (
    <Card style={{ width: '100%', border: '2px solid #007bff', borderRadius: '8px' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Story Telling</Card.Title>
        <Card.Text>
          Join us as we transform Central Park's forgotten playground into a vibrant hub of joy and laughter, where the community comes together to rebuild memories and create new ones.
        </Card.Text>
        <Button variant="primary">Suggested Event</Button>
      </Card.Body>
    </Card>
  );
}

// Row Component for Events
function EventRow() {
  const crowdfund = 200;
  const fund = 100;

  return (
    <div className="event-row">
      <div className="event-left">
        <div className="event-left-top">
          <h4>Community Park Renovation</h4>
          <p>
            Date: September 15, 2024 <br />
            Location: Central Park, New York <br />
            Goal: $10,000 <br />
            Current Funding: $3,000 <br />
            Description: This event aims to renovate the playground area in Central Park.
            Funds will be used to purchase new equipment, landscaping, and safety enhancements.
          </p>
        </div>
        <div className="event-left-bottom">
          <FundPieChart crowdfund={crowdfund} fund={fund} />
        </div>
      </div>
      <div className="event-right">
        <h4>Organizer Contact</h4>
        <p>
          John Doe <br />
          Email: john.doe@example.com <br />
          Phone: (123) 456-7890
        </p>
        <h4>Event Status</h4>
        <p>50% Funded</p>
      </div>
    </div>
  );
}

// Main Layout Component
function TwoColumnGrid() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="grid-container">
        <div className="grid-item button-container">
          <Button variant="success" onClick={() => navigate('/uploadevent')}>
            Add Event
          </Button>
        </div>
        <div className="grid-item card-container">
          <CustomCard />
        </div>
        <div className="current-events">
          <h2>CURRENT EVENTS</h2>
        </div>
        <div className="event-list">
          <EventRow />
          <EventRow />
          <EventRow />
          {/* Add more <EventRow /> as needed */}
        </div>
      </div>
    </>
  );
}

export default TwoColumnGrid
