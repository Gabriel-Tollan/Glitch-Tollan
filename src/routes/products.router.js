import { Router } from 'express';

const router = Router();

import { getProducts, getProductByID, addProduct, updateProduct, deleteProduct } from '../dao/controllers/products.controller.js';
import { validateProduct } from '../middlewares/validations.js';

router.get('/', getProducts);

router.get('/:pid', validateProduct, getProductByID);

router.post('/', addProduct);

router.put('/:pid', validateProduct, updateProduct);

router.delete('/:pid', validateProduct, deleteProduct);

export default router;