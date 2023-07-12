import { connectDB } from "../config/dbConnection.js";
import { CartMongo } from "./managers/cart.mongo.js";
import { UserMongo } from "./managers/user.mongo.js";
import { ProductMongo } from "./managers/product.mongo.js";
import { MessageMongo } from "./managers/message.mongo.js";
import { ViewMongo } from "./managers/view.mongo.js";


connectDB();

export const cartDao = new CartMongo();
export const userDao = new UserMongo();
export const productDao = new ProductMongo();
export const messageDao = new MessageMongo();
export const viewDao = new ViewMongo();