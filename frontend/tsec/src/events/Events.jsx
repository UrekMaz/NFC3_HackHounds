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
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom Card Component
function CustomCard() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/suggested-events');
  };

  return (
    <Card className="custom-card1">
      <div className="custom-card1-bg" style={{ backgroundImage: "url('../assets/images/events_pic.jpeg')" }}>
        <Card.Body className="custom-card1-body">
          <Card.Title className="custom-card1-title">Story Telling</Card.Title>
          <Button variant="primary" className="custom-card1-button" onClick={handleButtonClick}>
            Suggested Event
          </Button>
        </Card.Body>
      </div>
    </Card>
  );
}

// EventRow Component
function EventRow({ event }) {
  const crowdfund = event.fund;
  const fund = event.fundCollect;
  const defaultPosition = [19.1197, 72.8468];
  const bandraPosition = [19.0600, 72.8365];
  const position = event.loc === "Bandra, Mumbai" ? bandraPosition : (event.location || defaultPosition);

  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });

  return (
    <div className="custom-card">
      <div className="custom-map">
        <MapContainer center={position} zoom={13} style={{ height: '300px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>
              {event.loc}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <div className="custom-body">
        <div className="custom-header">
          <h3 className="custom-title">{event.ogName}</h3>
          <hr></hr>
        </div>
        
        <div className="custom-details">
          <div className="custom-detail-item">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="custom-detail-item">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span>{event.loc}</span>
          </div>
          <div className="custom-detail-item">
            <FontAwesomeIcon icon={faBullseye} />
            <span>Goal: ${event.fund}</span>
          </div>
          <div className="custom-detail-item">
            <FontAwesomeIcon icon={faDollarSign} />
            <span>Current Funding: ${event.fundCollect}</span>
          </div>
          <div className="custom-detail-item">
            <FontAwesomeIcon icon={faUsers} />
            <span>No of volunteers: {event.vol}</span>
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
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getEvent');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    fetchEvents();

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        navigate('/uploadevent');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  const handleAddEventClick = () => {
    navigate('/uploadevent');
  };

  return (
    <>
      <Header />
      <div className="custom-grid-container">
        <div className="custom-grid-item custom-button-container">
          <button className="custom-button" onClick={handleAddEventClick}>Add Event</button>
        </div>
        <div className="custom-grid-item custom-card-container">
          <CustomCard />
        </div>
        <div className="custom-current-events">
          <h2>CURRENT EVENTS</h2>
        </div>
        <div className="custom-event-list">
          {events.map((event) => (
            <EventRow key={event._id} event={event} />
          ))}
        </div>
      </div>
    </>
  );
}

export default TwoColumnGrid;
