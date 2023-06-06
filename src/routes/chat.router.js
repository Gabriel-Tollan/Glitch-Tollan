import { Router }  from "express";

const router = Router();

router.get('/chat', (req,res)=>{
    res.render('chat', {});
})

export default router;