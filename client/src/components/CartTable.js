import React, { useEffect, useState } from 'react'
import './CartTable.css'

const getTotal = (cartItems) =>{
  let total = 0
  cartItems.map(cartItem => {
    total += (cartItem.quantity * cartItem.product.price)
  })
  return total
}

const CartTable = ({cartData}) => {
  const [total, setTotal] = useState(0)
  const [orders, setOrders] = useState([])
  const [cartItems, setCartItems] = useState([])
  

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL+ '/orders/status/0')
          .then(response => response.json())
          .then(body => {
              setOrders(body)
          })
    return () => {};
  }, []);

  useEffect(() => {
    const fetchProducts = async ()=>{
      const tempCart = []
      const promises = orders.map(order => {
        const promise = fetch(
          `${process.env.REACT_APP_API_URL}/products/${order.productID}`
        ).then(response => response.json()).then(body=> {tempCart.push({...order, product: body})})
        return promise
      });
      
      await Promise.all(promises)
      setCartItems(tempCart)
      console.log(tempCart)
    }

    fetchProducts()
    return () => {
      
    };
  }, [orders]);

  useEffect(() => {
    setTotal(getTotal(cartItems))
    return () => {}
  }, [cartItems])
  
  return (
    <table className='cart_table' cellSpacing={0}>
        <thead className='cart_table-header'>
          <tr>
            <th className='header-label-product'>Product</th>
            <th className='header-label-name'>Name</th>
            <th className='header-label-price'> Price</th>
            <th className='header-label-qty'>Quantity</th>
            <th className='header-label-total'>Total</th>
          </tr>
        </thead>
        <tbody className='cart_table-body'>
          
          {
            cartItems.map((cartItem, index) => (
              <tr className='cart_table-row' key={cartItem.product.name}>
                <td className='cart_table-row-img'>
                  <img src={cartItem.product.image} alt={cartItem.product.name}/>
                </td>
                <td className='cart_table-row-name'>
                  {cartItem.product.name}<br/>
                  <button className='cart_table-row-button' onClick={()=>{
                    setCartItems(
                      [...cartItems.slice(0,index),
                      ...cartItems.slice(index+1, cartItems.length)]
                    )
                    fetch(`${process.env.REACT_APP_API_URL}/orders/${cartItem._id}`,
                        {
                          method: 'DELETE',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                        })
                        .then(response => {
                          response.text()
                        })
                  }}>Remove</button>
                </td>

                <td className='cart_table-row-price'>P {cartItem.product.price}</td>
                <td className='cart_table-row-qty'>
                  <input type='number' value={cartItem.quantity} 
                    onChange={(e)=>{
                      let currentValue = parseInt(e.target.value)
                      
                      if(currentValue > cartItem.product.quantity){
                        currentValue = cartItem.product.quantity
                        e.target.value = currentValue
                        return alert(`Order quantity musn't exceed product quantity (max: ${cartItem.product.quantity})`)
                      }

                      if(currentValue < 0){
                        return alert(`Order quantity must be greater than 0.`)
                      }

                      const temp = {...cartItems[index], quantity: currentValue}

                      fetch(`${process.env.REACT_APP_API_URL}/orders/${cartItem._id}`,
                      {
                        credentials: 'include',
                        method: 'PATCH',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({quantity: currentValue})
                      })
                      .then(response => {
                        response.text()
                      })
                      
                      setCartItems(
                        [...cartItems.slice(0,index),
                        temp,
                        ...cartItems.slice(index+1, cartItems.length)]
                      )

                  }}/>
                </td>
                <td className='cart_table-row-total'>P {cartItem.quantity * cartItem.product.price}</td>
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
            <td><button className='footer-button-checkout' onClick={async ()=>{

              const orderPromises = cartItems.map(async cartItem=>{
                return fetch(`${process.env.REACT_APP_API_URL}/orders/${cartItem._id}`,
                {
                  credentials: 'include',
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({status: 1})
                })
                .then(response => {
                  response.text()
                })
              })
              await Promise.all(orderPromises)

              alert("Checkout complete!")
              window.location.href = "http://localhost:3001/shopping-page"
            }}>CHECK OUT</button></td>
          </tr>
        </tfoot>
    </table>
  )
}

export default CartTable