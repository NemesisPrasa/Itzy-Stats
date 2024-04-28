import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SpotifyAlbumTable = ({ date }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {

      try {
        const response = await axios.get(`https://itzy-stats.onrender.com/spotifyStat/${date}`);
        setSongs(response.data[0]?.songTitles);
      } catch (error) {
        console.error('Error fetching songs:', error);
        setError('Error fetching data. Please try again later.');
      } 
    };

    fetchSongs();
  }, []); // Include date in the dependency array

  return (
    <div className="spotify-table">
      {songs.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Album Name</th>
              <th>Total Streams</th>
              <th>Daily Streams</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song, index) => (
              <tr key={index}>
                <td>{song.name} </td>
                <td>{song.Streams}</td>
                <td>{song.DailyStreams}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data found for the selected date</p>
      )}
    </div>
  );
};

export default SpotifyAlbumTable;
