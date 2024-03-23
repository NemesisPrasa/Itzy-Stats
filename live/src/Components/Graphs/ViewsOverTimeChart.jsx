import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ViewsOverTimeChart = ({ videoId }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/viewsOverTime/${videoId}`);
                const data = response.data;
              

                // Process data to extract timestamp and view count
                const chartData = data.map(entry => ({
                    timestamp: new Date(entry.date).toISOString().split('T')[0], // Get date part
                    viewCount: entry.viewCountDiff,
                }));

                setChartData(chartData);
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        };

        // Fetch chart data when component mounts
        fetchChartData();
    }, [videoId]);

    return (
        <div className='chartViews'>
            <LineChart width={800} height={400} data={chartData} margin={{left:40, top:40,}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis dataKey="viewCount"/>
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="viewCount" stroke="#8884d8" strokeWidth={3}/>
            </LineChart>

        </div>
    );
};

export default ViewsOverTimeChart;





