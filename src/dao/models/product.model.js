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
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users"
        }
    }).plugin(paginate)
);

export default productModel;