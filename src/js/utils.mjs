// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get URL param
export function getParams(param) {
  const queryString = window.location.search; 
  const urlParams = new URLSearchParams(queryString); 
  return urlParams.get(param); 
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(templateFn);
  // if clear is true we need to clear out the contents of the parent.
  if (clear === "true") {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback
) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback){
    callback(data);
  }
}

// yes no maybe I don't know
export function convertToText(response) {
  return response.text();
}

export async function loadTemplate(path){
  const html = await fetch(path).then(convertToText);
  const template = document.createElement("template");
  template.innerHTML =html;
  return template;
}


// async function loadTemplate(path) {
//   const res = await fetch(path);
//   const template = await res.text();
//   return template;
// }

export async function loadHeaderFooter(){
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  const header = document.getElementById("mainheader");
  const footer = document.getElementById("mainfooter");

  renderWithTemplate(headerTemplate,header);
  renderWithTemplate(footerTemplate,footer);

  
}

// Apply discount function (either percentage or fixed amount)
export function applyDiscount(price, discount, type = 'percentage') {
  let discountedPrice = price;

  if (type === 'percentage') {
    discountedPrice -= (price * discount / 100);
  } else if (type === 'fixed') {
    discountedPrice -= discount;
  }

  return discountedPrice < 0 ? 0 : discountedPrice;
}

// Retrieve price from localStorage, apply discount, and update the price
const originalPrice = getLocalStorage('price');  // Get the original price from localStorage
const discount = 10;  // 10% discount
const newPrice = applyDiscount(originalPrice, discount, 'percentage');

// Save the discounted price back to localStorage
setLocalStorage('price', newPrice);

// Function to render discounted price to the DOM
export function renderDiscountedPrice(parentElement, price) {
  const priceElement = `<div class="discounted-price">Discounted Price: $${price.toFixed(2)}</div>`;
  parentElement.insertAdjacentHTML('afterbegin', priceElement);
}

// Display the discounted price in the HTML
const parentElement = document.querySelector("#price-container");  // Adjust the selector as needed
renderDiscountedPrice(parentElement, newPrice);
