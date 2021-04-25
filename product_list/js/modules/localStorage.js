
export function getProductsLS(key){
    let cartItems = localStorage.getItem(key);
    cartItems = JSON.parse(cartItems) || {};
    return cartItems;
}
export function setProductsLS(key,cartItems){
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}


export function quantityInCartLS(key){
    let quantityInCart = localStorage.getItem(key);
    quantityInCart = parseInt(quantityInCart);
    return quantityInCart;
}
export function setQuantityLS(key, quentity){
    localStorage.setItem(key, quentity);
}

