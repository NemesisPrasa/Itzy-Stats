const mongoose = require('mongoose');

const videStatsSchema = new mongoose.Schema({
    date: String,
    followers: String,
    listeners: String,
});

const SpotifyInfo = mongoose.model('spotifyrecs', videStatsSchema);

module.exports = SpotifyInfo;