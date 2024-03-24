const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const axios = require('axios');
const VideoStats = require('./models/VideoStats');
const SpotifyStats = require('./models/SpotifyStats');
const cors = require('cors');

const app = express();
app.use(cors()); 

// Middleware
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server Error');
});

// MongoDB Connection
mongoose.connect('mongodb+srv://Nemesis:Nemesis@kdrama.7pez0qj.mongodb.net/ItzyStats')
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => console.error('MongoDB connection error:', err));

// Scheduled job to fetch and update video statistics at 8:30 PM daily
cron.schedule('30 20 * * *', async () => {
    try {
        // Fetch video statistics from YouTube API for each video ID
        const videoIds = ["VkIEfqHFNkU", "5e3rKInegeU", "1843Q679cvg", "HnXCezrJEdM", "z75GlxXEfZk", 
        "OSRMoNKftyk", "4R7vRFGJr3k", "0bIRwBpBcZQ", "FcQ6oB1JPiA", "RmTq3cJqyCo", 
        "zugAhfd2r0g", "6uZy86ePgO0", "Hbb5GPxXF1w", "9oyodEkzn94", "MjCZfZfucEc", 
        "_ysomCGaZLw", "dnXyghQd2O8", "wTowEKjDGkU", "fE2h3lGlOsk", "zndvqTc4P9I", 
        "pNfTK39k55U", "krzf1hkFAZA", "F-QTb-0wRGk", "yeHZNPplmm4", "K0xFPQ2CX5E",
        "ytTlH0EpSqI", "5S1nsJs2O6s",];
         // Add more video IDs as needed
        for (const videoId of videoIds) {
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=statistics&key=AIzaSyAEnQL2SMLAwccHSI8YV2713W_RERBj7-k`);
            const { viewCount, likeCount } = response.data.items[0].statistics;
            // Update video statistics in the database
            await VideoStats.create({ videoId, viewCount, likeCount });
        }
        console.log('Video statistics updated successfully');
    } catch (err) {
        console.error('Error updating video statistics:', err.response.data.error.message);
    }
});


app.get('/videoStats/:videoId', async (req, res) => {
    try {
        const { videoId } = req.params;
        const lastVideoStats = await VideoStats.findOne({ videoId }).sort({ timestamp: -1 }).exec();
        res.json(lastVideoStats);

    } catch (err) {
        console.error('Error fetching video statistics:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/calculateViewsDifference/:videoId', async (req, res) => {
    try {
        const { videoId } = req.params;

        // Fetch the last two data entries for the specified video ID
        const lastTwoVideoStats = await VideoStats.find({ videoId }).sort({ timestamp: -1 }).limit(2).exec();

        // Check if there are at least two entries
        if (lastTwoVideoStats.length < 2) {
            return res.status(404).json({ error: 'Insufficient data to calculate difference' });
        }

        // Calculate the difference in dates
        const date1 = new Date(lastTwoVideoStats[0].timestamp);
        const date2 = new Date(lastTwoVideoStats[1].timestamp);
        const dateDifference = Math.abs(date1 - date2);
        const daysDifference = Math.ceil(dateDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

        // Check if the days difference meets your condition (e.g., x days)
        const x = 2; // Set your desired threshold for days difference here
        if (daysDifference > x) {
            // Calculate the views difference and divide by (x - 1)
            const difference = lastTwoVideoStats[0].viewCount - lastTwoVideoStats[1].viewCount;
            const adjustedDifference = difference / (x - 1);

            res.json({ difference: adjustedDifference });
        } else {
            // Calculate the regular views difference
            const difference = lastTwoVideoStats[0].viewCount - lastTwoVideoStats[1].viewCount;
            res.json({ difference });
        }
    } catch (err) {
        console.error('Error calculating views difference:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/viewsOverTime/:videoId', async (req, res) => {
    try {
        const { videoId } = req.params;
        const viewsData = await VideoStats.find({ videoId }).sort({ timestamp: -1 }).limit(8).exec();

        // Calculate view count difference for each day
        const viewCountDiffData = viewsData.map((data, index) => {
            if (index < viewsData.length - 1) {
                const currentViewCount = data.viewCount;
                const nextViewCount = viewsData[index + 1].viewCount;
                const viewCountDiff = currentViewCount - nextViewCount;
                return { date: data.timestamp, viewCountDiff };
            }
            return null;
        }).filter(item => item !== null);

        res.json(viewCountDiffData);
    } catch (error) {
        console.error('Error fetching views over time:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/spotifyStats/:date', async (req, res) => {
    const date = req.params.date;
    try {
      const songs = await SpotifyStats.find({ date });
      res.json(songs);
    } catch (error) {
      console.error('Error fetching songs:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
