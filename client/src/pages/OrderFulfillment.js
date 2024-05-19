import React, { useEffect, useState } from 'react'
import SearchBox from '../components/SearchBox'
import DropDown1 from '../components/DropDown1'
import {orders} from "../assets/dummy_data/orders"
import DataTable from '../components/DataTable'
import Header from '../components/Header'
import { sortAlphabetically } from '../utils/sortAlphabetically'
import findEntries  from '../utils/findEntries'
import { products } from '../assets/dummy_data/products'
import { translateStatus } from '../utils/translateStatus'

const OrderFulfillment = () => {
    const [orderList, setOrderList] = useState(orders)
    const [originalSerializedOrderList, setOriginalSerializedOrderList] = useState([])
    const [serializedOrderList, setSerializedOrderList] = useState([])

    const dropDownOptionsLastName = [
        {name: "Last Name (A-Z)", value: "A-Z"},
        {name: "Last Name (Z-A)", value: "Z-A"}
    ]

    const dropDownOptionsFirstName = [
        {name: "First Name (A-Z)", value: "A-Z"},
        {name: "First Name (Z-A)", value: "Z-A"}
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
        const serializedData = []
        orderList.forEach(order => {
            if(order.status !== 1) return

            serializedData.push(
                {
                    id: order.id,
                    date: new Date(order.date).toLocaleString(),
                    email: order.email,
                    product: products.find(product => product.id === order.productID).name,
                    quantity: order.quantity,
                    status: translateStatus( order.status),
                    actions: [
                        {
                            label:"View Order", 
                            buttonStyle: {backgroundColor : "#777777", hoverColor: "#444444"} ,
                            callback: ()=>{}
                        },
                        {
                            label:"Fulfill Order", 
                            buttonStyle: {backgroundColor : "var(--primary-green)", hoverColor: "var(--primary-green-hover)"} ,
                            callback: ()=>{}
                        },
                        {
                            label:"Cancel Order", 
                            buttonStyle: {backgroundColor : "var(--secondary-red)", hoverColor: "var(--secondary-red-hover)"} , 
                            callback: ()=>{}
                        },
                    ]
                }
            )
            
        })
        setOriginalSerializedOrderList(sortAlphabetically(serializedData,"lastName",true))
        setSerializedOrderList(sortAlphabetically(serializedData,"lastName",true))
    }, []);
    
    

    const sortData = (dropDownValue, key) => {
        if(dropDownValue === "A-Z"){
            setSerializedOrderList(sortAlphabetically(originalSerializedOrderList,key,true))
        } else{
            setSerializedOrderList(sortAlphabetically(originalSerializedOrderList,key,false))
        }
    }


    return (
    <div className='account_management page'>
        <Header headerTitle={"Order FulFillment"}/>
        <SearchBox placeholder="Find Order" onChange={e=>setSerializedOrderList(findEntries(originalSerializedOrderList,e.target.value))}/>

        <hr/>
        <div className='account_management_dropdowns' style={{display: "flex", alignItems: "center"}}>
            <span style={{padding: "5px 1ch"}}>Sort By: </span>
            <DropDown1 name="alphabetical_dropdown" options={dropDownOptionsFirstName} onChange={(e)=>{sortData(e.target.value, "email")}}/>
            <DropDown1 name="alphabetical_dropdown" options={dropDownOptionsLastName} onChange={(e)=>{sortData(e.target.value, "email")}}/>
        </div>
        <hr/>

        <DataTable data={serializedOrderList} heads={heads}/>

    </div>
    )

   
}

export default OrderFulfillment