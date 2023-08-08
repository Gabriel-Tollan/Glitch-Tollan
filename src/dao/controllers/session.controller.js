import { userDao } from '../handler.js';
import { UserDto } from '../../dto/user.dto.js';

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

    const user = new UserDto(req.user.user);

    res.status(202).send({user});
};

export const forgotPassword = async (req, res) => {

    const { email } = req.body;

    const response = await userDao.forgotPassword(email);

    return res.status(response.code).send({
        status: response.status,
        message: response.message
    });

};

export const resetPassword = async (req, res) => {

    const { email, password } = req.body;

    const response = await userDao.resetPassword(email, password);

    return res.status(response.code).send({
        status: response.status,
        message: response.message
    });

};