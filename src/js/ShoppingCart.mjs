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
        </a>
        
        <p class="cart-card__color">${item.Colors[0].ColorName}</p>
        <input type="number" id="quantity-${item.id}" class="cart-card__quantity" value="${item.quantity}" min="1" />
        <label for="quantity-${item.id}" class="cart-card__quantity-label">Qty:</label>
        
        <p class="cart-card__price">$${item.FinalPrice}</p>
        
        </li>
    <ul>`;
    
}
