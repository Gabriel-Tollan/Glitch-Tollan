import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const ChatModel = mongoose.model(
    'chats',
    new mongoose.Schema({
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        message: String,
        time: Number
    })
);

export default ChatModel;