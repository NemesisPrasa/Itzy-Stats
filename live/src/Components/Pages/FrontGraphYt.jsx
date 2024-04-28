import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FrontGraphYt = ({ videoId }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axios.get(`https://itzy-stats.onrender.com/frontGrpah/${videoId}`);
                const data = response.data;

                // Process data to extract timestamp and view count
                const chartData = data.map(entry => ({
                    timestamp: new Date(entry.date).toISOString().split('T')[0], // Get date part
                    viewCount: entry.viewCountDifferent,
                }));

                const sortedData = chartData.sort((a, b) => {
                    // Convert timestamps to Date objects for comparison
                    const dateA = new Date(a.timestamp);
                    const dateB = new Date(b.timestamp);
                
                    // Compare dates
                    return dateA - dateB;
                });

                setChartData( sortedData);
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        };

        // Fetch chart data when component mounts
        fetchChartData();
    }, [videoId]);

    return (
        <div className='chartViews'>
            <ResponsiveContainer width={380} height={250}>
                <BarChart data={chartData} >
                    <XAxis dataKey="timestamp" tick={{ fill: '#b5bcbd', fontSize: 11 }}/>
                    <YAxis type="number" tick={{ fill: '#b5bcbd', fontSize: 11 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="viewCount" fill="#ed5c8d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default FrontGraphYt;

