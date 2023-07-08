import { Router } from 'express';

const router = Router();

import { addToCart, createCart, deleteFromCart, emptyCart, getCart, replaceCart, updateProductQty } from '../controllers/cart.controller.js';

router.post('/:uid', createCart);

router.post('/:cid/product/:pid', addToCart);

router.delete('/:cid/product/:pid', deleteFromCart);

router.delete('/:cid', emptyCart);

router.get('/:cid', getCart);

router.put('/:cid', replaceCart);

router.put('/:cid/product/:pid', updateProductQty);

router.post('/:cid/purchase', ticketProducts);

export default router;