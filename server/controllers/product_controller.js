import { Product } from "../models/product.js"

export const getAllProducts = async (req,res) =>{
    res.send(await Product.find({}))
}