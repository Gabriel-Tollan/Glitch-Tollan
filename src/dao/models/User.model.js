import mongoose from 'mongoose';
const userCollection = 'users' 

const userSchema = new mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    mail: {
        type: String,
        unique: true
    },
    age: {
        type: Number
    },
     password: {
         type: String
    },
    role: {
        type: String,
        default: 'client'
    },
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    },
})

const userModel = mongoose.model(userCollection, userSchema);
export default userModel;