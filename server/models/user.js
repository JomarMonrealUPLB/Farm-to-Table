import mongoose from "mongoose"

export const User = mongoose.model('users',{
    firstName: String,
    middleName : String,
    lastName: String,
    type: String,
    email: String,
    password: String
});
