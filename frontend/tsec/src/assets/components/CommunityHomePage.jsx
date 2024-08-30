import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './HeaderUser';
import Footer from './Footer';
import CommunityEventCard from './CommunityEventCard';
import './CommunityHomePage.css';
import { useLocation } from 'react-router-dom';
import picture from '../../../public/assets/images/VenishaImage.jpg';
import { FaCalendarAlt, FaInfoCircle, FaShareAlt, FaSmile } from 'react-icons/fa';
import { Divider } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendarAlt, faBuilding, faClock, faComment } from '@fortawesome/free-solid-svg-icons';


const CommunityHomePage = () => {
    // State to store fetched events
    const [events, setEvents] = useState([]);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userId = params.get('userId');

    // Fetch data from the backend
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:3000/getPastEvents');
                setEvents(response.data); // Update state with fetched data
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []); // Empty dependency array means this runs once on component mount

    return (
        <>
            <Header />

             <div className='community-header'>
                <h1 className='py-4'>Community Events</h1>
            </div>
            
            {/* Image Section */}
            <div className='bg-gray-100 py-7' style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <img 
                    src={picture} 
                    alt="Venisha" 
                    className="venisha-image" 
                    style={{ borderRadius: '15px', width: "30%", margin: '0 auto' }} 
                />
                            {/* Description Section with Icons */}
            <div className='community-description'>
                <p >
                     Check out the latest community events happening near you!<br />
                     Click on an event to learn more and get involved.<br />
                     Share your thoughts and experiences with the community.<br />
                     Feel the joy of positivity revolve around you!
                </p>
            </div>
                
            </div>
            <Divider />


            {/* Events List Section */}
            <div className='event-list'>
                {events.length > 0 ? (
                    events.map((event, index) => (
                        <CommunityEventCard
                            key={index}
                            location={event.loc}
                            date={event.date}
                            organization={event.ogName}
                            eventName={event.ogName} 
                            time={event.time}
                            eventId={event._id}
                            userId={userId}
                        />
                    ))
                ) : (
                    <p>No events available at the moment.</p>
                )}
            </div>
            
            
            <Footer />
        </>
    );
};

export default CommunityHomePage;
