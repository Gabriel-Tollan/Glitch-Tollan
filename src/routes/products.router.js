import { Router } from 'express';
import passport from "passport";

const router = Router();

import { getProducts, getProductByID, addProduct, updateProduct, deleteProduct } from '../dao/controllers/product.controller.js';
import { validateProduct, validateRole } from '../middlewares/validations.js';


router.get('/', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), getProducts);

router.get('/:pid', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), validateProduct, getProductByID);

router.post('/', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), validateRole(['admin','premium']), addProduct);

router.put('/:pid', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), validateRole(['admin','premium']), validateProduct, updateProduct);

router.delete('/:pid', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), validateRole(['admin','premium']), validateProduct, deleteProduct);

export default router;