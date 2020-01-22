import React, { useState, useRef, useEffect } from 'react';
import './style.css'

const AboutPage: React.FC = () => {
    const [video, setVideo] = useState()
    const videoRef = useRef()

    return (
        <div>
            <video autoPlay muted loop id="myVideo" ref={video}>
                <source src="/forest.mp4" type="video/mp4" />
            </video>
            <div className="about-container">
                
            </div>
        </div>
    )
}

export default AboutPage;