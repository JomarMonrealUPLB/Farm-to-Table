import React from 'react'

const CartTable = ({cartData}) => {
  return (
    <table className='cart_table'>
        <thead className='cart_table-header'>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
        </thead>
        <tbody className='cart_table-body'>

        </tbody>
    </table>
  )
}

export default CartTable