import React from 'react'

import { PiShoppingCartSimpleLight } from 'react-icons/pi'
import { iconColor } from '../constants/IconSize';
import './ProductItem.css'

const ProductItem = ({product}) => {
  return (
    <div className='product_item'>
        <img src={product.image} alt={product.name}/>
        <div className='product_item-name'>{product.name}</div>
        <div className='product_item-price'>P {product.price}/kg</div>
        <button className='product_item-button'>
        <PiShoppingCartSimpleLight color={iconColor} size={'3ch'}/>
        Add To Cart
        </button>
    </div>
  )
}

export default ProductItem