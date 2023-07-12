const purchaseButton = document.getElementById('purchase');
const cart = document.getElementById('cart-id');
const ticketCode = document.getElementById('ticket-code');
const ticketAmount = document.getElementById('ticket-amount');
const productsContainer = document.getElementById('products-container');

let cartID = cart.innerHTML;

setRemoveButtonListener();

function setRemoveButtonListener(){

    const removeFromCartButton = document.getElementsByClassName('remove-from-cart');

    for (let i = 0; i < removeFromCartButton.length; i++){

        removeFromCartButton[i].addEventListener('click', async () => {

            await fetch(`/api/carts/${cartID}/product/${removeFromCartButton[i].id}`, {method: "DELETE"});

            window.location.replace(`/carts/${cartID}`);

        });

    };

};

purchaseButton.addEventListener('click', async() => {

    await fetch(`/api/carts/${cartID}/purchase`, {method: "POST"})
    .then(response => response.json())
    .then(json => {

        if (json.message.amount > 0) {

            ticketCode.innerHTML = `Su código de ticket es: ${json.message.code}`;

            ticketAmount.innerHTML = `El total de su compra fue de: ${json.message.amount}`;

        } else {

            ticketCode.innerHTML = `No hay stock suficiente del producto seleccionado como para realiza la compra`;

        };

        purchaseButton.style.display = "none";

    });

    await fetch(`/api/carts/${cartID}`, {method: "GET"})
    .then(response => response.json())
    .then(json => {

        productsContainer.replaceChildren();

        json.message.products.forEach(element => {

            const productContainer = document.createElement('div');
            const p1 = document.createElement('p');
            const p2 = document.createElement('p');
            const p3 = document.createElement('p');
            const p4 = document.createElement('p');
            const p5 = document.createElement('p');
            const button = document.createElement('button');

            productContainer.className = 'product-container';

            p1.className = 'product-title';
            p1.textContent = element.product.title;

            p2.className = 'product-data';
            p2.textContent = `Price: $${element.product.price}`;

            p3.className = 'product-data';
            p3.textContent = `Quantity: ${element.quantity}`;

            p4.className = 'product-data';
            p4.textContent = `Category: ${element.product.category}`;

            p5.className = 'product-description';
            p5.textContent = `Description: ${element.product.description}`;

            button.className = 'remove-from-cart'
            button.id = `${element.product._id}`;
            button.textContent = 'Remove from Cart';

            productContainer.appendChild(p1);
            productContainer.appendChild(p2);
            productContainer.appendChild(p3);
            productContainer.appendChild(p4);
            productContainer.appendChild(p5);
            productContainer.appendChild(button);

            productsContainer.appendChild(productContainer);

        });

        setRemoveButtonListener();

    });

});