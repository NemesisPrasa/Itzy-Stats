import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SpotifyFrontGraph = () => {
    const [data, setData] = useState([]);
    const [dates, setDates] = useState([]);

useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('https://itzy-stats.onrender.com/spotifrontGraph');
            const dateEntries = response.data; 
            console.log(dateEntries)

            // Processing daily streams for each date entry
            const processedData = dateEntries.map(entry => ({
                date: entry.date,
                dailyStreams: entry.songTitles.map(song => parseInt(song.DailyStreams.replace(',', ''))).reduce((sum, streams) => sum + streams, 0),
            }));
            setData(processedData);
            console.log(processedData)


            // Calculate total daily streams across all dates
            //const totalDailyStreams = processedData.reduce((sum, entry) => sum + entry.dailyStreams, 0);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);


    return (
       <div className='spotifyInfo'>
         <p>Spotify Daily Streams</p>
        <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data} margin={{ left: 10, top: 10 }}>
        <defs>
            <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10e84a" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10e84a" stopOpacity={0} />
            </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="1 1" opacity="0.2" vertical={false} />
        <XAxis dataKey="date" tick={{ fill: '#b5bcbd', fontSize:11 }}/>
        <YAxis dataKey="dailyStreams" tick={{ fill: '#b5bcbd', fontSize:11 }} tickFormatter={(tick) => {
                if (Math.abs(tick) >= 1e6) {
                    return `${(tick / 1e6).toFixed(1)}M`; 
                } else if (Math.abs(tick) >= 1e3) {
                    return `${(tick / 1e3).toFixed(1)}K`;
                }
                return tick;
          }}/>
        <Tooltip />
        <Legend />
        <Area type="natural" dataKey="dailyStreams" stroke="#10e84a" fill="url(#fillGradient)" 
              // Change interpolation type here
              
        />
        </AreaChart>
        </ResponsiveContainer>

       </div>
    );
};

export default SpotifyFrontGraph;
