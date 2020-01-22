import React, { useState, useRef, useEffect } from 'react';
import './style.css'
import {
    Card,
    CardText,
    CardBody,
    CardTitle,
} from 'reactstrap';

const AboutPage: React.FC = () => {
    const [video, setVideo] = useState()
    const videoRef = useRef()

    return (
        <div>
            <video autoPlay muted loop id="myVideo" ref={video}>
                <source src="/forest.mp4" type="video/mp4" />
            </video>
            <div className="about-container">
                <Card style={{ width: '30rem' }}>
                    <CardBody>
                        <CardTitle><h1>WingSpan</h1></CardTitle>
                        <CardText>
                            Jack, write some beautiful poetry
              </CardText>
                        <CardText>
                            Jack, Loves Alex,
                            He loves her very much,
                            She loves him even though he's a weirdo
              </CardText>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default AboutPage;