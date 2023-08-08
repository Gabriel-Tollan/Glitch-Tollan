import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import customLogger from './logger.js';
import { loggerPrefix } from './logger.js';

const KEY = config.secret.key;

const MAIL_KEY = config.email.key;

const filename = 'token.js';

export const generateToken = (user) => {

    const token = jwt.sign({user}, KEY, {expiresIn: '1d'});

    return token;

};

export const generateEmailToken = (email, expiration) => {

    const token = jwt.sign({email}, MAIL_KEY, {expiresIn: expiration});

    return token;

};

export const validateEmailToken = (token) => {

    try {

        const info = jwt.verify(token, MAIL_KEY);

        return info.email;

    } catch (error) {

        customLogger.error(loggerPrefix(filename, error.message));

        return null;

    };
}

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