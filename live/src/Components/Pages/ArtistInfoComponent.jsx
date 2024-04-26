import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArtistInfoComponent = () => {
  const [artistInfo, setArtistInfo] = useState(null);
  const [artistID, setArtistName] = useState('2KC9Qb60EaY0kW4eH68vr3');

  useEffect(() => {
    const fetchArtistInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/artist-info/${artistID}`);
        setArtistInfo(response);
        console.log('Artist info:', response);
      } catch (error) {
        console.error('Error fetching artist info:', error);
      }
    };

   
  fetchArtistInfo();

  }, []);

  return (
    <div>
      
    </div>
  );
};

export default ArtistInfoComponent;
