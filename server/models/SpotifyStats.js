const mongoose = require('mongoose');

const videStatsSchema = new mongoose.Schema({
    date: String,
  songTitles: [
    {
      name: String,
      url: String,
      Streams: String,
      DailyStreams: String
    }
  ]
});

const SpotifyStats = mongoose.model('spotifystats', videStatsSchema);

module.exports = SpotifyStats;