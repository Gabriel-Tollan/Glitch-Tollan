const form = document.getElementById('forgot-form');
const h2 = document.getElementById('forgot-message');

form.addEventListener('submit', async (event) => {

    event.preventDefault();

    const formFata = new FormData(form);

    const dataObj = {};

    formFata.forEach((value, key) => dataObj[key] = value);

    await fetch('/api/sessions/forgot-password', {
        method: 'POST',
        body: JSON.stringify(dataObj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then( res => res.json()).then( json => {

        if (json.status === 'Success') {

        form.style.display = "none";

        h2.innerHTML = "A password reset link has been sent to your email";

        } else {

            alert(json.message);

            form[0].value = '';

        };

    });

});