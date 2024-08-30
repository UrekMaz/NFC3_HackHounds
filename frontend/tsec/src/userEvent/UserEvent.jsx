import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios'; // Import axios
import './UserEvent.css'; // Importing the CSS file
// import FundPieChart from './PieChart';
import Header from '../assets/components/HeaderUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt, faBullseye, faDollarSign, faUsers, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import ConfirmationModal from './confirmModal';

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
    const [vol, setVol] = useState(event.vol || 0);
  const crowdfund = event.fund; // Adjust this if you have different data for crowdfund
  const fund = event.fundCollect;
  const defaultPosition = [19.1197, 72.8468]; // Default to Andheri, Mumbai if location is not provided
  const bandraPosition = [19.0600, 72.8365]; // Coordinates for Bandra, Mumbai

  // Set position based on event.loc
  const position = event.loc === "Bandra, Mumbai" ? bandraPosition : (event.location || defaultPosition);

  // Fix for Leaflet marker icon issue
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });

  const handleVolunteerClick = async () => {
    try {
      // Update the volunteer count on the server
      await axios.put(`http://localhost:3000/updateVolunteerCount/${event._id}`, { vol: vol + 1 });
      // Update the state locally
      setVol(prevVol => prevVol + 1);
      window.location.reload();

      console.log(vol);
    } catch (error) {
      console.error('Error updating volunteer count:', error);
    }
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirm = () => {
    handleVolunteerClick();
    console.log('Confirmed!');
    setModalOpen(false);
  };

  return (
    <div className="event-card  " style={{  width: '400px' }}>
      <div className="event-map">
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
      <div className="event-body">
        <div className="event-header">
          <h3 className="event-title">{event.ogName}</h3>
         
        </div>
        <div className="event-details">
          <div className="detail-item">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>{new Date(event.date).toLocaleDateString()}</span>
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
        <button className='flex justify-center items-center gap-2 border text-white bg-purple rounded-full px-6 py-3 my-5 shadow-md shadow-gray-300 hover:bg-lpurple transition duration-300' onClick={handleOpenModal} >Volunteer</button>
        <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
      />
        {/* <div className="funding-chart">
          <FundPieChart crowdfund={crowdfund} fund={fund} />
          <div className="funding-label">
            {Math.round((fund / crowdfund) * 100)}%
          </div>
        </div> */}
      </div>
    </div>
  );
}

// Main Layout Component
function TwoColumnGrid() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('TwoColumnGrid component rendered'); // Add this line
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

    // Add event listener for "Enter" key press
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        console.log('Enter key pressed, navigating to /uploadevent');
        navigate('/uploadevent');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  const handleAddEventClick = () => {
    console.log('Navigating to /uploadevent');
    navigate('/uploadevent');
  };

  return (
    <>
      <Header />
      <div className="grid-container">
        {/* <div className="grid-item button-container">
          <button className="button" onClick={handleAddEventClick}>Add Event</button>
        </div> */}
        <div className="grid-item card-container">
          <CustomCard />
        </div>
        <div className="current-events">
          <h3 className='text-3xl font-bold text-gray-800 mb-4'>CURRENT EVENTS</h3>
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