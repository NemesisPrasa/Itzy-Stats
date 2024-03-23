import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YouTubeVideoCard from './YouTubeVideoCard';

const MostWatchedTable = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const videoIds = ["VkIEfqHFNkU", "5e3rKInegeU", "1843Q679cvg", "HnXCezrJEdM", "z75GlxXEfZk", 
                      "OSRMoNKftyk", "4R7vRFGJr3k", "0bIRwBpBcZQ", "FcQ6oB1JPiA", "RmTq3cJqyCo", 
                      "zugAhfd2r0g", "6uZy86ePgO0", "Hbb5GPxXF1w", "9oyodEkzn94", "MjCZfZfucEc", 
                      "_ysomCGaZLw", "dnXyghQd2O8", "wTowEKjDGkU", "fE2h3lGlOsk", "zndvqTc4P9I", 
                      "pNfTK39k55U", "krzf1hkFAZA", "F-QTb-0wRGk", "yeHZNPplmm4", "K0xFPQ2CX5E",
                      "ytTlH0EpSqI", "5S1nsJs2O6s",
                       ];

                const promises = videoIds.map(async (videoId) => {
                    const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,statistics&key=AIzaSyAEnQL2SMLAwccHSI8YV2713W_RERBj7-k`);
                    return response.data.items[0];
                });

                const videosData = await Promise.all(promises);
                videosData.sort((a, b) => parseInt(b.statistics.viewCount) - parseInt(a.statistics.viewCount));
                setVideos(videosData);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
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
                        {videos.map((video, index) => (
                            <YouTubeVideoCard key={video.id} index={index + 1} videoId={video.id} />
                         ))}
                    </tbody>
                </table>
    </div>
    );
};

export default MostWatchedTable;