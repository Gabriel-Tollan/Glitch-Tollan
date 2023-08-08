const form = document.getElementById('reset-form');
const params = new URLSearchParams(window.location.search);
const email = params.get('email');

form.addEventListener('submit', async (event) => {

    event.preventDefault();

    const formFata = new FormData(form);

    let dataObj = {};

    formFata.forEach((value, key) => dataObj[key] = value);

    dataObj = {
        ...dataObj,
        email: email
    };

    await fetch('/api/sessions/reset-password', {
        method: 'POST',
        body: JSON.stringify(dataObj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then( res => res.json()).then( json => {

        if (json.status === 'Success') {

            window.location.replace('/login');

        } else {

            alert(json.message);

            form[0].value = '';

        };

    });

});