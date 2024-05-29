import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import cors from "cors";
import MongoStore from 'connect-mongo';

import userRouter from './routers/user_routes.js';
import productRouter from './routers/product_routes.js';
import orderRouter from './routers/order_routes.js';
import authRouter from './routers/auth_routes.js';
import { mongoDatabase } from './database.js';
const app = express();

await mongoose.connect("mongodb+srv://jpmonreal:ePnitzGp8hf36YmA@ftcluster.uuvrhdl.mongodb.net/" + mongoDatabase,{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('App connected to database');
    app.listen(3000,() => console.log("Server is now running at port 3000..."));
  })
  .catch((error) => {
    console.log(error);
  });

  
app.use(cors({origin: "http://localhost:3001",methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE", "PATCH"] ,credentials: true}))
app.use(express.json())

app.use(session({
  secret: "cmsc100-f2t",
  resave: true,
  saveUninitialized: false,
  store: MongoStore.create({
    clear_interval: 3600, 
    mongoUrl: "mongodb+srv://jpmonreal:ePnitzGp8hf36YmA@ftcluster.uuvrhdl.mongodb.net/" + mongoDatabase,
    ttl: 3600
  }),
  cookie:{
    maxAge: 60000,
    secure: false,
    sameSite: "none",
    httpOnly: false
  }
}))

authRouter(app)
productRouter(app)
userRouter(app)
orderRouter(app)
