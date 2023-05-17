import fs from 'fs';

const path = './filesystem/products.json';

export default class ProductManager{

    getProducts = async() =>{

        if(fs.existsSync(path)){
            const data = await fs.promises.readFile(path, 'utf-8');
            const users = JSON.parse(data);
            return users;
        }else {
            return [];
        }

    }
    getProduct = async(id) =>{
        const products = await this.getProducts();

        const product = products.filter((product)=>{
            return product.id == id
        }) 

        return product
    }
    eliminarProduct = async(id) =>{
        
        const products = await this.getProducts();
        const productIndex = products.findIndex((product)=>{
            return product.id == id
        })
        products.splice(productIndex,1)

        try {
            await fs.promises.writeFile(path, JSON.stringify(products,null,'\t'))
            return 'Product eliminado'
        } catch (error) {
             return error   
        }

        
    }
    crearProduct = async(product) =>{
        const products = await this.getProducts();

        
        let id = products[products.length-1].id ;


        product.id = ++id;
        products.push(product)

        try {
            await fs.promises.writeFile(path, JSON.stringify(products,null,'\t'))
            return 'Product creado'
        } catch (error) {
             return error   
        }


    }
    
    modificarProduct = async(id, nombre,descripcion,precio,categoria)=>{

        const products = await this.getProducts();

        const productIndex = products.findIndex((product)=>{
            return product.id == id
        })

        products[productIndex].nombre = nombre;
        products[productIndex].descripcion = descripcion;
        products[productIndex].precio = precio;
        products[productIndex].categoria = categoria;

        try {
            await fs.promises.writeFile(path, JSON.stringify(products,null,'\t'))
            return 'Product modificado'
        } catch (error) {
             return error   
        }

    }


}