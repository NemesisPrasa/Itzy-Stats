import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SpotifyTable from './SpotifyTable';

const ItzySpotifyStats = () => {
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDate = async () => {
      try {
        const response = await axios.get('https://itzy-stats-3.onrender.com/spotifyStat');
        if (response.data.length > 0) {
          setDate(response.data[0].date);
        }
      } catch (error) {
        console.error('Error fetching date:', error);
        setError('Error fetching date. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDate();
  }, []);
  return (
    <div>
        <h1>Spotify Play Count</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <p>Date: {date}</p>
          <SpotifyTable date={date} />
        </>
      )}
    </div>
  )
}

export default ItzySpotifyStats