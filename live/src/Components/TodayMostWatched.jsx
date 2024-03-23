import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YouTubeVideoCard from './YouTubeVideoCard';

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
                    const response = await axios.get(`http://localhost:3001/videoStats/${videoId}`);
                    return { id: videoId, viewCount: response.data?.viewCount };
                });

                const fetchedViews = await Promise.all(promises);
                setYesterdayViews(fetchedViews);
            } catch (error) {
                console.error('Error fetching yesterday stats:', error.message);
            }
        };

        const fetchVideoData = async () => {
            try {
                const promises = videoIds.map(async (videoId) => {
                    const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,statistics&key=AIzaSyAEnQL2SMLAwccHSI8YV2713W_RERBj7-k`);
                    return response.data.items[0];
                });

                const fetchedData = await Promise.all(promises);
                setVideos(fetchedData);

                // Calculate today's views for each video
                const todayViewsData = fetchedData.map(video => {
                    const yesterdayViewCount = parseInt(yesterdayViews.find(v => v.id === video.id)?.viewCount);
                    const currentViewCount = parseInt(video?.statistics?.viewCount);
                    const todayViewsCount = currentViewCount - yesterdayViewCount;
                    return { ...video, todayViewsCount };
                });
                const sortedTodayViewsData = todayViewsData.slice().sort((a, b) => b.todayViewsCount - a.todayViewsCount);
                setTodayViews(sortedTodayViewsData);
                const sortedVideoIds = sortedTodayViewsData.map(video => video.id);
                console.log(sortedVideoIds);
                setVideoIds(sortedVideoIds);
            } catch (error) {
                console.error('Error fetching video details:', error.response?.data?.error?.message || error.message);
            }
        };

        

        // Fetch video data and yesterday's stats
        fetchVideoData();
        fetchYesterdayStats();
    }, []);

    return (
        <div className="video-container">
            <table className="video-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Thumbnail</th>
                        <th>Title</th>
                        <th>Today Views Count</th>
                        <th>Views Count</th>
                        <th>Comment Count</th>
                        <th>Like Count</th>
                        <th>Released</th>
                    </tr>
                </thead>
                <tbody>
                     {arangedVideoIds.map((videoId, index) => (
                        <YouTubeVideoCard key={videoId} index={index + 1} videoId={videoId} />
                     ))}
                </tbody>
            </table>
        </div>
    );
};

export default TodayMostWatched;
