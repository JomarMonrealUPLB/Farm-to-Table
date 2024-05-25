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

const OrderFulfillment = () => {
    const [orderList, setOrderList] = useState([])
    const [originalSerializedOrderList, setOriginalSerializedOrderList] = useState([])
    const [serializedOrderList, setSerializedOrderList] = useState([])
    const [isPopupVisibile, setIsPopupVisibile] = useState(false)
    const [currentProduct, setCurrentProduct] = useState()

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
        fetch('http://localhost:3000/orders')
        .then(response => response.json())
        .then(body => {
            setOrderList(body)
        })
    },[])

    useEffect(() => {
        const serializedData = []
        orderList.forEach((order, index) => {
            if(order.status !== 1) return

            serializedData.push(
                {
                    id: order._id,
                    date: new Date(order.date).toLocaleString(),
                    email: order.email,
                    product: "Manok",
                    quantity: order.quantity,
                    status: translateStatus(order.status),
                    actions: [
                        {
                            label:"View Order", 
                            buttonStyle: {backgroundColor : "#777777", hoverColor: "#444444"} ,
                            callback: ()=>{setCurrentProduct(products[0]);setIsPopupVisibile(true)}
                        },
                        {
                            label:"Fulfill Order", 
                            buttonStyle: {backgroundColor : "var(--primary-green)", hoverColor: "var(--primary-green-hover)"} ,
                            callback: ()=>{
                                handleOrderFulfillmentClick(order, 2)
                                setOrderList(
                                    [
                                        ...orderList.slice(0, index),
                                        {...orderList[index], status: 2},
                                        ...orderList.slice(index+1, orderList.length)
                                    ]
                                )
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
            )
            
        })
        setOriginalSerializedOrderList(sortBy(serializedData,"lastName",true))
        setSerializedOrderList(sortBy(serializedData,"lastName",true))
    }, [orderList]);
    
    

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

        {isPopupVisibile?<Popup child={<ViewOrderScreen product={currentProduct} onCloseClick={()=>setIsPopupVisibile(false)}/>} onOutsideClick={()=>setIsPopupVisibile(false)}/>:null}

    </div>
    )

   
}

export default OrderFulfillment