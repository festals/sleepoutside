import { getLocalStorage } from "./utils.mjs";
import { cartItemTemplate } from "./ShoppingCart.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

// Example function to clear the cart content
function clearCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Remove all cart items from the cart list
    alert('Cart has been cleared!');
}

renderCartContents();
