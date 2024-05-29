import React from 'react';
import './TitleCard.css';
import backgroundImage from '../assets/images/background2.png';
import titleImage from '../assets/images/title.png'

const TitleCard = () => {
  return (
    <div className='title_card-card'>
      <div className='title_card-title' >
        <img src={titleImage} alt='Title' />
      </div>
      
      <h1 className='title_card-description'>Harvesting Goodness 
      One Plate at a Time</h1>

      <div className='title_card-background'>
        <img src={backgroundImage} alt='Background' />
      </div>
        
        
    </div>
  );
};

export default TitleCard;
