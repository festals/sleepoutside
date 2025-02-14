import { setLocalStorage, getLocalStorage } from "./utils.mjs";

// Function to retrieve customer comment (name, address, comment)
export function getCustomerComment() {
  // Example static customer data (can be retrieved from form or API in a real case)
  const name = "John Doe"; // Static name for example
  const address = "1234 Elm St"; // Static address for example
  const comment = "Great product! I loved it."; // Static comment for example

  // Return customer data as an object
  return { name, address, comment };
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Fetch product by ID and render details
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();

    // Event listener to add product to cart
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
    // Get current cart from localStorage
    let cart = getLocalStorage("so-cart");
    if (!Array.isArray(cart)) {
      cart = [];
    }
    cart.push(this.product); // Add the current product to the cart
    setLocalStorage("so-cart", cart); // Save updated cart in localStorage

    alert(`${this.product.NameWithoutBrand} has been added to your cart.`);
  }

  renderProductDetails() {
    // Get customer comment details
    const { name, address, comment } = getCustomerComment();

    // Render product details and customer comment
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

      <!-- Customer comment section -->
      <p><strong>Customer Comment:</strong></p>
      <p><strong>Customer Name:</strong> ${name}</p>
      <p><strong>Customer Address:</strong> ${address}</p>
      <p><strong>Comment:</strong> ${comment}</p>
    `;
  }
}
