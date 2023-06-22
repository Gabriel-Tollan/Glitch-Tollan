import cartModel from '../dao/models/cart.model.js';
import productModel from '../dao/models/product.model.js';
import userModel from '../dao/models/User.model.js';

export const createCart = async (req, res) => {

    const uid = req.params.uid;

    try {
        let _cart = await cartModel.findOne({owner: uid, status: true});

        if (!_cart) {            
            await cartModel.create({owner: uid}).then(result => _cart = result);
        };

        await userModel.updateOne({_id: uid}, {cart: _cart._id});

        if(!req.user) {
            return res.status(202).send({
                status: "Success",
                message: _cart
            });

        } else {
            req.user = await userModel.findById(uid);
        };

    } catch (error) {
        return res.status(400).send({
            status: 'Error',
            message: error.message
        });

    };

};

export const addToCart = async (req, res) => {
    
    const cid = req.params.cid;

    const pid = req.params.pid;
    
    const product = await productModel.findById(pid);
            
    const cart = await cartModel.findById(cid);

    const productIndex = cart.products.findIndex(object => String(object.product) === pid);

    if (productIndex === -1){
        cart.products.push({product: pid, quantity: 1});
    } else {
        cart.products[productIndex].quantity++;
    };
    try {
        await cartModel.findByIdAndUpdate(cid, {products: cart.products});
        return res.status(202).send({
            status: 'Success',
            message: `El producto ${product.title} ha sido agregado exitosamente al cart ID ${cid}`
        });

    } catch (error) {
        return res.status(400).send({
            status: 'Error',
            message: error.message
        });

    };


};

export const deleteFromCart = async (req, res) => {
    
    const cid = req.params.cid;

    const pid = req.params.pid;

    const product = await productModel.findById(pid);
            
    const cart = await cartModel.findById(cid);

    const productIndex = cart.products.findIndex(object => String(object.product) === pid);

    if (productIndex === -1){
        return;
    } else {
        cart.products.splice(productIndex, 1);
    };
    try {
        await cartModel.findByIdAndUpdate(cid, {products: cart.products});
        return res.status(202).send({
            status: 'Success',
            message: `El producto ${product.title} ha sido removido exitosamente del cart ID ${cid}`
        });

    } catch (error) {
        return res.status(400).send({
            status: 'Error',
            message: error.message
        });
    };
};

export const emptyCart = async (req, res) => {

    const cid = req.params.cid;

    try {
        await cartModel.findByIdAndUpdate(cid, {products: []});
        return res.status(202).send({
            status: "Success",
            message: `El cart ID ${cid} ha sido vaciado exitosamente`
        });

    } catch (error) {
        return res.status(400).send({
            status: 'Error',
            message: error.message
        });

    };

};

export const getCart = async (req, res) => {

    const cid = req.params.cid;
    
    try {
        const cart = await cartModel.findById(cid).populate({path:'products.product'}).lean();
        return res.status(202).send({
            status: "Success",
            message: cart
        });

    } catch (error) {
        return res.status(400).send({
            status: "Error",
            message: error.message
        });
    };

};

export const replaceCart = async (req, res) => {

    const cid = req.params.cid;

    const products = req.body;

    try {
        await cartModel.findByIdAndUpdate(cid, {products: products});
        return res.status(202).send({
            status: 'Success',
            message: `El cart con ID ${cid} ha sido actualizado exitosamente`
        });

    } catch (error) {
        return res.status(400).send({
            status: 'Error',
            message: error.message
        });
    };

};

export const updateProductQty = async (req, res) => {

    const cid = req.params.cid;

    const pid = req.params.pid;

    const quantity = req.body.quantity;

    const cart = await cartModel.findById(cid);

    const productToUpdate = cart.products.findIndex(product => String(product.product) === pid);

    if (productToUpdate === -1){
        return{
            code: 403,
            status: 'Error',
            message: `El producto ${pid} no existe en el carrito`
        };

    };

    cart.products[productToUpdate].quantity = quantity

    try {
        await cartModel.findByIdAndUpdate(cid, {products: cart.products});
        return res.status(202).send({
            status: 'Success',
            message: `El cart con ID ${cid} ha sido actualizado exitosamente`
        });

    } catch (error) {
        return res.status(400).send({
            status: 'Error',
            message: error.message
        });
    };

};