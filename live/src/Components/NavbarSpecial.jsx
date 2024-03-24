import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import FilterOptions from './FilterOptions';
import GraphData from './Graphs/GraphData';
import SignUpButton from './Buttons/SignUpButton';
import HeroSection from './Hero/HeroSection'
import ItzyDashBoard from './Pages/ItzyDashBoard';

const NavbarSpecial = () => {
    const [isOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isOpen);
    };

    return (
        <BrowserRouter>

        <nav className="navbar">
            <div>
                <h2>Itzy Stats</h2>
            </div>

            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item dropdown" onMouseEnter={toggleDropdown}>
                    <span className="nav-link">Explore Stats</span>
                    {isOpen && (
                        <div className="dropdown-menu">
                            <Link to="/stats-table" className="dropdown-item">Stats Table</Link>
                            <Link to="/stats-graph" className="dropdown-item">Stats Graph</Link>
                        </div>
                    )}
                </li>
                <li className="nav-item">
                    <Link to="/discography" className="nav-link">Discography</Link>
                </li>
                <li className="nav-item">
                    <Link to="/gallery" className="nav-link">Gallery</Link>
                </li>
            </ul>

            <div>
                <SignUpButton />
            </div>
               
         
        </nav>
                <Routes>
                    <Route path="/stats-table" element={<FilterOptions />} />
                    <Route path="/stats-graph" element={<GraphData />} />
                    <Route path="/" element = {<HeroSection />}/>
                    <Route path="/Itzy-stats" element={<ItzyDashBoard/>} />
                </Routes>
       
        </BrowserRouter>
    );
};

export default NavbarSpecial;
