import React from 'react';
import YouTubeVideoCard from './YouTubeVideoCard';

const VideoTable = ({ videoIds }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Release Date</th>
                    <th>Comment Count</th>
                    <th>Like Count</th>
                    <th>Views Count</th>
                    <th>Today Views Count</th>
                </tr>
            </thead>
            <tbody>
                {videoIds.map((videoId) => (
                    <tr key={videoId}>
                        <td>
                            <YouTubeVideoCard videoId={videoId} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default VideoTable;