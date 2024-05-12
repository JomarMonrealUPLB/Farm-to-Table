const Product = mongoose.model('products',{
    name : String,
    description: String,
    type: Number,
    price: Number,
    quantity: Number,
});
