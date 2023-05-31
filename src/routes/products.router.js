import { Router } from 'express';
import { uploader } from '../utils.js';
import ProductManager from '../dao/Managers/productmanagerDb.js';
const router = Router();

const productManager = new ProductManager();

router.get('/', async (req,res)=>{
    const limit = parseInt(req.query.limit);

    const respuesta = await productManager.getProducts(limit);

    res.status(respuesta.code).send({
        status: respuesta.status,
        message: respuesta.message
    })

})

router.post('/',uploader.single('thumbnail'), (req,res)=>{
    const product = req.body;

    const filename = req.file.filename;

    product.thumbnail = `http://localhost:8080/images/${filename}`;

    products.push(product);

    res.send({
        status: 'Success',
        product
    })
})



export default router;