const Order = mongoose.model('orders',{
    productID: String,
    quantity : Number,
    status: Number,
    email: String,
    date: String,
    time: String
});
