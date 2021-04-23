import {renderGoods} from './modules/helpers';
import {quantityInCartLS,
        getGoodsLS} from './modules/localStorage'
import Cart from "./modules/cart";

(function() {
const LINK                  = 'http://my-json-server.typicode.com/achubirka/db/products';
const COUNTER_CART          = document.querySelector('.js-counter-cart');
const PRODUCTS_CART_CONTAINER    = document.querySelector('.js-cart-list');
const TOTAL_SUM             = document.querySelector('.js-total-sum');
let PRODUCT_LIST            = document.querySelector('.js-product-list');


let goods = [];

    /**
     * get data from link
     * @returns {Promise<void>}
     */
    const getData = async () => {

    fetch(LINK)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function (data) {
                    for (let i = 0; i < data.length; i++) {
                        //write the array to the variable goods and add one more property
                        // to each object - available In Cart
                        goods.push({...data[i], availableInCart : 0});
                    }
                    renderGoods(goods, PRODUCT_LIST);
                })
            });

};
getData();
//console.log("goods", goods);

    /**
     * initialization class
     * @type {Cart}
     */
    const cart = new Cart('productsInCart', 'cartNumbers');

    /**
     * shows the number of items in the cart or 0 - if there are no goods
     * @type {string}
     */
    COUNTER_CART.textContent = quantityInCartLS('cartNumbers') || 0;

    /**
     * shows items in cart
     */
    cart.renderCartChange(PRODUCTS_CART_CONTAINER,TOTAL_SUM);

    /**
     * add goods in the cart
     * track the event of a click on the parent element (PRODUCT_LIST)
     */
    (PRODUCT_LIST) && PRODUCT_LIST.addEventListener('click', () =>{
        let target = event.target;
        console.log("event target", target);
        //if the element on which the click event occurred has data-action="add"
        if(target.dataset.action === "add" && goods[target.dataset.index].available>0){
            cart.addToCart(goods[target.dataset.index]);
            if(goods[target.dataset.index].available === 0){
                event.target.style.opacity = 0.5;
                event.target.setAttribute("disabled", "true");
                //return false;
            }
        }
        else{
            //return false;
        }
        //console.log('ddddd');
        cart.renderCartChange(PRODUCTS_CART_CONTAINER,TOTAL_SUM);
    });


    (PRODUCTS_CART_CONTAINER) && PRODUCTS_CART_CONTAINER.addEventListener('click', () =>{
        let target = event.target.dataset.action;
        let itemIndex = goods.findIndex(x => x.id === parseInt(event.target.dataset.index));
        switch(target){
            case 'minus':
                cart.removeFromCart(goods[itemIndex],event.target.dataset.index);
                cart.renderCartChange(PRODUCTS_CART_CONTAINER,TOTAL_SUM);
                //console.log("minus");
                break;
            case 'plus':
                if(goods[itemIndex].available>0) {cart.addToCart(goods[itemIndex]);}

                cart.renderCartChange(PRODUCTS_CART_CONTAINER,TOTAL_SUM);

                break;
            default:
                console.log("nothing");
        }
    })

    window.addEventListener('storage', (event) => {
        if(event.key === 'productsInCart'){
            cart.renderCartChange(PRODUCTS_CART_CONTAINER,TOTAL_SUM);
            cart.numberItemsCart();
        }
    })

}());













