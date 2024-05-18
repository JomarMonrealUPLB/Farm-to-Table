import React from 'react'

import { PiShoppingCartSimpleLight } from 'react-icons/pi'
import { iconColor } from '../constants/IconSize';
import './ProductItem.css'

const ProductItem = ({product, onClick}) => {
  return (
    <div className='product_item'>
        <img src={product.image} alt={product.name}/>
        <div className='product_item-name'>{product.name}</div>
        <div className='product_item-price'>P {product.price}/kg</div>
        <div className='product_item-qty'>Available Qty: {product.quantity} kgs</div>
        <button className='product_item-button' onClick={onClick}>
        <PiShoppingCartSimpleLight color={iconColor} size={'3ch'}/>
        Add To Cart
        </button>
    </div>
  )
}

export default ProductItem