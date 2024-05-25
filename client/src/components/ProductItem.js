import React from 'react'

import { PiShoppingCartSimpleLight } from 'react-icons/pi'
import { iconColor } from '../constants/IconSize';
import './ProductItem.css'

const ProductItem = ({product, onClick, buttonHandler}) => {
  return (
    <div className='product_item'>
        <img src={product.image} alt={product.name} onClick={onClick}/>
        <div className='product_item-name' onClick={onClick}>{product.name}</div>
        <div className='product_item-price' onClick={onClick}>P {product.price}/kg</div>
        <div className='product_item-qty' onClick={onClick}>Available Qty: {product.quantity} kgs</div>
        <button className='product_item-button' onClick={buttonHandler}>
        <PiShoppingCartSimpleLight color={iconColor} size={'3ch'}/>
        Add To Cart
        </button>
    </div>
  )
}

export default ProductItem