import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import { Faker, en } from "@faker-js/faker";

export const customFaker = new Faker({
    locale: [en]
});

const { commerce, image, database, string, internet, person, phone, datatype, lorem } = customFaker;

export const generateProduct = () => {

    return {
        _id: database.mongodbObjectId(),
        code: string.alphanumeric(10),
        title: commerce.productName(),
        price: parseFloat(commerce.price()),
        department: commerce.department(),
        stock: parseInt(string.numeric(2)),
        image: image.url(),
        description: commerce.productDescription()
    };

};

export const generateUser = () => {

    const numberOfProducts = Math.ceil(Math.random()*10);

    let products = [];

    for (let i = 0; i < numberOfProducts; i++){

        const product = generateProduct();

        products.push(product);

    };
    
    return {
        _id: database.mongodbObjectId(),
        first_name: person.firstName(),
        last_name: person.lastName(),
        phone: phone.number(),
        email: internet.email(),
        avatar: image.avatar(),
        role: datatype.boolean() ? "premium" : "user",
        job_title: person.jobTitle(),
        cart: products
    };

};

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const validatePassword = (password, user) => bcrypt.compareSync(password, user.password);

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

export default __dirname;