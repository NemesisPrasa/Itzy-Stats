import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Tooltip, Cell, Label } from 'recharts';
import './SpotifyAlbumStats.css';

const SpotifyAlbumStats = () => {
  const [albums, setAlbums] = useState(['ITz_ME','CRAZY_IN_LOVE','GUESS_WHO','NOT_SHY','ITz_ICY','CHESHIRE','CHECKMATE','KILL_MY_DOUBT','BORN_TO_BE','RINGO','NOT_SHY(EN)','ITz_ITZY(JP)']);
  const [songs, setSongs] = useState([]);
  const [date, setDate] = useState('');
  const [useStats, setUseStats] = useState([]);
  const [totalStreams, setTotalStreams] = useState({});
  const [totalDailyStreams, setTotalDailyStreams] = useState({});
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const fetchAlbumNames = async () => {
      try {
        const albumPromises = albums.map(async (album) => {
          const response = await axios.get(`http://localhost:3001/albumNames/${album}`);
          console.log(response);
          return { album, songs: response.data[0]?.songs || [] };
          
        });
        const albumData = await Promise.all(albumPromises);
        setSongs(albumData);
      } catch (error) {
        console.error('Error fetching album names:', error);
      }
    };

    fetchAlbumNames();
  }, [albums]);

  useEffect(() => {
    const fetchDate = async () => {
      try {
        const response = await axios.get('http://localhost:3001/spotifyStat');
        if (response.data.length > 0) {
          setDate(response.data[0].date);
        }
      } catch (error) {
        console.error('Error fetching date:', error);
      }
    };

    fetchDate();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/spotifyStat/${date}`);
        const statsData = response.data[0]?.songTitles || [];

        const totalStreamsObj = {};
        const totalDailyStreamsObj = {}; // Initialize totalDailyStreamsObj

        songs.forEach(({ album, songs }) => {
          const matchedStats = statsData.filter(song => songs.includes(song.name));
          const total = matchedStats.reduce((acc, song) => acc + parseInt(song.Streams.replace(/,/g, '')), 0);
          totalStreamsObj[album] = total;

          // Correct calculation for totalDailyStreams
          const totalDaily = matchedStats.reduce((acc, song) => acc + parseInt(song.DailyStreams.replace(/,/g, '')), 0);
          totalDailyStreamsObj[album] = totalDaily;
        });

        setTotalStreams(totalStreamsObj);
        setTotalDailyStreams(totalDailyStreamsObj);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, [date, songs]);

  const pieChartData = albums.map(album => ({
    name: album,
    value: parseInt(totalStreams[album] || 0), 
  }));

  const getColor = (index) => {
    const colorPalette = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658', '#ffa94d', '#ff7c43', '#ff4d4f', '#f759ab', '#b37feb'];
    return colorPalette[index % colorPalette.length];
  };

  useEffect(() => {
    setColors(albums.map((album, index) => getColor(index)));
  }, [albums]);

  return (
    <div className='Album-stats'>
      
      <div className='spotify-table'>
      <p>Date: {date}</p>
      <table>
        <thead>
          <tr>
            <th>Album</th>
            <th>Total Streams</th>
            <th>Total Daily Streams</th>
          </tr>
        </thead>
        <tbody>
          {albums.map((album) => (
            <tr key={album}>
              <td>{album}</td>
              <td>{parseInt(totalStreams[album] || 0).toLocaleString()}</td>
              <td>{parseInt(totalDailyStreams[album] || 0).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <PieChart width={800} height={500} className='piechart'>
        <Pie
          data={pieChartData}
          cx={400}
          cy={250}
          innerRadius={140}
          outerRadius={180}
          fill="#8884d8"
          dataKey="value"
          label={({ name, value }) => `${name} (${(value * 100 / pieChartData.reduce((acc, entry) => acc + entry.value, 0)).toFixed(2)}%)`}
        >
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
          <Label valueKey="name" position="center" />
        </Pie>
        <Tooltip />
      </PieChart>

      {/* Render your table using useStats and totalStreams */}
    </div>
  );
};

export default SpotifyAlbumStats;


