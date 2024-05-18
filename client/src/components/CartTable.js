import React, { useState } from 'react'
import './CartTable.css'

const CartTable = ({cartData}) => {
  const [total, setTotal] = useState(0)


  const cartItems = cartData;
  return (
    <table className='cart_table' cellSpacing={0}>
        <thead className='cart_table-header'>
          <tr>
            <th className='header-label-product'>Product</th>
            <th className='header-label-name'/>
            <th className='header-label-price'> Price</th>
            <th className='header-label-qty'>Quantity</th>
            <th className='header-label-total'>Total</th>
          </tr>
        </thead>
        <tbody className='cart_table-body'>
          
          {
            //move to another compenent ?
            //total should be dynamic
            //quantity not yet working
            cartItems.map(cartItem => (
              <tr className='cart_table-row' key={cartItem.name}>
                <td className='cart_table-row-img'>
                  <img src={cartItem.image} alt={cartItem.name}/>
                </td>
                <td className='cart_table-row-name'>
                  {cartItem.name}<br/>
                  <button className='cart_table-row-button' onClick={()=>{}}>Remove</button>
                </td>
                <td className='cart_table-row-price'>P {cartItem.price}</td>
                <td className='cart_table-row-qty'>
                  <input type='number' value={cartItem.quantity} onChange={()=>{}}/>
                </td>
                <td className='cart_table-row-total'>P {cartItem.quantity * cartItem.price}</td>
              </tr>
            ))
          }

        </tbody>
        <tfoot>
          <tr className='footer-row'>
            <td/>
            <td/>
            <td/>
            <td className='footer-label-subtotal'>SubTotal: </td>
            <td className='footer-subtotal-value'>P 99999</td>
          </tr>
          <tr className='footer-row'>
            <td/>
            <td/>
            <td/>
            <td/>
            <td><button className='footer-button-checkout' onClick={()=>{}}>CHECK OUT</button></td>
          </tr>
        </tfoot>
    </table>
  )
}

export default CartTable