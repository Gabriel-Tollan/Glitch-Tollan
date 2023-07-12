const addProductsContainer = document.getElementById('add-products-container');
const addProduct = document.getElementById('add-product');
const addProductForm = document.getElementsByClassName('add-product-form');
const deleteProduct = document.getElementsByClassName('delete-product');
const updateProduct = document.getElementsByClassName('update-product');


for (let i = 0; i < deleteProduct.length; i++){

    deleteProduct[i].addEventListener('click', async () => {

        try {

            await fetch(`/api/products/${deleteProduct[i].id}`, {method: "DELETE"});

            window.location.replace('/products');

        } catch (error) {

            console.log(error.message);

        };

    });

};

for (let i = 0; i < updateProduct.length; i++){

    updateProduct[i].addEventListener('click', async () => {

        const formData = new FormData(addProductForm[i]);

        let dataObj = {};

        formData.forEach((value, key) => dataObj[key] = value);

        try {

            await fetch(`/api/products/${updateProduct[i].id}`, {
                method: "PUT",
                body: JSON.stringify(dataObj),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            window.location.replace('/products');

        } catch (error) {

            console.log(error.message);

        };

    });

};