  const express = require('express');
const axios = require('axios');
const ical = require('ical.js');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Enable CORS for your frontend domain
app.use(cors({
  origin: 'http://localhost:3000' // Adjust this to your frontend's domain
}));

// Route to fetch calendar events
app.get('/calendar-events', async (req, res) => {
  try {
    const icsUrls = [
      //6 calendars
      'https://calendar.google.com/calendar/ical/exprealty.com_5ch808oclndj5grro9tm5ve9co%40group.calendar.google.com/public/basic.ics',
      'https://calendar.google.com/calendar/ical/exprealty.net_bdno70mljh0lpokh6s15cnnvak%40group.calendar.google.com/public/basic.ics',
      'https://calendar.google.com/calendar/ical/exprealty.net_blpo463c5dhnr1tnekbla6umdk%40group.calendar.google.com/public/basic.ics'

      // Add more URLs as needed
    ];

    let allEvents = [];

    for (const url of icsUrls) {
      const response = await axios.get(url);
      const icsData = response.data;
      const jcalData = ical.parse(icsData);
      const comp = new ical.Component(jcalData);
      const events = comp.getAllSubcomponents('vevent').map((vevent) => {
        const event = new ical.Event(vevent);
        return {
          title: event.summary,
          start: event.startDate.toJSDate(),
          end: event.endDate.toJSDate(),
          location: event.location?event.location : '',
          discription: event.discription?event.discription:''

          // Add more event properties as needed
        };
      });

      allEvents.push(...events);
    }

    res.json(allEvents);
  } catch (error) {
    console.error('Failed to fetch or parse calendar:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
