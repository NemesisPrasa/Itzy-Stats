import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Area, AreaChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const ViewsOverTimeChart = ({ videoId }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/viewsOverTime/${videoId}`);
                const data = response.data;
                const processedData = data.map((entry, index, array) => {
                    if (index > 0) {
                        const currentDate = new Date(entry.date.split('T')[0]);
                        const prevDate = new Date(array[index - 1].date.split('T')[0]);
                        const dateDifference = Math.ceil((prevDate - currentDate)/(1000*60*60*24));
                       
             
                
                        // Check if dateDifference is greater than zero before division
                        if (dateDifference > 0) {
                            const viewCountDiffPerDay = array[index - 1].viewCountDifferent / dateDifference;
                
                            return {
                                timestamp: prevDate.toISOString().split('T')[0],
                                viewCountDifferent: viewCountDiffPerDay,
                            };
                        }
                    }
                    return null;
                }).filter(item => item !== null);

                const sortedData = processedData.sort((a, b) => {
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
        <ResponsiveContainer width="70%" height={500}>
        <AreaChart data={chartData} margin={{ left: 90, top: 15 }}>
        <defs>
            <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e3f522" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#e3f522" stopOpacity={0} />
            </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="1 1" opacity="0.2" vertical={false} />
        <XAxis dataKey="timestamp" tick={{ fill: '#b5bcbd' }}/>
        <YAxis dataKey="viewCountDifferent" tick={{ fill: '#b5bcbd' }} />
        <Tooltip />
        <Legend />
        <Area type="natural" dataKey="viewCountDifferent" stroke="#e3f522" fill="url(#fillGradient)" 
              // Change interpolation type here
              
        />
    </AreaChart>
</ResponsiveContainer>
    </div>
    );
};

export default ViewsOverTimeChart;
