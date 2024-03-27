import React, { useState } from 'react';
import { Link } from "react-router-dom";
import SignUpButton from './Buttons/SignUpButton';


const NavbarSpecial = () => {
    const [isOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isOpen);
    };

    return (
       

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
                            <Link to="/stats-table" className="dropdown-item">YT Stats</Link>
                            <Link to="/stats-graph" className="dropdown-item">Stats Graph</Link>
                            <Link to="/stats-spotify" className="dropdown-item">Spotify Stats</Link>
                            <Link to="/stats-spotify-album" className="dropdown-item">Spotify Album Stats</Link>
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

        
                
       
       
    );
};

export default NavbarSpecial;
