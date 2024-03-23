import React from 'react'
import { useState } from 'react';
import ViewsOverTimeGraph from './ViewsOverTimeChart';
import VideoIdSelector from './VideoIdSelector';

const GraphData = () => {
    const [selectedVideoId, setSelectedVideoId] = useState('');
    const [viewsOverTimeData, setViewsOverTimeData] = useState([]);

    const handleVideoIdSelected = (videoId, data) => {
        setSelectedVideoId(videoId);
        setViewsOverTimeData(data);
    };

  return (
    <div>
        <h1>Views Over Time Graph</h1>
            <VideoIdSelector onVideoIdSelected={handleVideoIdSelected} />
             {selectedVideoId && (
            <ViewsOverTimeGraph videoId={selectedVideoId} viewsOverTimeData={viewsOverTimeData} />
            )}
    </div>
  )
}

export default GraphData