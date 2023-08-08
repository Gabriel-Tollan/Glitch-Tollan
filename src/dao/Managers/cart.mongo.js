
import { v4 as uuidv4 } from "uuid";
import timestamp from "time-stamp";

import cartModel from '../models/cart.model.js';
import productModel from '../models/product.model.js';
import userModel from '../models/user.models.js';
import ticketModel from "../models/ticket.model.js";
import customLogger from "../../utils/logger.js";


export class CartMongo{

    constructor(){
        this.cartModel = cartModel,
        this.productModel = productModel,
        this.userModel = userModel,
        this.ticketModel = ticketModel
    };

    async createCart (uid) {

        try {
    
            
            let cart = await this.cartModel.findOne({owner: uid});

            
            if (!cart) {

                await this.cartModel.create({owner: uid}).then(result => cart = result);

            };

            await this.userModel.updateOne({_id: uid}, {cart: cart._id});

            return {
                code: 202,
                status: "Success",
                message: cart,
            };
    
        } catch (error) {

            customLogger.error(`${new Date().toLocaleDateString()}: ${error.message}`);
    
            return {
                code: 400,
                status: 'Error',
                message: error.message
            };
    
        };
    
    };

    async addToCart (cid, pid){

        const product = await this.productModel.findById(pid);

        const cart = await this.cartModel.findById(cid);

        const productIndex = cart.products.findIndex(object => String(object.product) === pid);

        if (productIndex === -1){

            cart.products.push({product: pid, quantity: 1});

        } else {

            cart.products[productIndex].quantity++;

        };

        try {

            await this.cartModel.findByIdAndUpdate(cid, {products: cart.products});

            return {
                code: 202,
                status: 'Success',
                message: `El producto ${product.title} ha sido agregado exitosamente al cart ID ${cid}`
            };

        } catch (error) {

            customLogger.error(`${new Date().toLocaleDateString()}: ${error.message}`);

            return{
                code: 400,
                status: 'Error',
                message: error.message
            };

        };

    };

    async deleteFromCart(cid, pid){

        const product = await this.productModel.findById(pid);

        const cart = await this.cartModel.findById(cid);

        const productIndex = cart.products.findIndex(object => String(object.product) === pid);

        cart.products.splice(productIndex, 1);

        try {

            await this.cartModel.findByIdAndUpdate(cid, {products: cart.products});

            return {
                code: 202,
                status: 'Success',
                message: `El producto ${product.title} ha sido removido exitosamente del cart ID ${cid}`
            };

        } catch (error) {

            customLogger.error(`${new Date().toLocaleDateString()}: ${error.message}`);

            return {
                code: 400,
                status: 'Error',
                message: error.message
            };

        };

    };

    async emptyCart(cid){

        try {

            await this.cartModel.findByIdAndUpdate(cid, {products: []});

            return {
                code: 202,
                status: "Success",
                message: `El cart ID ${cid} ha sido vaciado exitosamente`
            };

        } catch (error) {

            customLogger.error(`${new Date().toLocaleDateString()}: ${error.message}`);

            return {
                code: 400,
                status: 'Error',
                message: error.message
            };

        };

    };

    async getCart(cid){

        try {

            const cart = await this.cartModel.findById(cid).populate({path:'products.product'}).lean();

            return {
                code:202,
                status: "Success",
                message: cart
            };

        } catch (error) {

            customLogger.error(`${new Date().toLocaleDateString()}: ${error.message}`);

            return {
                code: 400,
                status: "Error",
                message: error.message
            };

        };

    };

    async replaceCart(cid, products){

        try {

            await this.cartModel.findByIdAndUpdate(cid, {products: products});

            return {
                code: 202,
                status: 'Success',
                message: `El cart con ID ${cid} ha sido actualizado exitosamente`
            };

        } catch (error) {

            customLogger.error(`${new Date().toLocaleDateString()}: ${error.message}`);

            return {
                code: 400,
                status: 'Error',
                message: error.message
            };

        };

    };

    async updateProductQty(cid, pid, quantity){

        const cart = await this.cartModel.findById(cid);

        const productToUpdate = cart.products.findIndex(product => String(product.product) === pid);

        cart.products[productToUpdate].quantity = quantity;

        try {

            await this.cartModel.findByIdAndUpdate(cid, {products: cart.products});

            return {
                code: 202,
                status: 'Success',
                message: `El cart con ID ${cid} ha sido actualizado exitosamente`
            };

        } catch (error) {

            customLogger.error(`${new Date().toLocaleDateString()}: ${error.message}`);

            return {
                code: 400,
                status: 'Error',
                message: error.message
            };

        };

    };

    async purchaseCart(cid){

        try {

            let cart = await this.cartModel.findById(cid);

            const products = await this.productModel.find();

            const purchaser = await this.userModel.findById(String(cart.owner));

            let returnToCart = [];

            let purchase = [];

        
            cart.products.forEach(async(cartProduct) => {

                const productInStock = products.find(element => String(element._id) === String(cartProduct.product) && element.stock >= cartProduct.quantity);
                
                if(typeof productInStock !== "undefined"){

    
                    const productPurchased = {
                        product: cartProduct.product,
                        quantity: cartProduct.quantity,
                        _id: cartProduct._id,
                        price: productInStock.price
                    };

                    
                    productInStock.stock -= cartProduct.quantity;

                    await this.productModel.findByIdAndUpdate(productInStock._id, productInStock);

                    purchase.push(productPurchased);

                } else {

                    returnToCart.push(cartProduct);

                };

            });

            
            cart.products = returnToCart;

            await this.cartModel.findByIdAndUpdate(cid, {products: cart.products});

            const ticketTotal = purchase.reduce((total, product) => total + product.quantity * product.price, 0);

            const ticket = {
                    code: uuidv4(),
                    purchase_datetime: String(timestamp('YYYY:MM:DD:HH:mm:ss')),
                    amount: ticketTotal,
                    purchaser: purchaser.email
            };

            if (ticketTotal > 0) {

                await this.ticketModel.create(ticket);

            };

            return{
                code: 202,
                status: "Success",
                message: ticket
            };

        } catch (error) {

            customLogger.error(`${new Date().toLocaleDateString()}: ${error.message}`);

            return{
                code: 400,
                status: "Error",
                message: error.message
            };

        };

    };

};