const handleOrderFulfillmentClick = async (order, updateType) => {
    const result = await fetch(
        `http://localhost:3000/orders/${order._id}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({status: updateType})
        }
    ).then(response => response.json())
    console.log(result)
}

export default handleOrderFulfillmentClick