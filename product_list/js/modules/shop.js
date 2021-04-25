import Products from './products.js';
import Cart from './cart.js';
import {status, json, updateBalances} from './helpers';
import {getProductsLS} from './localStorage';

export default class Shop {

    products = [];
    cart;
    products_list;
    old_cart                        = getProductsLS('productsInCart');

    constructor(link, selector_products, selector_cart) {
        this.link                   = link;
        this.selector_products      = selector_products;
        this.selector_cart          = selector_cart;
    }

    loadProductsList(){
      return  fetch(this.link)
          .then(status)
          .then (json);
    }

    updateStorage(){
        window.addEventListener('storage', (event) => {

            this.cart.getProductsLS();
            this.cart.renderCart();
            this.products_list.renderProducts();
            this.products_list. updateProducts();
            this.cart.updateObject();
            this.cart.counterCart();
            this.cart.totalSum();
        });
    }



    init(){
        this.loadProductsList().then((data) => {
                let new_data=[];
            for (let i = 0; i < data.length; i++) {
                //write the array to the variable goods and add one more property
                // to each object - available In Cart
                new_data.push({...data[i], availableInCart : 0});
            }
            this.products           = updateBalances(new_data, this.old_cart);
            this.cart               = new Cart(this.selector_cart, this.products);
            this.products_list      = new Products(this.selector_products, this.products, this.cart );
            this.updateStorage();

        }).catch((error) => {return error;});
    }
}