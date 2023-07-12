import { Router } from 'express';

const router = Router();

import { addToCart, createCart, deleteFromCart, emptyCart, getCart, replaceCart, updateProductQty, purchaseCart } from '../dao/controllers/cart.controller.js';
import { validateCart, validateProduct, validateUser, validateQuantity, validateCartContent } from '../middlewares/validations.js';

router.post('/:uid', validateUser, createCart);

router.post('/:cid/product/:pid', validateCart, validateProduct, addToCart);

router.delete('/:cid/product/:pid', validateCart, validateProduct, validateCartContent, deleteFromCart);

router.delete('/:cid', validateCart, emptyCart);

router.get('/:cid', validateCart, getCart);

router.post('/:cid/purchase', purchaseCart);

router.put('/:cid', validateCart, replaceCart);

router.put('/:cid/product/:pid', validateCart, validateProduct, validateQuantity, updateProductQty);

export default router;