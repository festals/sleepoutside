import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const discountAmount =product.SuggestedRetailPrice - product.ListPrice
  const discountPercentage = Math.round((discountAmount / product.SuggestedRetailPrice) * 100);
  return `<li class="product-card">
  <a href="product_pages/index.html?product=${product.Id}">
  <img
    src="${product.Image}"
    alt="Image of ${product.Name}"
  />
  <h3 class="card__brand">${product.Brand.Name}</h3>
  <h2 class="card__name">${product.Name}</h2>
  <p class="product-card__price">$${product.ListPrice}</p></a>
  <p class="product-card__price" style="background-color:green;">${discountPercentage}%</p></a>
  <p class="product-card__price">$${product.FinalPrice}</p></a>
</li>`;
}

export default class  ProductListing {
    constructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement; 
    }

    async init() {
        // our dataSource will return a Promise...so we can use await to resolve it.
        const list = await this.dataSource.getData();
        this.renderList(list);
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}