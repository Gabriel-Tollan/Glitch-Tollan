import productModel from '../dao/models/product.model.js';

export const getProducts = async (req, res) => {
    
    const {limit = 10, page = 1, category, available, sort} = req.query;
    
    let query = {};

    if (category) {
        if (available) {
            query = {category: category, stock: { $gt: 0}}
        } else {
            query = {category: category}
        }
    };
    
    const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages} = await productModel.paginate(
        query,
        {
            limit: limit,
            sort:{ price: sort },
            page: page,
            lean: true
        }
    );

    const payload = docs;
    
    const prevLink = hasPrevPage === false ? null : `/products?page=${prevPage}`;

    const nextLink = hasNextPage === false ? null : `/products?page=${nextPage}`;

    return res.status(202).send({
        status: "Succcess",
        payload: payload,
        totalPages: totalPages,
        prevPage: prevPage,
        nextPage: nextPage,
        page: page,
        hasNextPage: hasNextPage,
        hasPrevPage: hasPrevPage,
        prevLink: prevLink,
        nextLink: nextLink,
    });
};

export const getProductByID = async (req, res) => {
    
    const pid = req.params.pid;

    const product = await productModel.findById(pid);

    if(!product){
        return res.status(400).send({
            status: 'Error',
            message: 'No se han encontrado productos con ese ID'
        });
    };
    res.status(200).send({
        status: 'Success',
        message: product
    });
};

export const addProduct = async (req, res) => {
    
    const product = req.body;

    const products = await productModel.find();
        
    const codeFound = products.find(product => product.code === product.code);

    if (codeFound){
        return {
            code: 403,
            status: 'Error',
            message: `No se pudo agregar el nuevo producto porque el código ${product.code} ya está en uso`
        };
    };

    try {
        await productModel.create(product);
        return res.status(202).send({
            status: 'Success',
            message: `El producto ${product.title} ha sido agregado con éxito.`
        });

    } catch (error) {
        return res.status(400).send({
            status: 'Error',
            message: `${error}`
        });
    };
};

export const updateProduct = async (req, res) => {

    const pid = req.params.pid;
    
    const product = req.body;

    try {
        const productFound = await productModel.findById(pid);
        
        if (!productFound){
            return res.status(400).send({
                status: 'Error',
                message: `No se ha encontrado un producto con el id ${pid}`
            });
        };

    } catch (error) {
        return res.status(400).send({
            status: 'Error',
            message: error.message
        });
    }

    try {
        
        const codeFound = await productModel.find({code: product.code});

        if(codeFound[0]._id != pid){
            return res.status(400).send({
                status: 'Error',
                message: `El código de producto que intenta actualizar ya se encuentra en uso por el producto ${codeFound[0].title}`
            });
        };
    } catch (error) {
        return res.status(400).send({
            status: 'Error',
            message: error.message
        });
    };
    
    try {
        await productModel.findByIdAndUpdate(pid, product);
        return res.status(202).send({
            status: 'Success',
            message: `El producto ${pid} ha sido actualizado con éxito`
        });

    } catch(error) {  
        return res.status(400).send({
            status: 'Error',
            message: error.message
        });
    };
};

export const deleteProduct = async (req, res) => {
    
    const pid = req.params.pid;

    try {
        await productModel.findByIdAndDelete(pid);
        return res.status(202).send({
            status: 'Success',
            message: `El producto con ID ${pid} ha sido elminado exitosamente`
        });

    } catch(error) {
        return res.status(400).send({
            status: 'Error',
            message: `${error}`
        });

    };
};