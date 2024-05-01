const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const axios = require('axios');
const VideoStats = require('./models/VideoStats');
const SpotifyStats = require('./models/SpotifyStats');
const AlbumStats = require('./models/AlbumStats');
const SpotifyInfo = require('./models/SpotifyInfo');
const cors = require('cors');
const cheerio = require('cheerio');

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
        const viewsData = await VideoStats.find({ videoId }).sort({ timestamp:-1 }).exec();

        // Calculate view count difference per day
        const viewCountDiffData = viewsData.map((data, index) => {
            if (index < viewsData.length - 1) {
                const currentViewCount = data.viewCount;
                const nextViewCount = viewsData[index + 1].viewCount;
                const viewCountDiff = currentViewCount - nextViewCount;

                
                return { date: data.timestamp, viewCountDifferent: viewCountDiff };
            }
            return null;
        }).filter(item => item !== null);

        res.json(viewCountDiffData);
    } catch (error) {
        console.error('Error fetching views over time:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/youtubeDailyDifferenece/:videoId', async (req, res) => {
    try {
        const { videoId } = req.params;
        const viewsData = await VideoStats.find({ videoId }).sort({ timestamp:-1 }).limit(2).exec();

        // Calculate view count difference per day
        const viewCountDiffData = viewsData.map((data, index) => {
            if (index < viewsData.length - 1) {
                const currentViewCount = data.viewCount;
                const nextViewCount = viewsData[index + 1].viewCount;
                const viewCountDiff = currentViewCount - nextViewCount;

                
                return { date: data.timestamp, viewCountDifferent: viewCountDiff };
            }
            return null;
        }).filter(item => item !== null);

        res.json(viewCountDiffData);
    } catch (error) {
        console.error('Error fetching views over time:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/frontGrpah/:videoId', async (req, res) => {
    try {
        const { videoId } = req.params;
        const viewsData = await VideoStats.find({ videoId }).sort({ timestamp:-1 }).limit(7).exec();

        // Calculate view count difference per day
        const viewCountDiffData = viewsData.map((data, index) => {
            if (index < viewsData.length - 1) {
                const currentViewCount = data.viewCount;
                const nextViewCount = viewsData[index + 1].viewCount;
                const viewCountDiff = currentViewCount - nextViewCount;

                
                return { date: data.timestamp, viewCountDifferent: viewCountDiff };
            }
            return null;
        }).filter(item => item !== null);

        res.json(viewCountDiffData);
    } catch (error) {
        console.error('Error fetching views over time:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/spotifyStat/:date', async (req, res) => {
    try {
      const { date } = req.params;
      const spotifyStat = await SpotifyStats.find({date}, 'songTitles').exec();
      res.json(spotifyStat);
    } catch (error) {
      console.error('Error fetching songs:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.get('/spotifyStat', async (req, res) => {
    try {
      const spotifyStatLast = await SpotifyStats.find().sort({ date: -1 }).limit(1).exec();
      res.json(spotifyStatLast);
    } catch (error) {
      console.error('Error fetching songs:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.get('/spotifrontGraph', async (req, res) => {
    try {
      const spotifyStatLast = await SpotifyStats.find().exec();
      res.json(spotifyStatLast);
    } catch (error) {
      console.error('Error fetching songs:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/albumNames/:album', async (req, res) => {
    try {
      const {album} = req.params;
      const albumNames = await AlbumStats.find({album}, 'songs').exec();
      res.json(albumNames);
    } catch (error) {
      console.error('Error fetching songs:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/followers/:userID', async (req, res) => {
    try {
        const { userID } = req.params;
        const response = await axios.get(`https://www.instagram.com/${userID}/`);
        const $ = cheerio.load(response.data);

        // Extract followers count using Cheerio
        const followers = $('meta[property="og:description"]').attr('content');
        const followersCount = followers ? followers.split(' ')[0] : null;

        // Extract user profile picture source
        const profilePicSrc = $('meta[property="og:image"]').attr('content');

        if (followersCount && profilePicSrc) {
            res.json({ followersCount, profilePicSrc });
        } else {
            res.status(404).json({ error: 'Followers count or profile picture source not found' });
        }
    } catch (error) {
        console.error('Error fetching followers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/spotifyInfo', async (req, res) => {
    try {
      const spotifyInfo = await SpotifyInfo.find().exec();
      res.json(spotifyInfo);
    } catch (error) {
      console.error('Error fetching songs:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});


//<span class="x1lliihq x1plvlek xryxfnj x1n2onr6 x193iq5w xeuugli x1fj9vlw x13faqbe x1vvkbs x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x1i0vuye xvs91rp xo1l8bm x1roi4f4 x2b8uid x10wh9bi x1wdrske x8viiok x18hxmgj" dir="auto" style="line-height: var(--base-line-clamp-line-height); --base-line-clamp-line-height: 18px;"><span class="_ac2a _ac2b"><span class="html-span xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs">12</span></span> posts</span></li><li class="x6s0dn4 x78zum5 xvs91rp xl56j7k x2b8uid x1ltjmfc x2pgyrj x4tmyev"><a class="x1i10hfl xjbqb8w x1ejq31n xd10rxx x1sy0etr x17r0tee x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xt0psk2 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz _alvs _a6hd" href="/chaerrry0/followers/" role="link" tabindex="0"><span class="x1lliihq x1plvlek xryxfnj x1n2onr6 x193iq5w xeuugli x1fj9vlw x13faqbe x1vvkbs x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x1i0vuye xvs91rp xo1l8bm x1roi4f4 x2b8uid x10wh9bi x1wdrske x8viiok x18hxmgj" dir="auto" style="line-height: var(--base-line-clamp-line-height); --base-line-clamp-line-height: 18px;"><span class="_ac2a _ac2b" title="2,230,586"><span class="html-span xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs">2.2M</span></span> followers</span></a></li><li class="x6s0dn4 x78zum5 xvs91rp xl56j7k x2b8uid x1ltjmfc x2pgyrj x4tmyev"><a class="x1i10hfl xjbqb8w x1ejq31n xd10rxx x1sy0etr x17r0tee x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xt0psk2 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz _alvs _a6hd" href="/chaerrry0/following/" role="link" tabindex="0"><span class="x1lliihq x1plvlek xryxfnj x1n2onr6 x193iq5w xeuugli x1fj9vlw x13faqbe x1vvkbs x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x1i0vuye xvs91rp xo1l8bm x1roi4f4 x2b8uid x10wh9bi x1wdrske x8viiok x18hxmgj" dir="auto" style="line-height: var(--base-line-clamp-line-height); --base-line-clamp-line-height: 18px;"><span class="_ac2a _ac2b"><span class="html-span xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs">5</span></span> following</span></a></li></ul>

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//<span class="_ac2a _ac2b" title="2,237,612"><span class="html-span xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs">2.2M</span></span>
