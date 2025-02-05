import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }
    
  addToCart() {
    let cart = getLocalStorage("so-cart");
    if (!Array.isArray(cart)) {
      cart = [];
    }
    cart.push(this.product);
    setLocalStorage("so-cart", cart);
     // Provide feedback to the user
  const addButton = document.getElementById("addToCart");
  
  // Change the button text to indicate the product has been added
  addButton.textContent = "Added to Cart";
  
  // Optionally, disable the button for a brief time to prevent multiple clicks
  addButton.disabled = true;

  // Optionally, show a message in the page (example: a temporary popup or text)
  const feedbackMessage = document.createElement('p');
  feedbackMessage.textContent = `${this.product.NameWithoutBrand} has been added to your cart!`;
  feedbackMessage.classList.add('feedback-message');
  document.querySelector(".product-detail").appendChild(feedbackMessage);

  // Optionally, remove the message after 3 seconds
  setTimeout(() => {
    feedbackMessage.remove();
    addButton.disabled = false; // Re-enable the button
    addButton.textContent = "Add to Cart"; // Reset button text
  }, 3000);

  }

  renderProductDetails() {
    document.querySelector(".product-detail").innerHTML = `
      <h3>${this.product.Brand.Name}</h3>
      <h2 class="divider">${this.product.NameWithoutBrand}</h2>
      <img
        class="divider"
        src="${this.product.Image}"
        alt="${this.product.NameWithoutBrand}"
      />
      <p class="product-card__price">$${this.product.FinalPrice}</p>
      <p class="product__color">${this.product.Colors[0].ColorName}</p>
      <p class="product__description">
        ${this.product.DescriptionHtmlSimple}
      </p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
      </div>
    `;
  }
}