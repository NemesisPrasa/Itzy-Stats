const mongoose = require('mongoose');

const spotifyStatsSchema = new mongoose.Schema({
    date: { type: String, required: true },
    songTitles: [
    {
      name: String,
      url: String,
      Streams: String,
      DailyStreams: String
    }
  ]
});

const SpotifyStats = mongoose.model('spotifyStats', spotifyStatsSchema);

module.exports = SpotifyStats;