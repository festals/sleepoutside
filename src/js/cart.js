import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

//const cart = new ShoppingCart("so-cart", ".product-list");
//cart.renderCartContents();

// update the cart count
//import { loadHeaderFooter } from "./utils.mjs";
//import ShoppingCart from "./ShoppingCart.mjs";

//loadHeaderFooter();

const cart = new ShoppingCart("so-cart", ".product-list");
cart.init();
if (cart.total > 0) {
  // show our checkout button and total if there are items in the cart.
  document.querySelector(".list-footer").classList.remove("hide");
}

// Function to update cart count in the header
function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  const cartCountElement = document.querySelector(".cart-count");
  const itemCount = cartItems.length;
  
  if (itemCount > 0) {
    cartCountElement.textContent = itemCount;
    cartCountElement.style.display = "inline";
  } else {
    cartCountElement.style.display = "none"; // Hide if cart is empty
  }
}

// Call the function on page load
updateCartCount();

// Optional: Update the count whenever cart changes
window.addEventListener("storage", updateCartCount);


// function renderCartContents() {
//   const cartItems = getLocalStorage("so-cart");
//   const htmlItems = cartItems.map((item) => cartItemTemplate(item));
//   document.querySelector(".product-list").innerHTML = htmlItems.join("");
// }

// Example function to clear the cart content
function clearCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Remove all cart items from the cart list
    alert('Cart has been cleared!');
}

renderCartContents();
