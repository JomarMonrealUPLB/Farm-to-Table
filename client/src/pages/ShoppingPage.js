import React, { useState } from 'react'
import Header from '../components/Header'
import SearchBox from '../components/SearchBox'
import DropDown1 from '../components/DropDown1'

import './ShoppingPage.css'

import { products } from '../assets/dummy_data/products'
import ProductItem from '../components/ProductItem'
import Popup from '../components/Popup'
import ProductDetailScreen from '../components/PopupScreens/ProductDetailScreen'

const ShoppingPage = () => {
  const [currentProduct, setCurrentProduct] = useState();
  const [isPopupVisible, setIsPopupVisible] = useState(false)

  const tempProducts = products.map(tempProduct =>
    <ProductItem key={tempProduct.id} product={tempProduct} onClick={()=>{setIsPopupVisible(true);setCurrentProduct(tempProduct);}}/>
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
    {name: 'Name (A - Z)', value: 'a-z'},
    {name: 'Name(Z - A)', value: 'z-a'}
  ]

  return (
    <div className='shopping_page page' style={{backgroundColor: '--primary-background'}}>
      <Header headerTitle={'Products'}/>
      <SearchBox placeholder={'Find Products'}/>
      <hr/>
      <div className='shopping_page_dropdowns'>
        <span>Filter By:</span>
        <DropDown1 name={'filter_dropdown'} options={filterOptions} onChange={()=>{}}/>
        <span>Sort By:</span>
        <DropDown1 name={'sort_dropdown'} options={sortOptions} onChange={()=>{}}/>
      </div>
      <hr/>
      <div className='shopping_page-products'>
        {tempProducts}
      </div>
      {isPopupVisible ? 
        <Popup 
          child={<ProductDetailScreen product={currentProduct} productList={products} onCloseClick={()=>setIsPopupVisible(false)}/>} 
          onOutsideClick={()=> setIsPopupVisible(false)}/>: 
          null
      }
    </div>
  )
}

export default ShoppingPage