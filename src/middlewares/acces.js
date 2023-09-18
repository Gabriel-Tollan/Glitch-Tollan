import customLogger from "../utils/logger.js";

export const publicAccess = (req, res, next) => {
    
    if (req.user) return res.redirect('/products');

    next();

};

export const privateAccess = (req, res, next) => {
    
    if (!req.user) {
        customLogger.warn(`${new Date().toLocaleDateString()}: Unauthorized access. Redirecting to the login page`);
    return res.redirect('/login');

    };

    next();

};

export const adminAccess = (req, res, next) => {
    
    if (req.user.user.role !== 'admin') {
    
    customLogger.warn(`${new Date().toLocaleDateString()}: Unauthorized access. Only admins can access this page`);
    
    return res.redirect('/products');
    
    };

    next();

};    


export const userAccess = (req, res, next) => {
    
    if (req.user.user.role !== 'user') return res.redirect('/products');

    next();

};