const handleAddToCartClick = async (product) => {
    const userEmail = sessionStorage.getItem("userEmail")
  
    const result = await fetch(
      `http://localhost:3000/pending-order?email=${userEmail}&productID=${product._id}`
    ).then(response => response.json())
  
    //order exists
    if(result._id){
      const updateResult = await fetch(
        `http://localhost:3000/orders/${result._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({quantity: result.quantity+1})
        }
      ).then(response => response.json())
      console.log(updateResult)
    }
  
    //create new order
    else{
      const newOrder = {
        productID: product._id,
        quantity: 1,
        status: 0,
        email: userEmail,
        date: new Date().toISOString()
      }
  
      const insertResult = await fetch(
        `http://localhost:3000/orders`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newOrder)
        }
      ).then(response => response.json())
      console.log(insertResult)
    }
  }

  export default handleAddToCartClick