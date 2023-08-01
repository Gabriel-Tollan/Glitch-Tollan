import {ProuctModel} from "../dao/models/product.model.js";
import {connectDB} from "../config/dbConnection.js";

connectDB();

const updateProducts = async() =>{

    try {
        
        const adminId = "_ID del Admin"
        const result = await ProuctModel.updateMany({},{$set:{owner:adminId}})
        console.log("Result", result)

    } catch (error) {
        console.log(error.message)
    }

}
updateProducts();