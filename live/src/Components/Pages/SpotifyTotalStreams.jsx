import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, Text } from 'recharts';

const SpotifyTotalStreams = () => {
    const [totalStreams, setTotalStreams] = useState(0);
    const [completionPercentage, setCompletionPercentage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/spotifyStat');
                const data = response.data[0].songTitles;
                
                // Process data to extract total streams
                const processedData = data.map(entry => ({
                    TotalStreams: parseInt(entry.Streams.replace(/,/g, '')), // Remove commas and convert to number
                }));

                const totalSpotifyStreams = processedData.reduce((sum, entry) => sum + entry.TotalStreams, 0);
                const completionTarget = 3e9; // 3 billion
                const percentage = (totalSpotifyStreams / completionTarget) * 100;
                setCompletionPercentage(percentage);

                // Update state with total streams
                setTotalStreams(totalSpotifyStreams);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const data = [{ name: 'Completed', value: completionPercentage }, { name: 'Remaining', value: 100 - completionPercentage }];

    const COLORS = ['#10e84a', '#10e4e8'];
    const formatLabel = (value, name) => {
        if (name === 'Completed') {
            return `${totalStreams / 1e9}B`; // Display total streams in billions for completed segment
        } else {
            const remainingStreams = 3e9 - totalStreams; // Calculate remaining streams
            return `${remainingStreams / 1e9}B`; // Display remaining streams in billions for remaining segment
        }
    };
    
    return (
        <div className='spotify-pie'>
            <h2>Total Spotify Streams:<br>
            </br> {totalStreams.toLocaleString()}</h2>
            <ResponsiveContainer width={300} height={200}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        innerRadius={60}
                        fill="#8884d8"
                        paddingAngle={5}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Text x="50%" y="50%" dy={8} textAnchor="middle" fill="#10e84a">
                        <p>3B</p>
                    </Text>
                   
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default SpotifyTotalStreams;
