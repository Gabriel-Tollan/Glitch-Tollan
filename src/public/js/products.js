const addToCartButton = document.getElementsByClassName('add-to-cart');
const cart = document.getElementById('cart-id');

let cartID = cart.innerHTML;

for (let i = 0; i < addToCartButton.length; i++){
    
    addToCartButton[i].addEventListener('click', async () => {

        await fetch(`/api/carts/${cartID}/product/${addToCartButton[i].id}`, {method: "POST"});
    
    });

};