import passport from "passport";
import { Router } from "express";

const router = Router();

import { current, logout, login, register } from "../dao/controllers/session.controller.js";
import { validateLogin } from "../middlewares/validations.js";

router.post('/register', register);

router.post('/login', validateLogin, login);

router.get('/logout', logout);

router.get('/current', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), current);

export default router;