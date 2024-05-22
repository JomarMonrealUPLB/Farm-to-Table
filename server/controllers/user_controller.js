import { User } from '../models/user.js';
import mongoose from "mongoose"

const ObjectId = mongoose.Types.ObjectId;

const getAllUsers = async (req, res) => {

    try{
        let users = await User.find({});

        res.send(users);

    }catch(err){
        console.log(err);
    }
};


const getUserById = async (req, res) => {

    try{
        const user = await User.findById(ObjectId(req.params.id));
        
        if (!user){
            return res.send("User does not exist.");
        }
        
        res.json(user); 

    }catch(err){
        console.log(err);
    }
};


const getUserByEmail = async (req, res) => {

    try{
        const user = await User.findOne({ email: res.params.email });
        
        if (!user){
            res.send("User does not exist.");
        }

        res.json(user);

    }catch(err){
        console.log(err);
    }
};


const createUser = async (req, res) => {

    const newUser = new User ({
        firstName: req.body.firstName,
        middleName : req.body.middleName,
        lastName: req.body.lastName,
        type: req.body.type,
        email: req.body.email,
        password: req.body.password 

    });

    try{
        const user = await newUser.save();
        res.json(user);

    }catch(err){
        console.log(err);
    }
};


const updateUser = async (req, res) => {

    try{
        const updatedUser = await User.findById(ObjectId(req.params.id));
        
        if (!updatedUser){
            return res.send("User does not exist.");
        }
        const user = await updateUser.updateOne({})

        res.json(user);

    }catch(err){
        console.log(err);
    }
};


const deleteUser = async (req, res) => {
    try{
        const deletedUser = await User.findById(ObjectId(req.params.id));
        
        if (!deletedUser){
            return res.send("User does not exist.");
        }

        await deletedUser.remove();

    }catch(err){
        console.log(err);
    }
};


export { getAllUsers, getUserById, getUserByEmail, createUser, updateUser, deleteUser }