import React, { useState } from 'react';
import ViewsOverTimeChart from './ViewsOverTimeChart';

const VideoIdSelector = () => {
  const [selectedVideoId, setSelectedVideoId] = useState('defaultVideoId');

  const handleVideoChange = (newVideoId) => {
      setSelectedVideoId(newVideoId);
  };

  return (
    <div>
        <select value={selectedVideoId} onChange={(e) => handleVideoChange(e.target.value)}>
            <option value="defaultVideoId">Select Video ID</option>
            <option value="4R7vRFGJr3k">Born To Be</option>
            <option value="HnXCezrJEdM">Cake</option>
            {/* Add more options as needed */}
        </select>
        <ViewsOverTimeChart videoId={selectedVideoId} />
    </div>
);
};

export default VideoIdSelector;
