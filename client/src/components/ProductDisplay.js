import React from 'react';
import './ProductDisplay.css';
import { ProductType } from '../constants/ProductType';

const ProductDisplay = ({ name, image, description, type, price, quantity}) => {
  return (
    <div className='product_display-card'>
            <div>
                <img src={image} alt={image}/>
                <h1>{name}</h1>
                <p>{description}</p>

            </div>
            <div className='product_display-card-int'>
                <p>Type: {ProductType.toString(parseInt(type))} </p>
                <p>Price: P {price}/kg </p>
                <p>Quantity: {quantity}</p>
            </div>
        
        
    </div>
  );
};

export default ProductDisplay;
