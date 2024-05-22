import { Order } from "../models/order.js";

const getAllOrders = async (req, res) => {
    res.send(await Order.find())
}

const getOrderById = async (req, res) => {
    //error when invalid object id
    res.send(await Order.findById(req.params.id))
}

const getOrdersWithStatusNumber = async (req, res) => {
    let num = parseInt(req.params.num)
    res.send(await Order.find({status: num}))
}

const createOrder = async (req, res) => {
    //validate order? (qty)
    const newOrder = new Order(
        {
            productID: req.body.productID,
            quantity: req.body.quantity,
            status: req.body.status,
            email: req.body.email,
            date: req.body.date
        }
    )

    await newOrder.save()
    res.send({inserted: true})
}

const updateOrder = async (req, res) => {
    if(req.body.quantity){
        await Order.findByIdAndUpdate(req.params.id, {quantity: req.body.quantity})
        res.send({updated_qty: true})
    }
    else{
        await Order.findByIdAndUpdate(req.params.id, {status: req.body.status})
        res.send({updated_status: true})
    }
}

const deleteOrder = async (req, res) => {
    await Order.findByIdAndDelete(req.params.id)
    res.send({deleted: true})
}

const getCart = async (req, res) => {
    res.send(await Order.find({email: req.params.email, status: 0}))
}

export {
    getAllOrders, 
    getOrderById, 
    getOrdersWithStatusNumber, 
    createOrder, 
    updateOrder, 
    deleteOrder,
    getCart
}