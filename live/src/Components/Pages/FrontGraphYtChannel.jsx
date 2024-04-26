import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FrontGraphYtChannel = ({channelId}) => {
    const [subscribersCount, setSubscribersCount] = useState(null);
    const [viewCount, setViewCount] = useState(null);
    const [channelUrl, setChannelUrl] = useState(null);
    const [videoCount, setVideoCount] = useState(null);

    useEffect(() => {
        const fetchSubscribersCount = async () => {
            try {
                const response = await axios.get(
                    `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=AIzaSyAEnQL2SMLAwccHSI8YV2713W_RERBj7-k`
                );

                const { subscriberCount } = response.data.items[0].statistics;
                const { viewCount } = response.data.items[0].statistics;
                const {videoCount} = response.data.items[0].statistics;
                const url = response.data.items[0].snippet.thumbnails.medium.url;
    
                
                setSubscribersCount(parseInt(subscriberCount));
                setViewCount(parseInt(viewCount));
                setChannelUrl(url);
                setVideoCount(videoCount);
            } catch (error) {
                console.error('Error fetching subscribers count:', error);
            }
        };

        fetchSubscribersCount();
    }, []);
  return (
    <div className='youtube-stats'>

            {
                channelUrl !==null ? (
                    <img src = {channelUrl} alt= "itzy"></img>
                ) : (
                    <p>Loading...</p>
                )
            }

            <div className='views-and-subs'>
                {subscribersCount !== null ? (
                <p>Subscribers: {subscribersCount.toLocaleString()}</p>
                ) : (
                <p>Loading...</p>
                 )}
                 {viewCount !== null ? (
                <p>Total Views: {viewCount.toLocaleString()}</p>
                    ) : (
                <p>Loading...</p>
                 )}
                 {
                    videoCount !== null ? (
                    <p>Total Videos: {videoCount.toLocaleString()}</p>
                    ) : (
                <p>Loading...</p>
                    )
                 }
            </div>
           
            
        </div>
  )
}

export default FrontGraphYtChannel