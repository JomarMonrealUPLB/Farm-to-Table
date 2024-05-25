import React, {useState, useEffect} from 'react'
import Header from '../components/Header'
import SearchBox from '../components/SearchBox'
import DropDown1 from '../components/DropDown1'
import { sortBy } from '../utils/sortBy'
import { products } from '../assets/dummy_data/products'
import findEntries from '../utils/findEntries'
import DataTable from '../components/DataTable'
import { Link } from 'react-router-dom'
import { IoIosAdd } from "react-icons/io";
import './ProductListingsPage.css'
import Popup from "../components/Popup.js"
import ViewProductScreen from '../components/PopupScreens/ViewProductScreen'

const ProductListingsPage = () => {
    const [productList, setproductList] = useState(products)
    const [originalSerializedProductList, setOriginalSerializedProductList] = useState([])
    const [serializedProductList, setserializedProductList] = useState([])
    const [currentProduct, setCurrentProduct] = useState()
    const [isPopupVisibile, setisPopupVisibile] = useState(false)

    const filterOptions = [
        {name: 'None', value: 'none'},
        {name: 'Fruits', value: 'fruits'},
        {name: 'Vegetables', value: 'vegetables'},
        {name: 'Herbs', value: 'herbs'},
        {name: 'Poultry', value: 'poultry'}
    ]
    
    const sortOptionsName = [
        {name: 'Name (A - Z)', value: 'a-z'},
        {name: 'Name (Z - A)', value: 'z-a'}
    ]

    const sortOptionsPrice = [
        {name: 'Price (low - high)', value: 'low-high'},
        {name: 'Price (high - low)', value: 'high-low'}
    ]

    const heads = [
        {label: "Product Id", width: "20%"}, 
        {label: "Name", width: "20%"}, 
        {label: "Price", width: "15%"}, 
        {label: "Quantity", width: "15%"}, 
        {label: "Actions"}
    ]

    useEffect(() => {
        const serializedData = []
        productList.forEach(product => {
            serializedData.push(
                {   
                    product_id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity,
                    actions: [
                        {
                            label:"View Product", 
                            buttonStyle: {backgroundColor : "#777777", hoverColor: "#444444"} ,
                            callback: ()=>{setCurrentProduct(product);setisPopupVisibile(true)}
                        },
                        {
                            label: "Edit Product",
                            buttonStyle: {backgroundColor : "var(--primary-green)", hoverColor: "var(--primary-green-hover)"},
                            callback: ()=>{}
                        },
                        {
                            label: "Delete Product",
                            buttonStyle: {backgroundColor : "var(--secondary-red)", hoverColor: "var(--secondary-red-hover)"},
                            callback: ()=>{}
                        }
                    ]
                }
            )
        })
        setOriginalSerializedProductList(sortBy(serializedData,"name",true))
        setserializedProductList(sortBy(serializedData,"name",true))
    }, [])
    
    const sortData = (dropDownValue, key) => {
        if(dropDownValue === "a-z" || dropDownValue === "low-high"){
            setserializedProductList(sortBy(originalSerializedProductList,key,true))
        } 
        else{
            setserializedProductList(sortBy(originalSerializedProductList,key,false))
        }
    }

    return(
        <div className='product_listings page'>
            <Header headerTitle={"Product Listings"}/>
            <SearchBox placeholder={'Find Products'} onChange={(e)=>setserializedProductList(findEntries(originalSerializedProductList, e.target.value))}/>
            <hr/>
            <div className='product_listings-dropdowns'>
                <span>Sort By: </span>
                <DropDown1 name="alphabetical_dropdown" options={sortOptionsName} onChange={(e)=>{sortData(e.target.value, "name")}}/>
                <DropDown1 name="price_dropdown" options={sortOptionsPrice} onChange={(e)=>{sortData(e.target.value, "price")}}/>
            </div>
            <hr/>
            <div className='link-wrapper'>
                <Link to={'/add-product'} className='add-product-link'>
                    <button className='add-product-link-button'>
                        <IoIosAdd/>
                        Add Product
                    </button>
                </Link>
            </div>

            <DataTable data={serializedProductList} heads={heads}/>

            {isPopupVisibile?<Popup child={<ViewProductScreen product={currentProduct} onCloseClick={()=>setisPopupVisibile(false)}/>} onOutsideClick={()=>setisPopupVisibile(false)}/>:null}
        </div>
    )
}

export default ProductListingsPage