import { Router } from "express";
import router from "./carts.router";

const router = Router();

router.get('/', (req,res)=>{
    res.render('index', {});
})

export default router;