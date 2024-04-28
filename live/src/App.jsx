import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/NavbarSpecial';
import FilterOptions from './Components/FilterOptions';
import GraphData from './Components/Graphs/GraphData';
import HeroSection from './Components/Hero/HeroSection'
import ItzySpotifyStats from './Components/Pages/Spotify/ItzySpotifyStats';
import ItzyDashBoard from './Components/Pages/ItzyDashBoard';
import SpotifyAlbumStats from './Components/Pages/Spotify/SpotifyAlbumStats';
import './App.css';

const App = () => {
    

    return (
          <Router>
        
            <div className='App'>
                <Navbar />
                <Routes>
                    <Route path="/stats-table" element={<FilterOptions />} />
                    <Route path="/stats-graph" element={<GraphData />} />
                    <Route path="/" element = {<HeroSection />}/>
                    <Route path="/stats-spotify" element={<ItzySpotifyStats />} />
                    <Route path="/Itzy-dashboard" element={<ItzyDashBoard/>}/>
                    <Route path="/stats-spotify-album" element={<SpotifyAlbumStats />} />
                
                </Routes>
              
            </div>
          </Router>
          
       
    );
};

export default App;
