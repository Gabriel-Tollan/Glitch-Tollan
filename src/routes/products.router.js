import { Router } from 'express';
import { uploader } from '../utils.js';

const router = Router();

const products = [];

router.get('/', (req,res)=>{
    
    res.send({products})

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