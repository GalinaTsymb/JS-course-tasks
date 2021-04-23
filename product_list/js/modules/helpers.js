/**
 * show goods
 * @param goods
 * @param selector
 */
export function renderGoods(goods, selector){

    let show = goods.map(function(value, index){

        return `<li class="products__item">
                       <p class="products__name js-products-name">${value.name}/p>
                       <p class="products__price">$<span class="js-products-price"> ${value.price}</span></p>
                       <button type="button" data-action="add" ${checkNullDisabled(value.available)} data-index="${index}" class="btn-add products__btn-add js-add-btn ${checkNullOpacity(value.available)}">add</button>
                </li>`;
    }).join("");
    selector.innerHTML = show;
}

/**
 * inserts attribute "disabled" in tag button, if available = 0
 * @param value
 * @returns {string}
 */
function checkNullDisabled(value) {
    if(value === 0)
        return 'disabled';
}

/**
 * inserts class "availableNull" in tag button, if available = 0
 * @param value
 * @returns {string}
 */
function checkNullOpacity(value){
    if(value === 0)
        return 'availableNull';
}

