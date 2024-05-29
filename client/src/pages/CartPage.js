import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import CartTable from '../components/CartTable';

// for demo only
import { products } from '../assets/dummy_data/products' ;

// add empty state

const CartPage = () => {
  return (
    <div className='cart page' style={{backgroundColor: '--primary-background'}}>
      <Header headerTitle={'Your Shopping Cart'}/>
      <CartTable/>
    </div>
  )
}

export default CartPage