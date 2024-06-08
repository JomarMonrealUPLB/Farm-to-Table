const handleOrderFulfillmentClick = async (order, updateType) => {
    const result = await fetch(
        `${process.env.REACT_APP_API_URL}/orders/${order._id}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({status: updateType})
        }
    ).then(response => response.json())

    if(updateType === 3){
      alert(`Order ${order._id} has been cancelled`)
      return
    }
    
    let product = null
    await fetch(`${process.env.REACT_APP_API_URL}/products/${order.productID}`).then(response=>response.json()).then(body=>product=body)

    if(order.quantity > product.quantity){
      alert("Can't fulfill order due to insufficient stock")
      return "error"
    }

    await fetch(`${process.env.REACT_APP_API_URL}/products/${order.productID}`,
        {
          credentials: 'include',
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({quantity: product.quantity - order.quantity})
        })
        .then(response => {
          response.text()
        })
    console.log(result)
    alert(`Order ${order._id} has been fulfilled`)
}

export default handleOrderFulfillmentClick