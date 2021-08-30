import React from 'react'
import Tilt from 'react-parallax-tilt'
import "./Logo.css"
import brain from './brain.png'

const Logo = () => {
    return (
    <Tilt tiltMaxAngleX={5}
    tiltMaxAngleY={5}
    perspective={3000}>
      <div className="tilt-container" style={{width: '100px', height: '100px' }}>
        <img src={brain} alt="brain-logo" />
      </div>
    </Tilt>
    );
}

export default Logo;