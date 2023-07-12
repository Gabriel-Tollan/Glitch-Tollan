import { viewDao, messageDao } from "../handler.js";

export const renderProducts = async (req, res) => {

    const {limit = 10, page = 1, category, available, sort} = req.query;

    const response = await viewDao.renderProducts(limit, page, category, available, sort);

    if (req.user.user.role === 'admin'){

        return res.render('admin', {
            payload: response.payload,
            totalPages: response.totalPages,
            prevPage: response.prevPage,
            nextPage: response.nextPage,
            page: response.page,
            hasNextPage: response.hasNextPage,
            hasPrevPage: response.hasPrevPage,
            prevLink: response.prevLink,
            nextLink: response.nextLink,
            user: req.user.user
        });

    };

    return res.render('products', {
        payload: response.payload,
            totalPages: response.totalPages,
            prevPage: response.prevPage,
            nextPage: response.nextPage,
            page: response.page,
            hasNextPage: response.hasNextPage,
            hasPrevPage: response.hasPrevPage,
            prevLink: response.prevLink,
            nextLink: response.nextLink,
            user: req.user.user
    });

};

export const renderCart = async (req, res) => {

    const cart = await viewDao.renderCart(req.params.cid);

    res.render('cart', {payload: cart});

};

export const renderProfile = async (req, res) => {

    res.render('profile', {user: req.user.user});

};

export const renderAddProduct = async (req, res) => {

    res.render('add', {user: req.user.user});

};

export const renderRegister = async (req, res) => {

    res.render('register');

};

export const renderLogin = async (req, res) => {

    res.render('login');

};

export const renderChat = async (req, res) => {

    const response = await messageDao.getMessages();

    res.render('chat',{user: req.user.user, messages: response.message});

};

export const redirectProducts = async (req, res) => {

    res.redirect('/products');

};