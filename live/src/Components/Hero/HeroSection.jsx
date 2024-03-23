import React from 'react'
import Image01 from '../../assets/image01.png'
import { FaArrowRight } from "react-icons/fa";

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
                        <button className="hero-button">Explore </button>
                        <p>Read more about us <FaArrowRight /> </p>
                    </div>
                   
                </div>
            </div>
    </div>
  )
}

export default HeroSection