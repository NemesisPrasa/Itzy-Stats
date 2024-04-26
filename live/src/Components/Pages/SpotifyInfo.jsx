import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SpotifyInfo = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/spotifyInfo');
        const data = response.data;
        setChartData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='spotifyInfo'>
       <p>Spotify Monthly listners vs Spotify Followers</p>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={chartData} >
          <XAxis dataKey="date" tick={{ fill: '#b5bcbd', fontSize: 11 }} />
          <YAxis tick={{ fill: '#b5bcbd', fontSize: 11 }}
              tickFormatter={(tick) => {
                if (Math.abs(tick) >= 1e6) {
                return `${tick / 1e6}M`;
                }
                return tick;
          }}
/>
          <CartesianGrid strokeDasharray="1 1" opacity="0.2" vertical={false} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="followers" stroke="#10e84a" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="listeners" stroke="#10e4e8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpotifyInfo;
