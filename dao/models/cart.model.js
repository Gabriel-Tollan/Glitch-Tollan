import mongoose from "mongoose";

const cartModel = mongoose.model(
    'carts',
    new mongoose.Schema({
        products:{
            type: Array,
            default: []
        }
    })
);

export default cartModel;