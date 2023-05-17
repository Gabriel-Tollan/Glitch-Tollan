import mongoose from "mongoose";

const productModel = mongoose.model(
    'products',
    new mongoose.Schema({
        title: String,
        description: String,
        code: String,
        price: Number,
        status: {
            type: Boolean,
            default: true
        },
        stock: Number,
        category: String,
        thumbnails: {
            type: Array,
            default: []
        }
    })
);

export default productModel;