import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/NavbarSpecial';
import FilterOptions from './Components/FilterOptions';
import GraphData from './Components/Graphs/GraphData';
import HeroSection from './Components/Hero/HeroSection'
import ItzySpotifyStats from './Components/Pages/ItzySpotifyStats';
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
                
                </Routes>
              
            </div>
          </Router>
          
       
    );
};

export default App;
