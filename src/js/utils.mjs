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

<<<<<<< HEAD
export async function loadTemplate(path){
  const html = await fetch(path).then(convertToText);
  const template = document.createElement("template");
  template.innerHTML = html;
=======
// yes no maybe I don't know
// export function convertToText(response) {
//   return response.text();
// }

// export async function loadTemplate(path){
//   const html = await fetch(path).then(convertToText);
//   const template = document.createElement("template");
//   template.innerHTML =html;
//   return template;
// }


async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
>>>>>>> 3b8d6f05dbb6cbaa5860791b38af684ee7efeab0
  return template;
}

export async function loadHeaderFooter(){
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  const header = document.getElementById("mainheader");
  const footer = document.getElementById("mainfooter");

  renderWithTemplate(headerTemplate,header);
  renderWithTemplate(footerTemplate,footer);
}

export function alertMessage(message, scroll = true) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  // set the contents. You should have a message and an X or something the user can click on to remove
  alert.innerHTML = `<p>${message}<p><span>X<span>`;
  
  alert.addEventListener("click", function(e) {
      if(e.target.tagname == "SPAN" ) { 
        main.removeChild(this);
      }
  })
  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if(scroll)
    window.scrollTo(0,0);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}
