import React, { useEffect, useState } from 'react'
import SearchBox from '../components/SearchBox'
import DropDown1 from '../components/DropDown1'
import DataTable from '../components/DataTable'
import Header from '../components/Header'
import { sortBy } from '../utils/sortBy'
import findEntries  from '../utils/findEntries'
import {products} from "../assets/dummy_data/products.js"
import { translateStatus } from '../utils/translateStatus'
import Popup from '../components/Popup'
import ViewOrderScreen from '../components/PopupScreens/ViewOrderScreen'
import handleOrderFulfillmentClick from '../eventhandlers/OrderFulfillmentHandler'

const getProductName = async (id) => {
    const result = await fetch(
        `${process.env.REACT_APP_API_URL}/products/${id}`
    ).then(response => response.json())
    return result.name
}

const getProduct = async (id) => {
    const result = await fetch(
        `${process.env.REACT_APP_API_URL}/products/${id}`
    ).then(response => response.json())
    return result
}

const OrderFulfillment = () => {
    const [orderList, setOrderList] = useState([])
    const [originalSerializedOrderList, setOriginalSerializedOrderList] = useState([])
    const [serializedOrderList, setSerializedOrderList] = useState([])
    const [isPopupVisibile, setIsPopupVisibile] = useState(false)
    const [currentProduct, setCurrentProduct] = useState()
    const [currentQuantity, setCurrentQuantity] = useState(0)

    const dropDownOptionsDate = [
        {name: "Date (latest-oldest)", value: "latest-oldest"},
        {name: "Date (oldest-latest)", value: "oldest-latest"}
    ]

    const dropDownOptionsEmail = [
        {name: "Email (A-Z)", value: "A-Z"},
        {name: "Email (Z-A)", value: "Z-A"}
    ]

    const heads = [
        {label: "Date"}, 
        {label: "Customer Email"}, 
        {label: "Product"}, 
        {label: "Quantity"}, 
        {label: "Status"}, 
        {label: "Actions"}
    ]

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL+ '/orders')
        .then(response => response.json())
        .then(body => {
            setOrderList(body)
        })
    },[])

    useEffect(() => {
        const fetchAndSerializeData = async () => {
            const serializedData = await Promise.all(
                orderList.map(async (order, index) => {
                    if(order.status === 1){
                        const productName = await getProductName(order.productID)
                        return{
                            id: order._id,
                            date: new Date(order.date).toLocaleString(),
                            email: order.email,
                            product: productName,
                            quantity: order.quantity,
                            status: translateStatus(order.status),
                            actions: [
                                {
                                    label:"View Order", 
                                    buttonStyle: {backgroundColor : "#777777", hoverColor: "#444444"} ,
                                    callback: async ()=>{setCurrentProduct(await getProduct(order.productID));setCurrentQuantity(order.quantity);setIsPopupVisibile(true)}
                                },
                                {
                                    label:"Fulfill Order", 
                                    buttonStyle: {backgroundColor : "var(--primary-green)", hoverColor: "var(--primary-green-hover)"} ,
                                    callback: async ()=>{
                                        if(await handleOrderFulfillmentClick(order, 2) !== "error"){
                                            setOrderList(
                                                [
                                                    ...orderList.slice(0, index),
                                                    {...orderList[index], status: 2},
                                                    ...orderList.slice(index+1, orderList.length)
                                                ]
                                            )
                                        }
                                    }
                                },
                                {
                                    label:"Cancel Order", 
                                    buttonStyle: {backgroundColor : "var(--secondary-red)", hoverColor: "var(--secondary-red-hover)"} , 
                                    callback: ()=>{
                                        handleOrderFulfillmentClick(order, 3)
                                        setOrderList(
                                            [
                                                ...orderList.slice(0, index),
                                                {...orderList[index], status: 3},
                                                ...orderList.slice(index+1, orderList.length)
                                            ]
                                        )
                                    }
                                },
                            ]
                        }
                    }
                    return null;
                })
            )
            const filteredData = serializedData.filter(element => element !== null)
            setOriginalSerializedOrderList(sortBy(filteredData, "lastName", true))
            setSerializedOrderList(sortBy(filteredData, "lastName", true))
        }
        fetchAndSerializeData()
    }, [orderList])
    
    const sortData = (dropDownValue, key) => {
        if(dropDownValue === "A-Z" || dropDownValue == "oldest-latest"){
            setSerializedOrderList(sortBy(originalSerializedOrderList,key,true))
        } else{
            setSerializedOrderList(sortBy(originalSerializedOrderList,key,false))
        }
    }
    
    return (
    <div className='account_management page'>
        <Header headerTitle={"Order FulFillment"}/>
        <SearchBox placeholder="Find Order" onChange={e=>setSerializedOrderList(findEntries(originalSerializedOrderList,e.target.value))}/>

        <hr/>
        <div className='account_management_dropdowns' style={{display: "flex", alignItems: "center"}}>
            <span style={{padding: "5px 1ch"}}>Sort By: </span>
            <DropDown1 name="alphabetical_dropdown" options={dropDownOptionsEmail} onChange={(e)=>{sortData(e.target.value, "email")}}/>
            <DropDown1 name="alphabetical_dropdown" options={dropDownOptionsDate} onChange={(e)=>{sortData(e.target.value, "date")}}/>
        </div>
        <hr/>

        <DataTable data={serializedOrderList} heads={heads}/>

        {isPopupVisibile?<Popup child={<ViewOrderScreen product={currentProduct} quantity={currentQuantity} onCloseClick={()=>setIsPopupVisibile(false)}/>} onOutsideClick={()=>setIsPopupVisibile(false)}/>:null}

    </div>
    )

   
}

export default OrderFulfillment