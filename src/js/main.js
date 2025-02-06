import ProductData from "./ProductData.mjs";
import ProductList from "./productList.mjs";


const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const listing = new ProductList("Tents", dataSource, element);


listing.init();

