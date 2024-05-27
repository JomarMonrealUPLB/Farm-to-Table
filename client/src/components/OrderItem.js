import React from 'react'
import './OrderItem.css'

const OrderItem = ({order}) => {
  return (
    <tr className='order-item'>
        <td><img src={order.image} alt='Product'/></td>
        <td>{order.name}</td>
        <td>{order.id}</td>
        <td>{new Date(order.date).toLocaleString()}</td>
        <td>{order.quantity}</td>
    </tr>
  )
}

export default OrderItem