import React from 'react'
import Header from '../components/Header'
import CartTable from '../components/CartTable';

// for demo only
import { products } from '../assets/dummy_data/products' ;

// add empty state

const CartPage = () => {
  const tempCart = [
    products[0],
    products[1],
    products[4],
    products[12],
    products[14]
  ]

  return (
    <div className='cart page' style={{backgroundColor: '--primary-background'}}>
      <Header headerTitle={'Your Shopping Cart'}/>
      <CartTable cartData={tempCart}/>
    </div>
  )
}

export default CartPage