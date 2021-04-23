import {getGoodsLS,
        setGoodLS,
        quantityInCartLS
       } from './localStorage.js';


export default class Cart {

    constructor(productsInCart, cartNumbers) {
        this.productsInCart = productsInCart;
        this.cartNumbers    = cartNumbers;

    }

    addToCart(targetProduct){

        let cartItems = getGoodsLS(this.productsInCart);
        //console.log("cartItems", cartItems);
        //если корзина не пустая
        if(cartItems != null){
            if(cartItems[targetProduct.id] == undefined){
                cartItems = {
                    ...cartItems,
                    [targetProduct.id] : targetProduct
                };
                cartItems[targetProduct.id].available -=1;
                cartItems[targetProduct.id].availableInCart +=1;
            }else{
                cartItems[targetProduct.id].available -=1;
                cartItems[targetProduct.id].availableInCart +=1;
                targetProduct.available -= 1;
                targetProduct.availableInCart += 1;
            }
        }else{
            // если корзина пустая
            targetProduct.available -= 1;
            targetProduct.availableInCart = 1;
            cartItems = {
                [targetProduct.id]:targetProduct
            };
        }
        setGoodLS("productsInCart", cartItems);

        this.numberItemsCart();
        this.totalCostADD(targetProduct);
    }

    numberItemsCart(){
        let productNumbers = quantityInCartLS(this.cartNumbers);
        let cartItems      = getGoodsLS(this.productsInCart);

        let number = Object.values(cartItems).reduce((sum, current) => sum + current.availableInCart, 0);

        localStorage.setItem('cartNumbers', number);
        document.querySelector('.js-counter-cart').textContent = number;
        /*if(productNumbers){
            let number = Object.values(cartItems).reduce((sum, current) => sum + current.availableInCart, 0);

            localStorage.setItem('cartNumbers', number);
            document.querySelector('.js-counter-cart').textContent = number;
        }else{
            /!*localStorage.setItem('cartNumbers', 1);
            document.querySelector('.js-counter-cart').textContent = 1;*!/
        }*/
    }
    renderCart(data, selector){

        Object.values(data).map((item, index) =>{
            selector.innerHTML += `<li class="cart__item">
                                    <div>
                                        <p class="cart__item-name js-products-name">${item.name}</p>
                                        <div class="cart__item-counter-wrap" >
                                            <button class="cart__item-minus js-btn-minus" data-index="${item.id}" data-action="minus">-</button>
                                            <span class="cart__item-counter js-counter">${item.availableInCart}</span>
                                            <button class="cart__item-plus js-btn-plus" ${this.disabledTrue(item.available)} data-index="${item.id}" data-action="plus">+</button>                                        
                                        </div>
                                    </div>
                                    <div class="cart__item-sum-wrap">
                                        <span class="cart__item-sum js-sum">$ ${(item.availableInCart * item.price).toFixed(2)}</span>
                                    </div>                                        
                                </li>`
        });
    }
    disabledTrue(value){
        if (value === 0){
            return "disabled";
        }
    }
    totalCostADD(product){
        //console.log("the product price is", product.price);

        let cartCost = localStorage.getItem('totalCost');


        if(cartCost != null){
            cartCost = parseFloat(cartCost);
            localStorage.setItem("totalCost", cartCost + product.price);
        }else{
            localStorage.setItem("totalCost",product.price );
        }

    }
    totalCostRamove(product){
        //console.log("the product price is", product.price);

        let cartCost = localStorage.getItem('totalCost');


        if(cartCost != null){
            cartCost = parseFloat(cartCost);
            localStorage.setItem("totalCost", cartCost - product.price);
        }else{
            //localStorage.setItem("totalCost",product.price );
        }

    }
    displayCard(selectorCartCont, selectorTotalSum){
        let cartItems = getGoodsLS(this.productsInCart);

        let cartCost = localStorage.getItem('totalCost');

        if(cartItems && selectorCartCont){
            this.renderCart(cartItems, selectorCartCont);
        }
        selectorTotalSum.innerHTML = cartCost || (0).toFixed(2);
    }

    renderCartChange(selectorCartCont, selectorTotalSum){
        selectorCartCont.innerHTML = "";
        this.displayCard(selectorCartCont,selectorTotalSum);
    }
    removeFromCart(targetProduct, key){
        let new_key = key;
        console.log('key',new_key);
        let cartItems = getGoodsLS(this.productsInCart);
        console.log("cartItems", cartItems);
        //если корзина не пустая
        if(targetProduct.availableInCart>0){
            console.log('no delete');
         /*   if(cartItems[targetProduct.id] == undefined){
                console.log('del targetProduct id', cartItems[targetProduct.id] );
                cartItems = {
                    ...cartItems,
                    [targetProduct.id] : targetProduct
                };
                cartItems[targetProduct.id].available +=1;
                cartItems[targetProduct.id].availableInCart -=1;
            }else{*/
                cartItems[targetProduct.id].available +=1;
                cartItems[targetProduct.id].availableInCart -=1;
                targetProduct.available += 1;
                targetProduct.availableInCart -= 1;
           /* }*/
        }
        if(targetProduct.availableInCart === 0){
            console.log('delete');
            delete cartItems[new_key];
        }

      /*  if(targetProduct.availableInCart === 0){
            console.log('delete');
            delete cartItems[new_key];
        }*/

        setGoodLS("productsInCart", cartItems);

        this.totalCostRamove(targetProduct);
        this.numberItemsCart();
    }
}