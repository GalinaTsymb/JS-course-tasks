import {setProductsLS} from "./localStorage";
import {isEmptyObject, updateBalances} from "./helpers";

export default class Cart {

    keyCartLS = 'productsInCart';
    cartItems = {};
    products_obj = {};


    constructor(selector_cart, products){
        this.selector_cart  = selector_cart;
        this.products       = products;

        this.init();
    }

    addProduct(id){
        this.plusProduct(id);
    }

    plusProduct(id){
        this.updateObject();
        let product = this.products_obj[id];

        if(!isEmptyObject(this.cartItems)) {
            if (this.products_obj[id].available > 0){
                if (this.cartItems[id] == undefined) {
                    this.cartItems = {
                        ...this.cartItems,
                        [product.id]: this.products_obj[id]
                    };
                }
            this.cartItems[id].available--;
            this.cartItems[id].availableInCart++;

            }
        }
        else{
            this.cartItems = { [product.id] : this.products_obj[id]};
            this.cartItems[id].available--;
            this.cartItems[id].availableInCart++;
        }

        this.setProductsLS();
        this.counterCart();
        this.totalSum();

    }

    minusProduct(id) {
        this.updateObject();
        if(!isEmptyObject(this.cartItems)){
            if (this.products_obj[id].availableInCart > 0){
                this.cartItems[id].available++;
                this.cartItems[id].availableInCart--;
            }
            if(this.products_obj[id].availableInCart === 0){
                delete this.cartItems[id];
            }
        }
        this.setProductsLS();
        this.counterCart();
        this.totalSum();
    }

    getProductCount(id) {

        if(this.cartItems[id]){
            return this.cartItems[id].availableInCart;
        }
        else{
            return 0;
        }
    }
    getProduct(id){
        if(this.cartItems[id]){
            return this.cartItems[id];
        }
        else{
            return 0;
        }
    }

    renderCart(){
       //this.updateObject();
        this.selector_cart.innerHTML =
            Object.values(this.cartItems).map(item => {
                let disabled = item.available <= 0 ? 'disabled': '';
                return `
                <li class="cart__item">
                                    <div>
                                        <p class="cart__item-name js-products-name">${item.name}</p>
                                        <div class="cart__item-counter-wrap" >
                                            <button class="cart__item-minus js-btn-minus" data-id="${item.id}" data-action="minus">-</button>
                                            <span class="cart__item-counter js-counter">${item.availableInCart}</span>
                                            <button class="cart__item-plus js-btn-plus" ${disabled} data-id="${item.id}" data-action="plus">+</button>                                        
                                        </div>
                                    </div>
                                    <div class="cart__item-sum-wrap">
                                        <span class="cart__item-sum js-sum">$ ${(item.availableInCart * item.price).toFixed(2)}</span>
                                    </div>                                        
                                </li>
            `;
            }).join('');
    }

    setProductsLS(){
        localStorage.setItem(this.keyCartLS, JSON.stringify(this.cartItems));
        this.renderCart();
        this.selector_cart.dispatchEvent(new Event('cart_update'))
    }

     getProductsLS(){
        this.cartItems = localStorage.getItem(this.keyCartLS);
         this.cartItems = JSON.parse(this.cartItems) || {};
    }


    updateObject(){
        this.products = updateBalances(this.products, this.cartItems);
        for (let product of this.products) {
            this.products_obj[product.id] = product;
        }
    }

    counterCart(){
        let number = Object.values(this.cartItems ).reduce((sum, current) => sum + current.availableInCart, 0);
        localStorage.setItem('cartNumbers', number);
        document.querySelector('.js-counter-cart').textContent = number;
    }

    totalSum(){
        let number = Object.values(this.cartItems ).reduce((sum, current) => sum + (current.availableInCart * current.price), 0);
        localStorage.setItem('totalSum', number.toFixed(2));
        document.querySelector('.js-total-sum').textContent = number.toFixed(2);
    }
    eventProcess(){

        (this.selector_cart) && this.selector_cart.addEventListener('click', (e) => {
            let data = e.target.dataset;

            switch(data.action) {
                case 'plus':
                    this.plusProduct(data.id);
                    break;
                case 'minus':
                    this.minusProduct(data.id);
                    break;
            }
        });
    }

    init(){
        this.getProductsLS();

        for (let product of this.products) {
            this.products_obj[product.id] = product;
        }

        this.counterCart();
        this.totalSum();
        this.eventProcess();
        this.renderCart();

    }
    on(event, fn) {
        this.selector_cart.addEventListener(event, fn);
    }

}