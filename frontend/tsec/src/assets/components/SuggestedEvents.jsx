import React, { useState, useEffect } from 'react';
import Header from './Header';
import axios from 'axios';
import './SuggestedEvents.css';
const suggestedEvents = [
    { id: 1, name: "City Marathon", description: "Based on the success of Charity Run 2023" },
    { id: 2, name: "Hunger Relief Campaign", description: "Similar to the successful Food Drive" },
    { id: 3, name: "Environmental Awareness Week", description: "Expanding on the Beach Cleanup event" },
  ];

function SuggestedEvents() {
  const [events, setEvents] = useState([]); // Ensure initial state is an empty array
  
  useEffect(() => {
    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:3000/getPastEvents');
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
      <Header />
      <section className="mb-10">
        <hr className="mb-4" />
        <h2 className="text-2xl font-semibold mb-4 text-center">Past Successful Events</h2>
        <div className="flex w-max space-x-4 p-4">
          {events.map((event) => (
            <div key={event._id} className="w-[340px] border border-purple-500 rounded-md bg-light-purple">
              <div className="p-2">
                <img src={event.image_src} alt={event.ogName} className="w-full h-[150px] object-cover rounded-t-lg" />
              </div>
              <div className="p-4">
                <h3 className="text-lg mb-2">{event.ogName}</h3>
                <p className="text-sm text-gray-600">Funds Raised: {event.fundCollect}</p>
                <p className="text-sm text-gray-600">Volunteers: {event.vol}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-center">Suggested Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {suggestedEvents.map((event) => (
            <div key={event.id} className="border border-purple-500 p-4 rounded-md bg-light-purple">
              <h3 className="text-lg font-semibold mb-2">{event.name}</h3>
              <p className="text-gray-600">{event.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SuggestedEvents;