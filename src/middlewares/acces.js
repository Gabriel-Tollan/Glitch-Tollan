export const publicAccess = (req, res, next) => {
    
    if (req.user) return res.redirect('/products');

    next();

};

export const privateAccess = (req, res, next) => {
    
    if (!req.user) return res.redirect('/login');

    next();

};

export const adminAccess = (req, res, next) => {
    
    if (req.user.user.role !== 'admin') return res.redirect('/products');

    next();

};

export const userAccess = (req, res, next) => {
    
    if (req.user.user.role !== 'user') return res.redirect('/products');

    next();

};