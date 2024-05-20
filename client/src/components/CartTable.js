import React, { useEffect, useState } from 'react'
import './CartTable.css'

const getTotal = (cartItems) =>{
  let total = 0
  cartItems.map(cartItem => {
    total += (cartItem.quantity * cartItem.price)
  })
  return total
}

const CartTable = ({cartData}) => {
  const [total, setTotal] = useState(getTotal(cartData))
  const [cartItems, setCartItems] = useState(cartData)

  useEffect(() => {
    setTotal(getTotal(cartItems))
    return () => {}
  }, [cartItems])
  
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
            cartItems.map((cartItem, index) => (
              <tr className='cart_table-row' key={cartItem.name}>
                <td className='cart_table-row-img'>
                  <img src={cartItem.image} alt={cartItem.name}/>
                </td>
                <td className='cart_table-row-name'>
                  {cartItem.name}<br/>
                  <button className='cart_table-row-button' onClick={()=>{
                    setCartItems(
                      [...cartItems.slice(0,index),
                      ...cartItems.slice(index+1, cartItems.length)]
                    )
                  }}>Remove</button>
                </td>

                <td className='cart_table-row-price'>P {cartItem.price}</td>
                <td className='cart_table-row-qty'>
                  <input type='number' value={cartItem.quantity} 
                    onChange={(e)=>{
                      const temp = {...cartItems[index], quantity: e.target.value}
  
                      if(e.target.value==="0") {
                        setCartItems(
                          [...cartItems.slice(0,index),
                        
                          ...cartItems.slice(index+1, cartItems.length)]
                        )
                      }
                      else{
                        setCartItems(
                          [...cartItems.slice(0,index),
                          temp,
                          ...cartItems.slice(index+1, cartItems.length)]
                        )
                      }
                  }}/>
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
            <td className='footer-subtotal-value'>P {total}</td>
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