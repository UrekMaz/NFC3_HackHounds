import React from 'react';
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
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

// Row Component for Events
function EventRow() {
  return (
    <div className="event-row">
      <div className="event-left">
        <div className="event-left-top">
          <p>Event Details</p>
        </div>
        <div className="event-left-bottom">
          <p></p>
        </div>
      </div>
      <div className="event-right">
        <p>Additional Details</p>
      </div>
    </div>
  );
}

// Main Layout Component
function TwoColumnGrid() {
  return (
    <>
    <Header/>
    <div className="grid-container">
      <div className="grid-item button-container">
        <Button variant="success">Add Event</Button>
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

export default TwoColumnGrid;
