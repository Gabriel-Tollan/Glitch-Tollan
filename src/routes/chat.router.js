import { Router }  from "express";
import router from "./carts.router";

const router = Router();

router.get('/chat', (req,res)=>{
    res.render('chat', {});
})

export default router;