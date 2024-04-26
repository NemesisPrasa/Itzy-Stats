import React from 'react';
import FrontGraphYt from './FrontGraphYt';
import FrontGraphYtChannel from './FrontGraphYtChannel';
import InstaFollowers from './InstaFollowers';
import ArtistInfoComponent from './ArtistInfoComponent';
import './itzyDashBoard.css';
import SpotifyInfo from './SpotifyInfo';
import SpotifyFrontGraph from './SpotifyFrontGraph';
import SpotifyTotalStreams from './SpotifyTotalStreams';

const ItzyDashBoard = () => {

//["itzy.all.in.us","lia_loves___","chaerrry0","igotyuandme","iamfinethankyouandryu","yezyizhere"]

  return (

    <div className='Itzy-dash-board'>
      <div className='frist-row'>

        <div className='left-side-top'>
          <div>
          <h1>ITZY on Youtube</h1>
          </div>
          
          <div>
            <FrontGraphYtChannel channelId='UCDhM2k2Cua-JdobAh5moMFg' />

          </div>
          <div>
            <FrontGraphYtChannel channelId='UCJsfO4nKS3_c24zLbF8rT0A' />
          </div>
          
        </div>
         

        <div className='col'>
          <div className='first-col'>
          <h1>ITZY on Instagram</h1>
          <div className='inner-row'>
             <InstaFollowers userID='itzy.all.in.us' name='Itzy'/>
             <InstaFollowers userID='yezyizhere' name='Yeji'/>
             <InstaFollowers userID='lia_loves___' name='Lia'/>
          </div>
          <div className='inner-row'>
             <InstaFollowers userID='iamfinethankyouandryu' name='Ryujin'/>
             <InstaFollowers userID='chaerrry0' name='Chearyeongy'/>
             <InstaFollowers userID='igotyuandme' name='Yuna'/>
          </div>

          </div>
          
             
        </div>
        
        <div className='right-side-top'>
          <h1>Untouchable MV daily views</h1>
          <FrontGraphYt videoId='5e3rKInegeU' />
        </div>
      </div>

      <div className='second-row'>
        

        <div className='col'>
          <SpotifyInfo />
        </div>

        <div className='col'>
          <SpotifyTotalStreams />
        </div>

        <div className='col'>
          <SpotifyFrontGraph />
         
        </div>
      </div>  


    </div>


  );
};

export default ItzyDashBoard;

