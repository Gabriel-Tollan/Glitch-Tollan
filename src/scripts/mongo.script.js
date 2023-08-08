import {ProuctModel} from "../dao/models/product.model.js";
import {connectDB} from "../config/dbConnection.js";
import customLogger from "../utils/logger.js";

connectDB();

const updateProducts = async() =>{

    try {
        
        const adminId = "_ID del Admin"
        const result = await ProuctModel.updateMany({},{$set:{owner:adminId}})
        console.log("Result", result)

    } catch (error) {
        customLogger.error(`Date: ${new Date().toLocaleDateString()} - File: mongo.script.js - Message: ${error.message}`);

    };

}
updateProducts();