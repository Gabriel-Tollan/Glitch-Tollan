import cartModel from '../models/cart.model.js';
import productModel from '../models/product.model.js';

export default class CartManager{

    async createCart(){
        
        try{

            await cartModel.create({products:[]});

        } catch(error) {
            return {
                code: 400,
                status: 'Error',
                message: `${error}`
            };
        };

        return {
            code: 202,
            status: 'Success',
            message: 'El carrito se ha creado con éxito',
        };

    };

    async getCart(cid){
        
        const cart = await cartModel.findById(cid);

        if(!cart){
            return {
                code: 400,
                status: 'Error',
                message: 'No se ha encontrado un cart con ese ID'
            };
        };

        return {
            code: 202,
            status: 'Success',
            message: cart.products
        };

    };

    async updateCart(cid, pid){
        
        const product = await productModel.findById(pid);

        if (!product) {
            return {
                code: 404,
                status: 'Error',
                message: `No se ha encontrado un producto con el id ${pid}`
            };
        };
        
        const cart = await cartModel.findById(cid);

        if (!cart) {
            return {
                code: 404,
                status: 'Error',
                message: `No se ha encontrado un cart con el id ${cid}`
            };
        };

        const productIndex = cart.products.findIndex(object => object.id === pid);

        if (productIndex === -1){
            cart.products.push({id: pid, quantity: 1});
        } else {
            cart.products[productIndex].quantity++;
        };

        try {

            await cartModel.findByIdAndUpdate(cid, {products: cart.products});

        } catch (error) {
            
            return {
                code: 400,
                status: 'Error',
                message: `${error}`
            };

        };

        return{
            code: 202,
            status: 'Success',
            message: `El cart con ID ${cid} ha sido actualizado exitosamente`
        };

    };

    validateCart(cart){
        if (Object.keys(cart).length === 0){
            return false;
        }
        
        if (cart.products.length === 0){
            return false;
        };

        for (let i = 0; i < cart.products.length; i++){
            if (Object.keys(cart.products[i]).length < 2){
                return false;
            };

            if (cart.products[i].product < 1 || cart.products[i].quantity < 1){
                return false;
            };
        };

        return true;

    };
};