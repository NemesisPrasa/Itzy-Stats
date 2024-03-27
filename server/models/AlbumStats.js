const mongoose = require('mongoose');

const videStatsSchema = new mongoose.Schema({
    album: String,
    songs: Array,
});

const AlbumStats = mongoose.model('albumnames', videStatsSchema);

module.exports = AlbumStats;