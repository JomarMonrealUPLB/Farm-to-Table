import mongoose from "mongoose"

export const Session = mongoose.model('sessions',{
    expires: String,
    session: String
});
