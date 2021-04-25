import Shop from './modules/shop.js';


const LINK                          = 'http://my-json-server.typicode.com/achubirka/db/products';
const PRODUCT_LIST                  = document.querySelector('.js-product-list');
const PRODUCTS_CART_CONTAINER       = document.querySelector('.js-cart-list');

document.addEventListener('DOMContentLoaded', () => {
    let shop = new Shop(LINK, PRODUCT_LIST, PRODUCTS_CART_CONTAINER);
    shop.init();
});














