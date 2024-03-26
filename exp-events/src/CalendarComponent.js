import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import ICAL from 'ical.js';

const CalendarComponent = () => {
 const [events, setEvents] = useState([]);

 useEffect(() => {
    const calendarUrls = [
      'https://calendar.google.com/calendar/ical/c_e046e4547a291447d2f69732911d8b7328f4c71cb3a789049733cd839beee071%40group.calendar.google.com/public/basic.ics',
      'https://calendar.google.com/calendar/ical/exprealty.com_5ch808oclndj5grro9tm5ve9co%40group.calendar.google.com/public/basic.ics'
      // ... more calendar URLs
    ];

    const convertICalToFullCalendarEvents = (icalEvents) => {
      return icalEvents.map(event => ({
        title: event.summary,
        start: event.startDate.toJSDate(),
        end: event.endDate.toJSDate(),
        // Add other properties as needed
      }));
    };

    calendarUrls.forEach(url => {
      fetch(url)
        .then(response => response.text())
        .then(str => new ICAL.Component(ICAL.parse(str)))
        .then(comp => {
          const vevents = comp.getAllSubcomponents('vevent');
          const icsEvents = vevents.map(vevent => new ICAL.Event(vevent));
          const fcEvents = convertICalToFullCalendarEvents(icsEvents);
          setEvents(currentEvents => [...currentEvents, ...fcEvents]);
        })
        .catch(err => console.error('Error fetching or parsing calendar:', err));
    });
 }, []);

 return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
    />
 );
};

export default CalendarComponent;
