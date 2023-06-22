import fs from 'fs';

const path = './files/carts.json';

export default class CartsManager{
   addProductInCart = async (idCart, idProd) =>{
    const carts = await this.getCarts();
    const cartsFiltrados = carts.find((cart) => cart.id == idCart);
    
    let productsInCart = cartsFiltrados.products;

    const productIndex = productsInCart.findIndex((u) => u.id == idProd);

    if (productIndex !== -1) {
        productsInCart[productIndex].quantity =
        productsInCart[productIndex].quantity + 1;
    }else{
        let product = {
        id: idProd,
        quantity: 1,      
    };
    productsInCart.push(product);
    }
    await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));
    return cartsFiltrados
   };
    
    
    getCarts = async() =>{

        if(fs.existsSync(path)){
            const data = await fs.promises.readFile(path, 'utf-8');
            const carts = JSON.parse(data);
            return carts;
        }else {
            return [];
        }

    }
    getCart = async (idCart) => {
        const carts = await this.getCarts();
        const cart = carts.find((cart) => cart.id == idCart )
        return cart;
    }


    addCart = async() =>{
        const carts = await this.getCarts();
        let cart = {
            products: [],
        };
        
        if (carts.length === 0) {
            cart.id = 1;
        }else {
            cart.id = carts[carts.length -1].id + 1;
        }

        carts.push(cart);
        await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));
        return cart;
    };

    getCartById = async (id_product) => {
        const products = await this.getCarts();

        let product = products.find((product) => product.id === id_product);

        if (product) {
            return product;
        } else {
            return console.log("no existe");
        }
    };

    updateCart = async (
        id_product,
        nombre,
        descripcion,
        precio,
        thumbnail,
        code,
        stock,
        category
    );
    
}