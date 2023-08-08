import { Router } from "express";
import passport from "passport";

const router = Router();

import { renderProducts, renderCart, renderProfile, renderRegister, renderLogin, redirectProducts, renderAddProduct, renderChat, renderAdmin, renderForgot, renderReset } from '../dao/controllers/view.controller.js';
import { publicAccess } from "../middlewares/access.js";
import { validateRole, validateResetToken } from "../middlewares/validations.js";

router.get('/', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), redirectProducts);

router.get('/login', publicAccess, renderLogin);

router.get('/register', publicAccess, renderRegister);

router.get('/profile', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), renderProfile);

router.get('/carts/:cid', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), validateRole(['user', 'premium']), renderCart);

router.get('/products', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), renderProducts);

router.get('/add', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), validateRole(['admin', 'premium']), renderAddProduct);

router.get('/admin', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), validateRole(['admin','premium']), renderAdmin);

router.get('/chat', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), validateRole(['user', 'premium']), renderChat);

router.get('/forgot-password', renderForgot);

router.get('/reset-password', validateResetToken, renderReset);

export default router;