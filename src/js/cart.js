import { getLocalStorage } from "./utils.mjs";
import { cartItemTemplate } from "./ShoppingCart.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}



renderCartContents();
