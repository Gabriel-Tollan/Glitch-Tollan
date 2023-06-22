import { Router } from 'express';

const router = Router();

import { getProducts, getProductByID, addProduct, updateProduct, deleteProduct } from '../controllers/products.controller.js';

router.get('/', getProducts);

router.get('/:pid', getProductByID);

router.post('/', addProduct);

router.put('/:pid', updateProduct);

router.delete('/:pid', deleteProduct);

export default router;