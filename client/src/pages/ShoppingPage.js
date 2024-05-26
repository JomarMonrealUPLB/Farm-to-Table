import Header from '../components/Header'
import SearchBox from '../components/SearchBox'
import DropDown1 from '../components/DropDown1'
import ProductItem from '../components/ProductItem'
import Popup from '../components/Popup'
import ProductDetailScreen from '../components/PopupScreens/ProductDetailScreen'
import './ShoppingPage.css'

import React, { useState, useEffect } from 'react'
import { sortBy } from '../utils/sortBy'
import findEntries from '../utils/findEntries'
import handleAddToCartClick from '../eventhandlers/AddToCartHandler'

const ShoppingPage = () => {
  const [productList, setProductList] = useState([])
  const [originalSerializedProductList, setOriginalSerializedProductList] = useState([])
  const [serializedProductList, setserializedProductList] = useState([])

  const [currentProduct, setCurrentProduct] = useState();
  const [isPopupVisible, setIsPopupVisible] = useState(false)

  const sortOptions = [
    {name: 'Price (low - high)', value: 'low-high'},
    {name: 'Price (high - low)', value: 'high-low'},
    {name: 'Name (A - Z)', value: 'a-z'},
    {name: 'Name (Z - A)', value: 'z-a'}
  ]

  const filterOptions = [
    {name: 'None', value: 0},
    {name: 'Fruits', value: 1},
    {name: 'Vegetables', value: 2},
    {name: 'Herbs', value: 3},
    {name: 'Poultry', value: 4}
  ]

  const filterData = (dropDownValue) => {
    dropDownValue = parseInt(dropDownValue)
    if(dropDownValue === 0) setserializedProductList(originalSerializedProductList)
    else{
      let temp = []
      originalSerializedProductList.forEach(product =>{
        if(product.type === dropDownValue) temp.push(product)
      })
      setserializedProductList(temp)
    }
  }

  const sortData = (dropDownValue) => {
    switch (dropDownValue) {
      case "a-z":
        setserializedProductList(sortBy(originalSerializedProductList,"name",true))
        break;
      case "z-a":
        setserializedProductList(sortBy(originalSerializedProductList,"name",false))
        break;
      case "low-high":
        setserializedProductList(sortBy(originalSerializedProductList,"price",true))
        break;
      case "high-low":
        setserializedProductList(sortBy(originalSerializedProductList,"price",false))
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    fetch('http://localhost:3000/products')
    .then(response => response.json())
    .then(body => {setProductList(body)})
  }, [])

  useEffect(() => {
    setOriginalSerializedProductList(sortBy(productList,"price",true))
    setserializedProductList(sortBy(productList,"price",true))
  }, [productList])
  
  return (
    <div className='shopping_page page' style={{backgroundColor: '--primary-background'}}>
      <Header headerTitle={'Products'}/>
      <SearchBox placeholder={'Find Products'} onChange={e=>setserializedProductList(findEntries(originalSerializedProductList,e.target.value))}/>
      <hr/>
      <div className='shopping_page_dropdowns'>
        <span>Filter By:</span>
        <DropDown1 name={'filter_dropdown'} options={filterOptions} onChange={(e)=>{filterData(e.target.value)}}/>
        <span>Sort By:</span>
        <DropDown1 name={'sort_dropdown'} options={sortOptions} onChange={(e)=>{sortData(e.target.value)}}/>
      </div>
      <hr/>
      <div className='shopping_page-products'>
        {serializedProductList.map(productItem =>
          <ProductItem 
            key={productItem._id} 
            product={productItem} 
            onClick={()=>{setIsPopupVisible(true);setCurrentProduct(productItem);}}
            buttonHandler={()=>{if(productItem.quantity !== 0) handleAddToCartClick(productItem)}} 
          />
        )}
      </div>
      {isPopupVisible ? 
        <Popup 
          child={<ProductDetailScreen product={currentProduct} productList={serializedProductList} onCloseClick={()=>setIsPopupVisible(false)}/>} 
          onOutsideClick={()=> setIsPopupVisible(false)}/>: 
          null
      }
    </div>
  )
}

export default ShoppingPage