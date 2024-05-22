import { Product } from "../models/product.js"
import mongoose from "mongoose"

const getAllProducts = async (req,res) =>{
    try{
        let products = await Product.find({});

        res.send(products);

    }catch(err){
        console.log(err);
    }
};

const getProductById = async (req, res) => {

    try{
        const products = await Product.findById((req.params.id));
        
        if (!products){
            return res.send("Product does not exist.");
        }
        
        res.json(products); 

    }catch(err){
        console.log(err);
    }
};

const createProduct = async (req, res) => {

    const newProduct = new Product ({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        type: req.body.type,
        price: req.body.price,
        quantity: req.body.quantity,

    });

    try{
        const products = await newProduct.save();
        res.json(products);

    }catch(err){
        console.log(err);
    }
};


const updateProduct = async (req, res) => {

    try{
        const updatedProduct = await Product.findById((req.params.id));
        
        if (!updatedProduct){
            return res.send("Product does not exist.");
        }
        const products = await updatedProduct.updateOne(req.body)

        return res.send("Updated a product.");

    }catch(err){
        console.log(err);
    }
};


const deleteProduct = async (req, res) => {
    try{
        const deletedProduct = await Product.findById((req.params.id));
        
        if (!deletedProduct){
            return res.send("Product does not exist.");
        }

        await deletedProduct.deleteOne({_id: req.params.id});
        return res.send("Deleted a product.");

    }catch(err){
        console.log(err);
    }
};

export {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct}