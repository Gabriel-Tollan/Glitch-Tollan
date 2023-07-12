import { userDao } from '../handler.js';

export const register = async (req, res) => {

    const response = await userDao.register(req.body);

    return res.status(response.code).send({
        status: response.status,
        message: response.message
    });

};

export const login = async (req, res) => {

    const response = await userDao.login(req.body.email);

    req.user = response.user;

    req.params.uid = response.user._id;

    res.cookie('token', response.token, {httpOnly: true}).send({
        status: response.status,
        message: response.message,
        user: response.user
    });

};

export const logout = (req, res) => {

    res.clearCookie('token');

    res.redirect('/login');

};

export const current = (req, res) => {

    res.send(req.user);

};