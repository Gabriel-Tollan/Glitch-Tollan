import { Router } from "express";
import passport from "passport";

const router = Router();

import { renderProducts, renderCart, renderProfile, renderRegister, renderLogin, redirectProducts, renderAddProduct, renderChat } from '../dao/controllers/view.controller.js';
import { adminAccess, privateAccess, publicAccess, userAccess } from "../middlewares/acces.js";

router.get('/', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), redirectProducts);

router.get('/login', publicAccess, renderLogin);

router.get('/register', publicAccess, renderRegister);

router.get('/profile', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), renderProfile);

router.get('/carts/:cid', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), userAccess, renderCart);

router.get('/products', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), renderProducts);

router.get('/add', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), adminAccess, renderAddProduct);

router.get('/chat', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), userAccess, renderChat);

router.get('/loggerTest', (req, res)=>{
    req.logger.fatal("fatal!");
    req.logger.error("error!");
    req.logger.warning("warning!");
    req.logger.info('info');
    req.logger.http('http');
    req.logger.verbose('verbose');
    req.logger.debug('debug');
    req.logger.silly('silly');
    res.redirect('/products')
})


export default router;