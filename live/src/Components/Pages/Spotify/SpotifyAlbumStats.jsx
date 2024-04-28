import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Tooltip, Cell, Label } from 'recharts';
import { albumInfo } from '../../../Constants/index.js';
import './SpotifyAlbumStats.css';

const SpotifyAlbumStats = () => {
  const [albums, setAlbums] = useState(albumInfo);
  const [date, setDate] = useState('');
  const [totalStreams, setTotalStreams] = useState({});
  const [totalDailyStreams, setTotalDailyStreams] = useState({});
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const fetchDate = async () => {
      try {
        const response = await axios.get('https://itzy-stats.onrender.com/spotifyStat');
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
        const response = await axios.get(`https://itzy-stats.onrender.com/spotifyStat/${date}`);
        const statsData = response.data[0]?.songTitles || [];

        const totalStreamsObj = {};
        const totalDailyStreamsObj = {};

        albums.forEach(({ album, songs }) => {
          const matchedStats = statsData.filter(song => songs.includes(song.name));
      
          const total = matchedStats.reduce((acc, song) => acc + parseInt(song.Streams.replace(/,/g, '')), 0);
          totalStreamsObj[album] = total;

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
  }, [date, albums]);

  const pieChartData = albums.map(album => ({
    name: album.album,
    value: parseInt(totalStreams[album.album] || 0), 
  }));

  const getColor = (index) => {
    const colorPalette = ['#4c4a75', '#3b4b6b', '#3e5c63', '#395945', '#455e2d', '#50610c', '#6e4b09', '#803413', '#663824', '#631d1e', '#521d38', '#322342'];
    return colorPalette[index % colorPalette.length];
  };

  useEffect(() => {
    setColors(albums.map((album, index) => getColor(index)));
  }, [albums]);

  return (
    <div className='Album-stats'>
      <div className='spotify-table'>
        <p className='albumdate'>Date: {date}</p>
        <table>
          <thead>
            <tr>
              <th>Album</th>
              <th>Total Streams</th>
              <th>Total Daily Streams</th>
            </tr>
          </thead>
          <tbody>
            {albums.map((album, index) => (
              <tr key={album.album}>
                <td className='albumInfo'> <img src={album.image} alt={album.album} className='albumCover'/> {album.name}</td>
                <td>{parseInt(totalStreams[album.album] || 0).toLocaleString()}</td>
                <td>{parseInt(totalDailyStreams[album.album] || 0).toLocaleString()}</td>
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
    </div>
  );
};

export default SpotifyAlbumStats;

