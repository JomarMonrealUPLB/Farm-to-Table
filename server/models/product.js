import mongoose from "mongoose"

export const Product = mongoose.model('products',{
    name : String,
    image: String,
    description: String,
    type: Number,
    price: Number,
    quantity: Number,
});
