import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FrontGraphYt = ({ videoId }) => {
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
            <BarChart width={500} height={250} data={chartData} margin={{ left: 0, top: 0 }}>
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="viewCount" fill="#8884d8" />
            </BarChart>
        </div>
    );
};

export default FrontGraphYt;
