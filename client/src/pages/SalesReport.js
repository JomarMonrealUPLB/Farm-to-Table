import React, { useEffect, useState } from 'react'
import SearchBox from '../components/SearchBox'
import DropDown1 from '../components/DropDown1'
import {orders} from "../assets/dummy_data/orders"
import DataTable from '../components/DataTable'
import Header from '../components/Header'
import { sortBy } from '../utils/sortBy'
import findEntries  from '../utils/findEntries'
import { products } from '../assets/dummy_data/products'
import { translateStatus } from '../utils/translateStatus'
import { translateProductType } from '../utils/translateProductType'

const SalesReport = () => {
    const [orderList, setOrderList] = useState(orders)
    const [originalSerializedOrderList, setOriginalSerializedOrderList] = useState([])
    const [serializedOrderList, setSerializedOrderList] = useState([])
    const [totalSales, setTotalSales] = useState(0)

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
        {label: "Product"}, 
        {label: "Type"}, 
        {label: "Price"}, 
        {label: "Sold"}, 
        {label: "Sales"}
    ]

    useEffect(() => {
        const serializedData = []
        setTotalSales(0)
        orderList.forEach(order => {
            if(order.status !== 2) return

            const product = products.find(product => product.id === order.productID)
            const soldOrders = orderList.filter(jOrder => jOrder.status === 2 && jOrder.productID === product.id)
            let soldCount = 0
            soldOrders.forEach(soldOrder => {
                soldCount += soldOrder.quantity
            });

            serializedData.push(
                {
                    id: order.id,
                    date: new Date(order.date).toLocaleString(),
                    product: product.name,
                    type: translateProductType(product.type),
                    price: product.price,
                    sold: soldCount,
                    sales: product.price * soldCount,
                }
            )
            setTotalSales(totalSales => totalSales += product.price * soldCount) 
            
        })
        setOriginalSerializedOrderList(sortBy(serializedData,"lastName",true))
        setSerializedOrderList(sortBy(serializedData,"lastName",true))
    }, []);
    
    

    const sortData = (dropDownValue, key) => {
        if(dropDownValue === "A-Z" || dropDownValue == "oldest-latest"){
            setSerializedOrderList(sortBy(originalSerializedOrderList,key,true))
        } else{
            setSerializedOrderList(sortBy(originalSerializedOrderList,key,false))
        }
    }


    return (
    <div className='account_management page'>
        <Header headerTitle={"Sales Report"}/>
        <SearchBox placeholder="Find Order" onChange={e=>setSerializedOrderList(findEntries(originalSerializedOrderList,e.target.value))}/>

        <hr/>
        <div className='account_management_dropdowns' style={{display: "flex", alignItems: "center"}}>
            <span style={{padding: "5px 1ch"}}>Sort By: </span>
            <DropDown1 name="alphabetical_dropdown" options={dropDownOptionsEmail} onChange={(e)=>{sortData(e.target.value, "email")}}/>
            <DropDown1 name="alphabetical_dropdown" options={dropDownOptionsDate} onChange={(e)=>{sortData(e.target.value, "date")}}/>
        </div>
        <hr/>

        <h1 style={{paddingTop:"1ch"}}>Weekly Report</h1>

        <DataTable data={serializedOrderList} heads={heads}/>
        <hr/>
            <div className='sales_total_container' style={{display: "flex", justifyContent:"end", alignItems:"center", fontSize: "20px",backgroundColor:"var(--primary-background)"}}>
                <span>Total Sales: </span>
                <strong>P {totalSales}</strong>
            </div>
        <hr/>

    </div>
    )

   
}

export default SalesReport