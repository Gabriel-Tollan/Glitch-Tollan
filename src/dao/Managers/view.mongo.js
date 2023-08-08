import productModel from '../models/product.model.js';
import cartModel from '../models/cart.model.js';
import mongoose from 'mongoose';

export class ViewMongo{

    constructor(){
        this.productModel = productModel,
        this.cartModel = cartModel
    };

    async renderProducts(limit = 10, page = 1, category, available, sort, user = {}, adminPage = false){

        const email = user.email;

        let query = {};

        if (category) {

                query = {category: category};
        };
            
        if (available) {

            query = {...query, stock: { $gt: 0}};

        };

        if (user.role === 'premium') {


            if (adminPage) {

                query = {...query, owner: email};

            } else {

                query = {...query, owner: { $ne: email }};

            };

        };

        const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages} = await this.productModel.paginate(
            query,
            {
                limit: limit,
                sort:{ price: sort },
                page: page,
                lean: true
            }
        );

        const payload = docs;

        let prevLink = hasPrevPage === false ? null : `/products?page=${prevPage}`;

        let nextLink = hasNextPage === false ? null : `/products?page=${nextPage}`;

        if (adminPage) {

            prevLink = hasPrevPage === false ? null : `/admin?page=${prevPage}`;

            nextLink = hasNextPage === false ? null : `/admin?page=${nextPage}`;

        };

        return {
            payload: payload,
            totalPages: totalPages,
            prevPage: prevPage,
            nextPage: nextPage,
            page: page,
            hasNextPage: hasNextPage,
            hasPrevPage: hasPrevPage,
            prevLink: prevLink,
            nextLink: nextLink
        };

    };

    async renderCart(cid){

        try {

            return await this.cartModel.findById(cid).populate({path:'products.product'}).lean();

        } catch (error) {

            return{
                code:400,
                status: "Error",
                message: error.message
            };

        };

    };

};