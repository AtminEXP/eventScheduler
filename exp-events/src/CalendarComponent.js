import React, { useState, useEffect } from 'react';
import { parse } from 'papaparse';

const CalendarComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const csvFileUrl = 'paste your url link';
     fetch(csvFileUrl)
      .then(response => response.text())
      .then(csvText => parse(csvText, {
        complete: (result) => {
          console.log('Parsed CSV data: ', result.data);
          setData(result.data);
        }
      }));
  }, []);

  return (
    <div>
      {/* Render your CSV data here */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default CalendarComponent;
