import express from 'express';
import mongoose from 'mongoose';
const app = express();


import userRouter from './routers/user_routes.js';
import productRouter from './routers/product_routes.js';
import orderRouter from './routers/order_routes.js';

productRouter(app)
userRouter(app)
orderRouter(app)


await mongoose.connect("mongodb+srv://jpmonreal:ePnitzGp8hf36YmA@ftcluster.uuvrhdl.mongodb.net/Farm-to-Table",{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('App connected to database');
    app.listen(3000,() => console.log("Server is now running at port 3000..."));
  })
  .catch((error) => {
    console.log(error);
  });
