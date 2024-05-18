import mongoose from "mongoose"

export const Product = mongoose.model('products',{
    name : String,
    description: String,
    image: String,
    type: Number,
    price: Number,
    quantity: Number,
});
