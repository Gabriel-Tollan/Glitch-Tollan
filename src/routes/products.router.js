import { Router } from 'express';
import passport from "passport";
import { generateProduct } from "../utils.js";

const router = Router();

import { getProducts, getProductByID, addProduct, updateProduct, deleteProduct } from '../dao/controllers/product.controller.js';
import { validateProduct } from '../middlewares/validations.js';
import { adminAccess } from '../middlewares/acces.js';

router.get('/', (req, res) => {

    const quantity = parseInt(req.query.quantity) || 100;

    let products = [];

    for (let i = 0; i < quantity; i++){
        
        const user = generateProduct();

        products.push(user);

    };

    res.json({products});

});


router.get('/', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), getProducts);

router.get('/:pid', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), validateProduct, getProductByID);

router.post('/', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), adminAccess, addProduct);

router.put('/:pid', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), adminAccess, validateProduct, updateProduct);

router.delete('/:pid', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), adminAccess, validateProduct, deleteProduct);

export default router;
export { router as productRouter };