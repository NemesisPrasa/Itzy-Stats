import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InstaFollowers = ({userID, name}) => {
  const [followersCount, setFollowersCount] = useState(null);
  const [profilePicSrc, setProfilePicSrc] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://itzy-stats.onrender.com/followers/${userID}`);
        const data = response.data;
        setFollowersCount(data.followersCount); // Update state with followers count
        setProfilePicSrc(data.profilePicSrc); // Update state with profile picture src
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {profilePicSrc ? <img src={profilePicSrc} alt="Profile Pic" className='insta-image'/> : name}
      {followersCount !== null ? (
        <p>{followersCount}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default InstaFollowers;
