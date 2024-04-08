import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
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
    <div className='calendar-container'>
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]} // Use the day grid plugin
        initialView="dayGridMonth" // Set the initial view to show a monthly calendar
        events={events} // Pass the events state to the FullCalendar component
      />
    </div>
    </div>
  );
};

export default CalendarComponent;
