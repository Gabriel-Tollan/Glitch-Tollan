import { cartDao } from '../handler.js';
import { transporter } from '../../config/email.js';

export const createCart = async (req, res) => {
    
    let response = await cartDao.createCart(req.params.uid);
   
    return res.status(response.code).send({
        status: response.status,
        message: response.message
    });

};

export const addToCart = async (req, res) => {

    const cid = req.params.cid;

    const pid = req.params.pid;

    const response = await cartDao.addToCart(cid, pid);

    return res.status(response.code).send({
        status: response.status,
        message: response.message
    });

};

export const deleteFromCart = async (req, res) => {

    const cid = req.params.cid;

    const pid = req.params.pid;

    const response = await cartDao.deleteFromCart(cid, pid);

    return res.status(response.code).send({
        status: response.status,
        message: response.message
    });

};

export const emptyCart = async (req, res) => {

    const response = await cartDao.emptyCart(req.params.cid);

    return res.status(response.code).send({
        status: response.status,
        message: response.message
    });

};

export const getCart = async (req, res) => {

    const response = await cartDao.getCart(req.params.cid);

    return res.status(response.code).send({
        status: response.status,
        message: response.message
    });

};

export const replaceCart = async (req, res) => {

    const response = await cartDao.replaceCart(req.params.cid, req.body);

    return res.status(response.code).send({
        status: response.status,
        message: response.message
    });

};

export const updateProductQty = async (req, res) => {

    const response = await cartDao.replaceCart(req.params.cid, req.params.pid, req.body.quantity);

    return res.status(response.code).send({
        status: response.status,
        message: response.message
    });

};

export const purchaseCart = async (req, res) => {

    const response = await cartDao.purchaseCart(req.params.cid);

    if (response.message.amount > 0) {

        console.log('Debería mandar el mail');

        try{

            const emailBody = `<div>Su código de ticket es ${response.message.code}, por un total de ${response.message.amount}</div>`;
    
            await transporter.sendMail({
                from: "Zapas ByB",
                to: response.message.purchaser,
                subject: "Gracias por su compra!",
                html: emailBody,
                attachments: []
            });

        } catch (error) {

            console.log(error.message);

        };

    };

    return res.status(response.code).send({
        status: response.status,
        message: response.message
    });
    
};