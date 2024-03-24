import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SpotifyTable = () => {
  const [songs, setSongs] = useState([]);
  const [date, setDate] = useState('24March20');

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/spotifyStats/${date}`);
        setSongs(response.data);
        console.log(response);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, []);

  return (
    <div className="song-table">
      
    </div>
  );
};

export default SpotifyTable;