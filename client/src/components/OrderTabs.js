import React, { useState, useEffect } from 'react'
import OrderItem from '../components/OrderItem'
import './OrderTabs.css'
import Header from './Header'

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

const OrderTabs = ({email}) => {
    const [orders, setOrders] = useState([])
    const [filteredOrders, setfilteredOrders] = useState([])
    const [activeTab, setActiveTab] = useState(1)

    useEffect(() => {
        fetch(`http://localhost:3000/orders-by-email?email=${email}`)
        .then(response => response.json())
        .then(data => setOrders(data))
    }, [email])

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

    const renderOrders = (status) => {
        return filteredOrders
            .filter(order => order.status === status)
            .map(order => <OrderItem key={order.id} order={order} />);
    }

    return (
    <div className='order-tabs'>
        <Header headerTitle={'Orders'}/>
        <div className="tabs">
            <button className={activeTab === 1 ? 'active' : ''} onClick={() => setActiveTab(1)}>Pending</button>
            <button className={activeTab === 2 ? 'active' : ''} onClick={() => setActiveTab(2)}>Fulfilled</button>
            <button className={activeTab === 3 ? 'active' : ''} onClick={() => setActiveTab(3)}>Cancelled</button>
        </div>
        <div className="tab-content">
            <table className='order-table' cellSpacing={0}>
                <thead className='order-table-header'>
                    <tr>
                        <th className='label-product'>Product</th>
                        <th className='label-name'>Name</th>
                        <th className='label-id'>Order ID</th>
                        <th className='label-date'>Date Ordered</th>
                        <th className='label-qty'>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {activeTab === 1 && renderOrders(1)}
                    {activeTab === 2 && renderOrders(2)}
                    {activeTab === 3 && renderOrders(3)}
                </tbody>
            </table>
        </div> 
    </div>
    )
}

export default OrderTabs