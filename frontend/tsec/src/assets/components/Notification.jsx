import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Notification({userId}) {
    const [events, setEvents] = useState([]); // Ensure initial state is an empty array
    
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:3000/get_request',{
                    params:{userId}
                });
                setEvents(response.data); // Update state with fetched data
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div>
            <h2>Notification</h2>
            {events.length === 0 ? (
                <p>No events available.</p>
            ) : (
                <ul>
                    {events.map((event, index) => (
                        <li key={index}>
                            <p><strong>To:</strong> {event.to}</p>
                            <p><strong>From:</strong> {event.from}</p>
                            <p><strong>Quantity:</strong> {event.quan}</p>
                            <p><strong>Product:</strong> {event.prod}</p>
                            <p><strong>Stage:</strong> {event.stage}</p>
                            <p><strong>Estimated Time:</strong> {event.estimate_time}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Notification;