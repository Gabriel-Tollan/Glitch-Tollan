import cartModel from "../dao/models/cart.model.js";
import productModel from "../dao/models/product.model.js";
import userModel from "../dao/models/user.models.js";
import { validatePassword } from "../utils.js";
import customLogger from "../utils/logger.js";
import { loggerPrefix } from "../utils/logger.js";
import { validateEmailToken } from "../utils/token.js";

const filename = 'validations.js';

export const validateLogin = async (req, res, next) => {

    const { email, password } = req.body;
    
    const user = await userModel.findOne({email: email});

    if (!user) {
    
        customLogger.error(`Date: ${new Date().toLocaleDateString()} - Message: Incorrect credentials`);

    return res.status(400).send({
        status: 'Error',
        message: 'Incorrect credentials'
    });

    };

    const isValidPassword = validatePassword(password, user);
    
    if (!isValidPassword){ 
    
        customLogger.error(`${new Date().toLocaleDateString()}: Incorrect credentials`);

    
        return res.status(400).send({
           status: 'Error',
           message: 'Incorrect credentials'
        });
};

    next();

};

export const validateUser = async (req, res, next) => {

    const user = await userModel.findOne({email: req.body.email});

    if (!user){
        
        customLogger.error(`${new Date().toLocaleDateString()}: Incorrect credentials`);

        return res.status(400).send({
            status: "Error",
            message: "Incorrect credentials"
        });

    };

    next();

};

export const validateResetToken = async (req, res, next) => {

    const token = req.query.token;

    const validEmail = validateEmailToken(token);

    if (!validEmail) {

        return res.status(400).send({
            status: 'Error',
            message: 'The reset link is no longer valid. Please generate a new one.'
        });

    };

    next();

};

export const validateCart = async (req, res, next) => {

    const cart = await cartModel.findById(req.params.cid);

    if (!cart) {

        customLogger.error(`${new Date().toLocaleDateString()}: No se pudo encontrar un cart con el ID ${req.params.cid}`);
        
        return res.status(400).send({
            status: 'Error',
            message: `No se pudo encontrar un cart con el ID ${req.params.cid}`
        });

    };

    next();

};

export const validateCartContent = async (req, res, next) => {

    const cart = await cartModel.findById(req.params.cid);

    const productIndex = cart.products.findIndex(object => String(object.product) === req.params.pid);

    if(productIndex === -1){

        customLogger.error(loggerPrefix(filename, `El cart ${req.params.cid} no contiene el producto ${req.params.pid}`));
        
        return res.status(400).send({
            status: 'Error',
            message: `El cart ${req.params.cid} no contiene el producto ${req.params.pid}`
        });

    };

    next();

};

export const validateProduct = async (req, res, next) => {

    const pid = req.params.pid;
    
    const product = await productModel.findById(pid);

    if (!product) {
        
        customLogger.error(`${new Date().toLocaleDateString()}: No se pudo encontrar un producto con el ID ${pid}`);

        return res.status(400).send({
            status: 'Error',
            message: `No se pudo encontrar un producto con el ID ${pid}`
        });

    };

    next();

};

export const validateQuantity = async (req, res, next) => {

    const quantity = req.body.quantity;

    if (!quantity) {

        customLogger.error(`${new Date().toLocaleDateString()}: No se encontró una cantidad válida en el body`);

        return res.status(400).send({
            status: "Error",
            message: "No se encontró una cantidad válida en el body"
        });
    
    };

    next();

};

export const validateNewPassword = async (req, res, next) => {

    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({email: email});

        const isValidPassword = validatePassword(password, user);

        if (isValidPassword){

            customLogger.error(loggerPrefix(filename, `New password can't be the same as the previous password`));

            return res.status(400).send({
                status: 'Error',
                message: "New password can't be the same as the previous password"
            });

        };

        next();

    } catch (error) {

        return res.status(400).send({
            status: 'Error',
            message: error.message
        });

    };

};

export const validateRole = (roles) => {

    return (req, res, next) => {

        const user = req.user.user;

        if (!user) {

            return res.status(403).send({
                status: "Error",
                message: "Needs to authenticate first"
            });
        
        };

        if (!roles.includes(user.role)) {

            return res.status(403).send({
                status: "Error",
                message: "Not authorized"
            });

        };

        next();

    };

};