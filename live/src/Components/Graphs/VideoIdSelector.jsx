import React, { useState } from 'react';
import ViewsOverTimeChart from './ViewsOverTimeChart';

const VideoIdSelector = () => {
  const [selectedVideoId, setSelectedVideoId] = useState('defaultVideoId');

  const handleVideoChange = (newVideoId) => {
      setSelectedVideoId(newVideoId);
  };

  return (
    <div>
        <select value={selectedVideoId} onChange={(e) => handleVideoChange(e.target.value)} className='mv-picker'>
            <option  value="defaultVideoId">Select Video ID</option>
            <option  value="4R7vRFGJr3k">BORN TO BE</option>
            <option  value="0bIRwBpBcZQ">CAKE</option>
            <option  value="fE2h3lGlOsk">WANNABE</option>
            <option  value="MjCZfZfucEc">LOCO</option>
            <option  value="5e3rKInegeU">UNTOUCHABLE</option>
            <option  value="zugAhfd2r0g">CHESHIRE</option>
            <option  value="Hbb5GPxXF1w">SNEAKERS</option>
            <option  value="_ysomCGaZLw">Marfia in.</option>
            <option  value="pNfTK39k55U">DALLA DALLA</option>
            <option  value="wTowEKjDGkU">NOT SHY</option>
            {/* Add more options as needed */}
        </select>
        <ViewsOverTimeChart videoId={selectedVideoId} />
    </div>
);
};

export default VideoIdSelector;
