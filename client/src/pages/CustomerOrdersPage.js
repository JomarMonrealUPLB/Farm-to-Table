import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import OrderTabs from '../components/OrderTabs'

const getProductName = async (id) => {
    const result = await fetch(
        `http://localhost:3000/products/${id}`
    ).then(response => response.json())
    return result.name
}

const getProductImage = async (id) => {
    const result = await fetch(
        `http://localhost:3000/products/${id}`
    ).then(response => response.json())
    return result.image
}

const CustomerOrdersPage = () => {
    const [orders, setOrders] = useState([])
    const [filteredOrders, setfilteredOrders] = useState([])

    useEffect(() => {
        const email = sessionStorage.getItem('userEmail')
        fetch(`http://localhost:3000/orders-by-email?email=${email}`)
        .then(response => response.json())
        .then(data => setOrders(data))
    }, [])

    useEffect(() => {
        const fetchAndSerializeData = async () => {
            const serializedData = await Promise.all(
                orders.map(async order => {
                    if(order.status !== 0){
                        const productImage = await getProductImage(order.productID)
                        const productName = await getProductName(order.productID)
                        return{
                            id: order._id,
                            image: productImage,
                            name: productName,
                            date: order.date,
                            quantity: order.quantity,
                            status: order.status
                        }
                    }
                    return null
                })
            )
            const filteredData = serializedData.filter(element => element !== null)
            setfilteredOrders(filteredData)
        }
        fetchAndSerializeData()
    }, [orders])

    
    return (
    <div className='customer_profile page'>
        <Header headerTitle={'Your Orders'}/>
        <OrderTabs orders={filteredOrders}/>
    </div>
    )
}

export default CustomerOrdersPage