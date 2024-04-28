import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArrangedYt from './ArrangedYt';

const TodayMostWatched = () => {
    const videoIds = ["VkIEfqHFNkU", "5e3rKInegeU", "1843Q679cvg", "HnXCezrJEdM", "z75GlxXEfZk", 
                      "OSRMoNKftyk", "4R7vRFGJr3k", "0bIRwBpBcZQ", "FcQ6oB1JPiA", "RmTq3cJqyCo", 
                      "zugAhfd2r0g", "6uZy86ePgO0", "Hbb5GPxXF1w", "9oyodEkzn94", "MjCZfZfucEc", 
                      "_ysomCGaZLw", "dnXyghQd2O8", "wTowEKjDGkU", "fE2h3lGlOsk", "zndvqTc4P9I", 
                      "pNfTK39k55U", "krzf1hkFAZA", "F-QTb-0wRGk", "yeHZNPplmm4", "K0xFPQ2CX5E",
                      "ytTlH0EpSqI", "5S1nsJs2O6s"];

    const [videos, setVideos] = useState([]);
    const [yesterdayViews, setYesterdayViews] = useState([]);
    const [todayViews, setTodayViews] = useState([]);
    const [arangedVideoIds, setVideoIds] = useState([]);

    useEffect(() => {
        const fetchYesterdayStats = async () => {
            try {
                const promises = videoIds.map(async (videoId) => {
                    const response = await axios.get(`https://itzy-stats.onrender.com/videoStats/${videoId}`);
                    return { id: videoId, viewCount: response.data?.viewCount };
                });
    
                const fetchedViews = await Promise.all(promises);
                setYesterdayViews(fetchedViews);
                return fetchedViews; // Return fetchedViews for Promise.all
            } catch (error) {
                console.error('Error fetching yesterday stats:', error.message);
                return []; // Return an empty array in case of error
            }
        };
    
        const fetchVideoData = async (yesterdayViewsData) => {
            try {
                const promises = videoIds.map(async (videoId) => {
                    const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,statistics&key=AIzaSyAEnQL2SMLAwccHSI8YV2713W_RERBj7-k`);
                    return response.data.items[0];
                });
    
                const fetchedData = await Promise.all(promises);
                setVideos(fetchedData);
    
                // Calculate today's views for each video
                const todayViewsData = fetchedData.map(video => {
                    const yesterdayViewCount = parseInt(yesterdayViewsData.find(v => v.id === video.id)?.viewCount);
                    const currentViewCount = parseInt(video?.statistics?.viewCount);
                    const todayViewsCount = currentViewCount - yesterdayViewCount;
                    return { ...video, todayViewsCount };
                });
                const sortedTodayViewsData = todayViewsData.slice().sort((a, b) => b.todayViewsCount - a.todayViewsCount);
                setTodayViews(sortedTodayViewsData);
                const sortedVideoIds = sortedTodayViewsData.map(video => video.id);
              
                setVideoIds(sortedVideoIds);
            } catch (error) {
                console.error('Error fetching video details:', error.response?.data?.error?.message || error.message);
            }
        };
    
        // Fetch yesterday's stats and then fetch video data
        fetchYesterdayStats()
            .then(yesterdayViewsData => fetchVideoData(yesterdayViewsData))
            .catch(error => console.error('Error fetching data:', error));
    
    }, []); // Run once on component mount
    

    return (
        <div className="video-container">
            {arangedVideoIds ? (
            <table className="video-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Thumbnail</th>
                        <th>Title</th>
                        <th>Today Views Count</th>
                        <th>Total Views Count</th>
                        <th>Daily Views Growth</th>
                    </tr>
                </thead>
                <tbody>
                     {arangedVideoIds.map((videoId, index) => (
                        <ArrangedYt key={videoId} index={index + 1} videoId={videoId} />
                     ))}
                </tbody>
            </table>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default TodayMostWatched;

//AIzaSyAEnQL2SMLAwccHSI8YV2713W_RERBj7-k
