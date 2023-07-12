import mongoose from "mongoose";

const ticketModel = mongoose.model(
    'tickets',
    new mongoose.Schema({
        code: String,
        purchase_datetime: String,
        amount: Number,
        purchaser: String
    })
);

export default ticketModel;