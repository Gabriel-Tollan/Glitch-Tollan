const form = document.getElementById('login-form');

form.addEventListener('submit', async (event) => {

    event.preventDefault();

    const formFata = new FormData(form);

    const dataObj = {};

    formFata.forEach((value, key) => dataObj[key] = value);

    await fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(dataObj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then( res => res.json()).then( json => {

        if (json.status === 'Success') {

            window.location.replace('/products');

        } else {

            alert(json.message);

            form[0].value = '';

            form[1].value = '';

        };

    });

});