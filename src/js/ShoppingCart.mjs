import { getLocalStorage } from "./utils.mjs";

export function cartItemTemplate(item, onQuantityChange){
    return `<ul id =cart-items>
        <li class="cart-card divider">
        <a href="#" class="cart-card__image">
            <img
                src="${item.Image}"
                alt="Image of ${item.Name}"
            />
        </a>
        <a href="#">
            <h2 class="card__name">${item.Name}</h2>
            <p class="cart-card__color">${item.Colors[0].ColorName}</p>
            <p class="cart-card__quantity">qty: 1</p>
            <p class="cart-card__price">$${item.FinalPrice}</p>
        </div>
    </li>`;
}

// function calculateTotalPrice(cartItems, selector) {
//     if (cartItems !== null) {
//         const htmlItems = cartItems.map((item) => cartItemTemplate(item));
//         document.querySelector(selector).innerHTML = htmlItems.join('');
//     }
//     return cartItems.reduce((total, item) => total + item.FinalPrice, 0);
// }

export default class ShoppingCart {
    constructor(key, parentSelector) {
        this.key = key;
        this.parentSelector = parentSelector;
    }

    async init() {
    const list = getLocalStorage(this.key);
    this.calculateListTotal(list);
    this.renderCartContents(list);
    }

    calculateListTotal(list) {
        const amounts = list.map((item) => item.FinalPrice);
        this.total = amounts.reduce((sum, item) => sum + item);
    }    

    renderCartContents() {
        const cartItems = getLocalStorage(this.key);  //|| []
        if (cartItems.length === 0) {
            this.displayEmptyCartMessage();
            //return;   
        }

        const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
        const cartContainer = document.querySelector(this.parentSelector);
        cartContainer.innerHTML = htmlItems.join("");

        const cartFooter = document.querySelector(".cart-footer");
        // To show the footer, remove the 'hide' class
        cartFooter.classList.remove("hide");

        // Calculate the total price
        // const totalPrice = calculateTotalPrice(cartItems);
        const totalPrice = calculateTotalPrice(cartItems, this.parentSelector);

        // Update the cart total
        const cartTotalElement = document.querySelector(".cart-total");
        cartTotalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;

        this.attachRemoveItemListeners(cartItems);

    }

    attachRemoveItemListeners(cartItems) {
        const cartContainer = document.querySelector(this.parentSelector);
        const removeButtons = cartContainer.querySelectorAll(".removeButton");

        removeButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-index");
                cartItems.splice(index, 1);
                setLocalStorage(this.key, cartItems);
                this.renderCartContents();
            });
        });
    }

    // displayEmptyCartMessage() {
    //     const cartContainer = document.querySelector(this.parentSelector);
    //     cartContainer.innerHTML = `<p>Your cart is empty.</p>`;
    // }

    displayEmptyCartMessage() {
        const cartContainer = document.querySelector(this.parentSelector);
        cartContainer.innerHTML = `<p>Your cart is empty.</p>`;
        
        const cartFooter = document.querySelector('.cart-footer');
        cartFooter.classList.add('hide');  // Hide the footer when the cart is empty
    }

    // update cart icon inside the class
    updateCartIcon(cartItems) {
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cartItems.length > 0 ? cartItems.length : '';
        }
    }
    
}
//------------using remove item button-------------
