import { getOrdersByEmail, getPendingOrderByEmail, getOrderById, getAllOrders, getOrdersWithStatusNumber, createOrder, updateOrder, deleteOrder, deleteOrderByEmail, getCart } from "../controllers/order_controller.js";

const ordersRouter = (app) => {
    app.get('/cart/:email', getCart)
    app.get('/orders', getAllOrders)
    app.get('/orders/status/:num', getOrdersWithStatusNumber)
    app.get('/orders/:id', getOrderById)
    app.get('/pending-order', getPendingOrderByEmail)
    app.get('/orders-by-email', getOrdersByEmail)
    
    app.post('/orders', createOrder)
    app.patch('/orders/:id', updateOrder)
    app.delete('/orders/:id', deleteOrder)
    app.delete('/delete-by-email', deleteOrderByEmail)
}

export default ordersRouter;