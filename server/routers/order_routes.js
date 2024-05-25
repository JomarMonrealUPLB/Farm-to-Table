import { getPendingOrderByEmail, getOrderById, getAllOrders, getOrdersWithStatusNumber, createOrder, updateOrder, deleteOrder, getCart } from "../controllers/order_controller.js";

const ordersRouter = (app) => {
    app.get('/cart/:email', getCart)
    app.get('/orders', getAllOrders)
    app.get('/orders/status/:num', getOrdersWithStatusNumber)
    app.get('/orders/:id', getOrderById)
    app.get('/pending-order', getPendingOrderByEmail)
    
    app.post('/orders', createOrder)
    app.patch('/orders/:id', updateOrder)
    app.delete('/orders/:id', deleteOrder)
}

export default ordersRouter;