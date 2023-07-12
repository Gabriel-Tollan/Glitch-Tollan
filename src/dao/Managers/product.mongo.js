import productModel from '../models/product.model.js';
import { v4 as uuidv4 } from "uuid";

export class ProductMongo{

    constructor(){
        this.model = productModel
    };

    async getProducts(query){
    
        const {limit = 10, page = 1, category, available, sort} = query;
        
        let paginateQuery = {};
    
        if (category) {

            if (available) {

                paginateQuery = {category: category, stock: { $gt: 0}}

            } else {

                paginateQuery = {category: category}

            };

        };
        
        try {
            
            const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages} = await productModel.paginate(
                paginateQuery,
                {
                    limit: limit,
                    sort:{ price: sort },
                    page: page,
                    lean: true
                }
            );
        
            const payload = docs;
            
            const prevLink = hasPrevPage === false ? null : `/products?page=${prevPage}`;
        
            const nextLink = hasNextPage === false ? null : `/products?page=${nextPage}`;
        
            return{
                code: 202,
                status: "Succcess",
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

        } catch (error) {

            return{
                code: 400,
                status: "Error",
                message: error.message
            };

        };
    
    };
    
    async getProductByID(pid){
        
        try {

            const product = await productModel.findById(pid);

            return{
                code: 202,
                status: 'Success',
                message: product
            };

        } catch(error) {

            return{
                code: 400,
                status: "Error",
                message: error.message
            };

        };
    
    };
    
    async addProduct(product){
        
        try {
            
            product.code = uuidv4();
                
            await productModel.create(product);
    
            return{
                code: 202,
                status: 'Success',
                message: `El producto ${product.title} ha sido agregado con éxito.`
            };
    
        } catch (error) {
            
            return{
                code: 400,
                status: 'Error',
                message: error.message
            };
    
        };
    
    };
    
    async updateProduct(pid, updatedProduct){

        try {

            const productFound = await productModel.findById(pid);

    
            updatedProduct.code = productFound.code;

            await productModel.findByIdAndUpdate(pid, updatedProduct);

            return{
                code: 202,
                status: 'Success',
                message: `El producto ${pid} ha sido actualizado con éxito`
            };

        } catch (error) {

            return{
                code: 400,
                status: 'Error',
                message: error.message
            };

        };

    };

    async deleteProduct(pid){

        try {

            await productModel.findByIdAndDelete(pid);

            return{
                code: 202,
                status: 'Success',
                message: `El producto con ID ${pid} ha sido elminado exitosamente`
            };

        } catch(error) {

            return{
                code: 400,
                status: 'Error',
                message: error.message
            };

        };

    };

};