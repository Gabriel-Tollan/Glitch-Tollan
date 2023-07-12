import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

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
    }).plugin(paginate)
);

export default productModel;