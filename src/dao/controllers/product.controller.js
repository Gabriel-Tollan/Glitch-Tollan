import { productDao } from "../handler.js";

export const getProducts = async (req, res) => {
    
    const response = await productDao.getProducts(req.query);

    return res.status(response.code).send({
        status: response.status,
        payload: response.payload,
        totalPages: response.totalPages,
        prevPage: response.prevPage,
        nextPage: response.nextPage,
        page: response.page,
        hasNextPage: response.hasNextPage,
        hasPrevPage: response.hasPrevPage,
        prevLink: response.prevLink,
        nextLink: response.nextLink
    });

};

export const getProductByID = async (req, res) => {
    
    const response = await productDao.getProductByID(req.params.pid)

    return res.status(response.code).send({
        status: response.status,
        message: response.message
    });

};

export const addProduct = async (req, res) => {
    
    const response = await productDao.addProduct(req.body);
    
    return res.status(response.code).send({
        status: response.status,
        message: response.message
    });
    
};

export const updateProduct = async (req, res) => {

    const response = await productDao.updateProduct(req.params.pid, req.body);
    
    return res.status(response.code).send({
        status: response.status,
        message: response.message
    });

};

export const deleteProduct = async (req, res) => {
    
    const response = await productDao.deleteProduct(req.params.pid);

    return res.status(response.code).send({
        status: response.status,
        message: response.message
    });

};