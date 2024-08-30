import React from 'react';
import './CommunityEventCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendarAlt, faBuilding, faClock, faTag, faComment } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
const EventCard = ({ location, date, organization, eventName, time, eventId, userId }) => {
    const navigate = useNavigate();
    console.log(eventId);
    const handleOnClick = (eventId) => {
        navigate('/chatPage?eventId=' + eventId + '&userId=' + userId );
    };
    return (
        <div className="event-card">
            <h3 className="event-name font-bold">{eventName}</h3>
            <p className="event-detail"><FontAwesomeIcon icon={faMapMarkerAlt} /> {location}</p>
            <p className="event-detail"><FontAwesomeIcon icon={faCalendarAlt} /> {date}</p>
            <p className="event-detail"><FontAwesomeIcon icon={faBuilding} /> {organization}</p>
            <p className="event-detail"><FontAwesomeIcon icon={faClock} /> {time}</p>
            <p className="event-detail chat bg-lpurple p-2 rounded text-white font-bold" onClick={() => handleOnClick(eventId)}><FontAwesomeIcon icon={faComment} /> Tell us about what you think? </p>
        </div>
    );
};

export default EventCard;