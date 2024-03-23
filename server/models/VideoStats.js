const mongoose = require('mongoose');

const videoStatsSchema = new mongoose.Schema({
    videoId: { type: String, required: true },
    viewCount: { type: Number, required: true },
    likeCount: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

const VideoStats = mongoose.model('videostats', videoStatsSchema);

module.exports = VideoStats;