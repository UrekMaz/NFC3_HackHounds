import React, { useEffect, useState } from 'react';
import Header from '../assets/components/Header';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import './volunteer.css';
import axios from 'axios'; 
import VolunteerLineChart from './volunteerChart';

function CustomCard({ number = 1, name = "John Doe", age = 30, gender = "Male" }) {
    return (
        <Card className="event-card bg-white shadow-lg rounded-lg overflow-hidden">
    <div
        className="event-card-bg bg-cover bg-center"
        style={{ backgroundImage: "url('../assets/images/events_pic.jpeg')" }}
    >
        <div className="event-card-grid grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div className="event-card-content flex justify-center items-center">
                <VolunteerLineChart className="w-full max-w-md" />
            </div>
            <div className="event-card-details flex flex-col items-start md:items-end">
                <div className="event-card-number-circle bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl mb-4">
                    {number}
                </div>
                <p className="text-gray-600 mb-2">Events Volunteered</p>
                <h3 className="text-xl font-semibold mb-4">{name}</h3>
                <p className="text-gray-700">
                    <strong>Age:</strong> {age}
                </p>
                <p className="text-gray-700">
                    <strong>Gender:</strong> {gender}
                </p>
            </div>
        </div>
    </div>
</Card>
    );
}

function EventCard({ ogName, loc, date, description = "No description available", onVolunteerClick }) {
    return (
        <Card className="event-card">
            <div className="event-card-inner">
                <div className="set">
                    <div className="image">
                        <img src="../assets/images/story.jpg" alt="Event" className="event-card-placeholder" />
                    </div>
                    <div className="align_x">
                        <Card.Title className="event-card-title">{ogName}</Card.Title>
                        <Card.Text className="event-card-text"><strong>Location:</strong> {loc}</Card.Text>
                        <Card.Text className="event-card-text"><strong>Date:</strong> {date}</Card.Text>
                        <Card.Text className="event-card-text">{description}</Card.Text>
                        <div className="event-card-button-container">
                            <button className="volunteer-button" onClick={onVolunteerClick}>Volunteer</button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}

function Volunteer() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);

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

    const handleVolunteerClick = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    const handleConfirm = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/incrementVolunteer/${selectedEvent._id}`);

            if (response.status === 200) {
                setEvents(events.map(event =>
                    event._id === selectedEvent._id ? { ...event, vol: response.data.vol } : event
                ));
                console.log("Confirmed volunteering for:", selectedEvent);
            } else {
                console.error('Failed to increment volunteer count');
            }
        } catch (error) {
            console.error('Error confirming volunteering:', error);
        } finally {
            setShowModal(false);
        }
    };

    return (
        <div>
            <Header />
            <CustomCard />
            <div className="card-list">
                {events.map((event, index) => (
                    <EventCard
                        key={index}
                        ogName={event.ogName}
                        loc={event.loc}
                        date={event.date}
                        description={event.description}
                        onVolunteerClick={() => handleVolunteerClick(event)}
                    />
                ))}
            </div>

            {/* Modal for confirming volunteering */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Volunteer for Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedEvent && (
                        <>
                            <p><strong>Event:</strong> {selectedEvent.ogName}</p>
                            <p><strong>Description:</strong> {selectedEvent.description}</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirm}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Volunteer;