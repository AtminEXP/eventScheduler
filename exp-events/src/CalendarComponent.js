import React, { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import ICAL from 'ical.js';
import axios from 'axios';

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Move convertICalToFullCalendarEvents outside of fetchData
  const convertICalToFullCalendarEvents = (icalEvents) => {
    return icalEvents.map(event => ({
      title: event.summary,
      start: event.startDate.toJSDate(),
      end: event.endDate.toJSDate(),
      // Add other properties as needed
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const calendarUrls = [
          'https://calendar.google.com/calendar/ical/c_e046e4547a291447d2f69732911d8b7328f4c71cb3a789049733cd839beee071%40group.calendar.google.com/public/basic.ics',
          'https://calendar.google.com/calendar/ical/exprealty.com_5ch808oclndj5grro9tm5ve9co%40group.calendar.google.com/public/basic.ics'
          // ... more calendar URLs
        ];

        await fetchAndProcessCalendars(calendarUrls);
      } catch (error) {
        console.error("Event not loaded:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  async function fetchAndProcessCalendars(calendarUrls) {
    try {
      await Promise.all(calendarUrls.map(async (url) => {
        const response = await axios.get(url, {
          headers: {
            'Content-type': 'application/json; charset=utf-8'
            // Other headers if necessary
          }
        });
        const icsData = response.data;
        const jcalData = ICAL.parse(icsData);
        const comp = new ICAL.Component(jcalData);
        const vevents = comp.getAllSubcomponents('vevent');
        const icsEvents = vevents.map(vevent => new ICAL.Event(vevent));
        const fcEvents = convertICalToFullCalendarEvents(icsEvents);
        setEvents(currentEvents => [...currentEvents, ...fcEvents]);
      }));
    } catch (err) {
      console.error('Error fetching or processing calendar:', err);
    }
  }

  return (
    loading ? (
      <p>Loading...</p>
    ) : (
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    )
  );
};

export default CalendarComponent;
