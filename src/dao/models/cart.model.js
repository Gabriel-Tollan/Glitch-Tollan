import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const cartModel = mongoose.model(
    'carts',
    new mongoose.Schema({
        owner: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users' 
            },
        status: {
                type: Boolean,
                default: true
            },
        products:{
            type:[
                {
                    product:{
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'products'
                    },
                    quantity:{
                        type: Number,
                        default: 1
                    }
                }
            ],
            default: []
        }
    }).plugin(paginate)
);

export default cartModel;