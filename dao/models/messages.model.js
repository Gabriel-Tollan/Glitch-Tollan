import mongoose from "mongoose";

const messageModel = mongoose.model(
    'messages',
    new mongoose.Schema({
        user: String,
        message: String
    })
);

export default messageModel;