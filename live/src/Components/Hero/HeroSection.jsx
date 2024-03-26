import React from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Image01 from '../../assets/image01.png'
import { FaArrowRight } from "react-icons/fa";
import ExploreButton from '../Buttons/ExploreButton';

const HeroSection = () => {
  return (
    <div className="hero-section">
            <div className="hero-content">
                
                <div className="hero-image">
                    <img src={Image01} alt="Hero Image" />
                </div>

                <div className="hero-text">
                    <h1>Discover ITZY's Impressive <br></br>
                        Stats & Achievemnets</h1>

                    <div className='button-container'>
                        <Link to="/Itzy-dashboard" className="nav-link">{<ExploreButton/>}</Link>
                        <p>Read more about us <FaArrowRight /> </p>
                    </div>
                   
                </div>
            </div>
    </div>
  )
}

export default HeroSection