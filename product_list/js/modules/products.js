

import {isEmptyObject, updateBalances} from "./helpers";

export default class Products {

    constructor(selector_products,products, cart){

        this.selector_products  = selector_products;
        this.products           = products;
        this.cart               = cart;

        this.init();
    }

    addProducts(id){
        this.cart.addProduct(id);
        this.renderProducts();
    }

    eventProcess(){
        (this.selector_products) && this.selector_products.addEventListener('click', () =>{
            let target = event.target;
            if(target.dataset.action === "add"){ this.addProducts(target.dataset.id);}
        });

        this.cart.on('cart_update', this.renderProducts.bind(this));
    }

    updateProducts(){
        this.products = updateBalances(this.products,this.cart.cartItems);
    }



    renderProducts(){
        this.updateProducts();
        let show = this.products.map( value => {
            let disabled = value.available <= 0 ? 'disabled ' : '';
            return `<li class="shop-products__item">
                       <p class="shop-products__name js-products-name">${value.name}</p>
                       <p class="shop-products__price">$<span class="js-products-price"> ${(value.price).toFixed(2)}</span></p>
                       <button type="button" data-action="add"  data-id="${value.id}" class="btn-add shop-products__btn-add js-add-btn" ${disabled}>add</button>
                </li>`;
        }).join("");

        this.selector_products.innerHTML = show;
    }



    init(){
        this.renderProducts();
        this.eventProcess();
    }

}