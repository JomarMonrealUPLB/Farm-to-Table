import React from 'react';
import './ProductDisplay.css';

const ProductDisplay = ({ name, image, description, type, price, quantity}) => {
  return (
    <div className='product_display-card'>
            <div>
                <img src={image} alt={image}/>
                <h1>{name}</h1>
                <p>{description}</p>

            </div>
            <div className='product_display-card-int'>
                <p>Type: {type} </p>
                <p>Price: P {price}/kg </p>
                <p>Quantity: {quantity}</p>
            </div>
        
        
    </div>
  );
};

export default ProductDisplay;
