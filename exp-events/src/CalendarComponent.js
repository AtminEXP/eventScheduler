import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './CalendarComponent.css';
import axios from 'axios';

const CalendarComponent = () => {
  const [events, setEvents] = useState([]); // Initialize events state as an empty array

  useEffect(() => {
    // Fetch events from the backend on component mount
    axios.get('http://localhost:3001/calendar-events')
      .then(response => {
        // Transform each event data to match FullCalendar's expected format
        const transformedEvents = response.data.map(event => ({
          title: event.title,
          start: event.start,
          end: event.end,
          // Add other properties as needed, such as 'description' and 'location'
        }));
        setEvents(transformedEvents); // Update the events state with the transformed events
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []); // The empty dependency array ensures this effect runs only once on mount

  return (
    <div class="display-column">
      <div className='calendar-container'>
        <div style={{ width: '80vw', height: '100vh' }}>
          <FullCalendar
            plugins={[dayGridPlugin]} // Use the day grid plugin
            initialView="dayGridMonth" // Set the initial view to show a monthly calendar
            events={events} // Pass the events state to the FullCalendar component
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
      <div className="event-list-container">
        <ul className="event-list">
          {events.map((event, index) => (
            <li key={index} className="event-list-item">
              <div className="event-header">{event.title}</div>
              <div className="event-date"><strong>Date:</strong> {event.start}</div>
              <div className="event-location"><strong>Location:</strong> {event.location}</div>
              <button className="register-button">Register</button>
            </li>
          ))}
        </ul>
      </div>


    </div>
  );
};

export default CalendarComponent;
