import React from 'react'
import Header from '../components/Header'
import SearchBox from '../components/SearchBox'
import DropDown1 from '../components/DropDown1'

import './ShoppingPage.css'

import { products } from '../assets/dummy_data/products'
import ProductItem from '../components/ProductItem'

const ShoppingPage = () => {
  const tempProducts = products.map(tempProduct =>
    <ProductItem key={tempProduct.id} product={tempProduct}/>
  )

  const filterOptions = [
    {name: 'None', value: 'none'},
    {name: 'Fruits', value: 'fruits'},
    {name: 'Vegetables', value: 'vegetables'},
    {name: 'Herbs', value: 'herbs'},
    {name: 'Poultry', value: 'poultry'}
  ]

  const sortOptions = [
    {name: 'Price (low - high)', value: 'low-high'},
    {name: 'Price (high - low)', value: 'high-low'},
    {name: 'Alphabetically (A - Z)', value: 'a-z'},
    {name: 'Alphabetically (Z - A)', value: 'z-a'},
    {name: 'Best Selling', value: 'best-selling'}
  ]

  return (
    <div className='shopping_page page' style={{backgroundColor: '--primary-background'}}>
      <Header headerTitle={'Products'}/>
      <SearchBox placeholder={'Find Products'}/>

      <hr/>
      <div className='shopping_page_dropdowns'>
        <p>Filter By:</p>
        <DropDown1 name={'filter_dropdown'} options={filterOptions} onChange={()=>{}}/>
        <p style={{marginLeft: '20px'}}>Sort By:</p>
        <DropDown1 name={'sort_dropdown'} options={sortOptions} onChange={()=>{}}/>
      </div>
      <hr/>
      
      <div className='shopping_page-products'>
        {tempProducts}
      </div>

    </div>
  )
}

export default ShoppingPage