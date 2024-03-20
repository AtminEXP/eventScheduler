import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './CalendarComponent.css';
import logo from './EXP-2 logo.jpg'; 
const CalendarComponent = () => {
  // Helper function to add hours to a JavaScript Date object


  const addHoursToDate = (date, hours) => {
    return new Date(date.getTime() + hours * 60 * 60 * 1000);
  };

  // Helper function to parse the duration string "2 hrs" into a number
  const parseDuration = (durationString) => {
    const [hours] = durationString.split(' ');
    return parseInt(hours, 10); // parse the hours as an integer
  };

  // Mock events data
  const mockEvents = [
    { title: 'First Onboarding session with Julia', date: '2024-03-05', time: '14:20:00', duration: '2 hrs', location: 'Illinois' },
    { title: 'All-hands Meeting', date: '2024-03-20', time: '13:30:00', duration: '2 hrs', location: 'University Expo World' },
    { title: 'Texas Agne Summit', date: '2024-03-29', time: '09:30:00', duration: '4 hrs', location: 'Texas Room' },
    // ... add more mock events if needed
  ];

  // Process events to include end times
  const calendarEvents = mockEvents.map((event) => {
    const startTime = new Date(`${event.date}T${event.time}`);
    const durationHours = parseDuration(event.duration);
    const endTime = addHoursToDate(startTime, durationHours);
    return {
      title: event.title,
      start: startTime,
      end: endTime,
      extendedProps: {
        location: event.location,
      },
    };
  });

  return (
    <div className="calendar-container">
      <div className="full-calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={calendarEvents}
        />
      </div>
      <div className="event-list-container">
        <ul className="event-list">
          {mockEvents.map((event, index) => (
            <li key={index} className="event-list-item">
              <div className="event-header">{event.title}</div>
              <div className="event-date"><strong>Date:</strong> {event.date}</div>
              <div className="event-time"><strong>Time:</strong> {event.time}</div>
              <div className="event-duration"><strong>Duration:</strong> {event.duration}</div>
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
