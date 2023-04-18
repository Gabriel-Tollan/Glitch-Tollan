import { Router } from 'express';
import CartsManager from "../../Managers/CartsManager.js";

const router = Router();
const manager = new CartsManager();

router.post('/', async (req,res)=>{
    let cartNuevo = await manager.addCart();
    res.send({cartNuevo})
});

router.get('/:cid', async (req,res)=>{
    const id = parseInt(req.params.cid);
    let cart = await manager.getCart(id);

    res.send({ cart });
});

router.post('/:cid/product/:pid', async (req,res) => {
    try {
        const idCart = req.params.cid;
        const idProd = req.params.pid;
        const resultado = await manager.addProductInCArt(idCart, idProd);
        
        res.send(resultado);
    } catch (error) {
        res.status(500).send({ error: "error interno" });
    }
})


export default router;