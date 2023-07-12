const form = document.getElementById('register-form');

form.addEventListener('submit', event => {

    event.preventDefault();
    
    const formData = new FormData(form);
    const dataObj = {};

    formData.forEach((value, key) => dataObj[key] = value);

    fetch('/api/sessions/register',{
        method: 'POST',
        body: JSON.stringify(dataObj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then( res => {
        
        if (res.status === 202) {
            window.location.replace('/login');

        } else {

            alert(`Existing user. Please login instead of registering.`)
            for (let i = 0; i < form.length - 1; i++) {
                form[i].value = ''; 
                
            };
            
        };

    });

});