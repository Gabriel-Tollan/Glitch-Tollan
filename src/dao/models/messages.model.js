import mongoose from "mongoose";

const messageModel = mongoose.model(
    'messages',
    new mongoose.Schema({
        username: String,
        message: String,
        datetime: String
    })
);

export default messageModel;