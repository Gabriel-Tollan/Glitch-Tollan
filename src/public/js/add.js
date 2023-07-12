const form = document.getElementsByClassName('add-product-form');

form[0].addEventListener('submit', async (event) => {

    event.preventDefault();

    const formData = new FormData(form[0]);

    let dataObj = {};

    formData.forEach((value, key) => dataObj[key] = value);

    try {
        
        await fetch('/api/products', {
            method: "POST",
            body: JSON.stringify(dataObj),
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {

        console.log(error.message);

    };

    window.location.replace('/add');

});