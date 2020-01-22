import React, { useState, useRef, useEffect } from 'react';
import './style.css';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';

const AboutPage: React.FC = () => {
  const [video, setVideo] = useState();
  const videoRef = useRef();

  return (
    <div>
      <video autoPlay muted loop id='myVideo' ref={video}>
        <source src='/forest.mp4' type='video/mp4' />
      </video>
      <div className='about-container'>
        <Card style={{ width: '30rem' }}>
          <CardBody>
            <CardTitle>
              <h1>WingSpan</h1>
            </CardTitle>
            <CardText>
              Wingspan gives you the power to make more informed choices about
              the products you buy. Choices that reflect your commitment to
              doing better by the planet, people, and animals. We believe that
              companies have a responsibility and should be transparent about
              their impact. How do the products you purchase get to you, and how
              do they compare to others?
            </CardText>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
