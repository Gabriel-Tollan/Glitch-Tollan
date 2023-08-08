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
        }).then(res => res.json()).then(json => {

            alert(json.message);

        });

    } catch (error) {

        alert(error.message);

    };

    window.location.replace('/add');

});