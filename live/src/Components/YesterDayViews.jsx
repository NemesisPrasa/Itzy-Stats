import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import the default odometer styles


const YesterDayViews = ({ index, videoId }) => {
    const [videoData, setVideoData] = useState(null);
    const [viewCount, setViewCount] = useState(0);
    const [yesterdayViews, setYesterdayViews] = useState([]);

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,statistics&key=AIzaSyAEnQL2SMLAwccHSI8YV2713W_RERBj7-k`);
                const fetchedData = response.data.items[0];
                
                if (fetchedData) {
                    setVideoData(fetchedData);
                   
                    const currentViewCount = parseInt(fetchedData.statistics.viewCount);
                    setViewCount(currentViewCount);
                 
                }
            } catch (error) {
                console.error('Error fetching video details:', error.response.data.error.message);
            }
        };

        const fetchYesterdayStats = async () => {
            try {
                const response = await axios.get(`https://itzy-stats-3.onrender.com/calculateViewsDifference/${videoId}`);
                setYesterdayViews(response.data.difference);
                
            } catch (error) {
                console.error('Error fetching yesterday stats:', error);
            }
        };

        // Fetch video data and yesterday's views initially
        fetchVideoData();
        fetchYesterdayStats();

    }, []);

    // Function to remove "ITZY" and "@ITZY" from the title
    const getTitleWithoutITZY = (title) => {
        const regex = /(?:\b|\B@)ITZY\b/gi;
        return title.replace(regex, '').trim();
    };

    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Get only the date part
    };

    return (
        <tr className="video-card">
            <td>{index}</td>
            {videoData ? (
                <>
                    <td><img src={videoData.snippet.thumbnails.medium.url} alt={videoData.snippet.title} /></td>
                    <td>{getTitleWithoutITZY(videoData.snippet.title)}</td>
                    <td><p>{yesterdayViews.toLocaleString()}</p></td>
                    <td><p>{viewCount.toLocaleString()}</p></td>
                    <td><p>{videoData ? parseInt(videoData.statistics.commentCount).toLocaleString() : 0}</p></td>
                    <td><p>{videoData ? parseInt(videoData.statistics.likeCount).toLocaleString() : 0}</p></td>
                    <td><p>{formatDateString(videoData.snippet.publishedAt)}</p></td>
                    
                    
                </>
            ) : (
                <td className="loading-cell" colSpan="7">Loading...</td>
            )}
        </tr>
    );
};

export default YesterDayViews;