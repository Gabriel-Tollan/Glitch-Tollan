import jwt from 'jsonwebtoken';


import { config } from './config.js';

const KEY = config.secret.key;

export const generateToken = (user) => {

    const token = jwt.sign({user}, KEY, {expiresIn: '1d'});

    return token;

};

export const authToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    const token = authHeader.split(' ')[1];

    if (token === 'null') {

        return res.status(401).send({status: 'Error', error: 'Unauthorized'});

    };

    jwt.verify(token, KEY, (error, credentials) => {

        if (error) return res.status(401).send({status: 'Error', error: 'Token error'});

        req.user = credentials.user;

        next();

    });

};