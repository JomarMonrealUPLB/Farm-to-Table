import React from 'react'
import { products } from '../assets/dummy_data/products'
import Header from '../components/Header'

const ShoppingPage = () => {
  return (
    <div className='shopping_page page' style={{backgroundColor: "--primary-background"}}>
      <Header headerTitle={"Products"}/>
    </div>
  )
}

export default ShoppingPage