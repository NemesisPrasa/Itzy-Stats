import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoCaretUp, IoCaretDown} from "react-icons/io5";


const ArrangedYt = ({ index, videoId }) => {
    const [videoData, setVideoData] = useState(null);
    const [viewCount, setViewCount] = useState(0);
    const [yesterdayViews, setYesterdayViews] = useState(null);
    const [todayViews, setTodayViews] = useState(0);
    const [growth, setGrowth] = useState(0);
    const [yesterday, setYesterday] = useState(null);

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,statistics&key=AIzaSyAEnQL2SMLAwccHSI8YV2713W_RERBj7-k`);
                const fetchedData = response.data.items[0];
                if (fetchedData) {
                    setVideoData(fetchedData);
                    const currentViewCount = parseInt(fetchedData.statistics.viewCount);
                    setViewCount(currentViewCount);
                    const todayViewsCount = currentViewCount - yesterdayViews;
                    setTodayViews(todayViewsCount);
                }
            } catch (error) {
                console.error('Error fetching video details:', error.response?.data?.error?.message || error.message);
            }
        };

        const fetchYesterdayStats = async () => {
            try {
                const response = await axios.get(`https://itzy-stats.onrender.com/videoStats/${videoId}`);
                if (response.data) {
                    setYesterdayViews(response.data.viewCount);
                }
            } catch (error) {
                console.error('Error fetching yesterday stats:', error);
            }
        };

        const fetchGrowth = async () => {
            try {
                const response = await axios.get(`https://itzy-stats.onrender.com/youtubeDailyDifferenece/${videoId}`);
                const resdata = response.data[0].viewCountDifferent;
                setYesterday(resdata);
                const growth = todayViews - resdata;
                setGrowth(growth);
                
            } catch (error) {
                console.error('Error fetching growth:', error);
            }
        };

        // Fetch video data, yesterday's views, and growth initially
        fetchVideoData();
        fetchYesterdayStats();
        fetchGrowth();

    }, [videoId, yesterdayViews, todayViews]);

    // Function to remove "ITZY" and "@ITZY" from the title
    const getTitleWithoutITZY = (title) => {
        const regex = /(?:\b|\B@)ITZY\b/gi;
        return title.replace(regex, '').trim();
    };

    return (
        <tr className="video-card">
            <td>{index}</td>
            {videoData ? (
                <>
                    <td><img src={videoData.snippet.thumbnails.medium.url} alt={videoData.snippet.title} /></td>
                    <td>{getTitleWithoutITZY(videoData.snippet.title)}</td>
                    <td><p>{todayViews.toLocaleString()}</p></td>
                    <td><p>{viewCount.toLocaleString()}</p></td>
                    <td>
                        <p className='growth'>
                            {(growth > 0) ? 
                                (<><IoCaretUp className='upArrow'/>{growth.toLocaleString()}</>) :
                                (<><IoCaretDown className='downArrow'/>{Math.abs(growth).toLocaleString()}</>)
                            }
                        </p>
                    </td>
                </>
            ) : (
                <td className="loading-cell" colSpan="7">Loading...</td>
            )}
        </tr>
    );
};

export default ArrangedYt;
