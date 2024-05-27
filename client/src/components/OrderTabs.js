import React, { useState } from 'react'
import OrderItem from '../components/OrderItem'
import './OrderTabs.css'

const OrderTabs = ({orders}) => {
    const [activeTab, setActiveTab] = useState(1)

    const renderOrders = (status) => {
        return orders
            .filter(order => order.status === status)
            .map(order => <OrderItem key={order.id} order={order} />);
    }

    return (
    <div className='order-tabs'>
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