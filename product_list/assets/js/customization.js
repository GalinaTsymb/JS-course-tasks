!function n(o,a,i){function c(r,t){if(!a[r]){if(!o[r]){var e="function"==typeof require&&require;if(!t&&e)return e(r,!0);if(u)return u(r,!0);throw new Error("Cannot find module '"+r+"'")}e=a[r]={exports:{}};o[r][0].call(e.exports,function(t){var e=o[r][1][t];return c(e||t)},e,e.exports,n,o,a,i)}return a[r].exports}for(var u="function"==typeof require&&require,t=0;t<i.length;t++)c(i[t]);return c}({1:[function(t,e,r){"use strict";var n=t("@babel/runtime/helpers/interopRequireDefault"),c=n(t("@babel/runtime/regenerator")),o=n(t("@babel/runtime/helpers/defineProperty")),u=n(t("@babel/runtime/helpers/asyncToGenerator")),l=t("./modules/helpers"),s=t("./modules/localStorage"),f=n(t("./modules/cart"));function a(e,t){var r,n=Object.keys(e);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(e),t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)),n}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach(function(t){(0,o.default)(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}!function(){var t=document.querySelector(".js-counter-cart"),r=document.querySelector(".js-cart-list"),n=document.querySelector(".js-total-sum"),o=document.querySelector(".js-product-list"),a=[];(function(){var t=(0,u.default)(c.default.mark(function t(){return c.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:fetch("http://my-json-server.typicode.com/achubirka/db/products").then(function(t){200===t.status?t.json().then(function(t){for(var e=0;e<t.length;e++)a.push(p(p({},t[e]),{},{availableInCart:0}));(0,l.renderGoods)(a,o)}):console.log("Looks like there was a problem. Status Code: "+t.status)});case 1:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}})()();var i=new f.default("productsInCart","cartNumbers");t.textContent=(0,s.quantityInCartLS)("cartNumbers")||0,i.renderCartChange(r,n),o&&o.addEventListener("click",function(){var t=event.target;console.log("event target",t),"add"===t.dataset.action&&0<a[t.dataset.index].available&&(i.addToCart(a[t.dataset.index]),0===a[t.dataset.index].available&&(event.target.style.opacity=.5,event.target.setAttribute("disabled","true"))),i.renderCartChange(r,n)}),r&&r.addEventListener("click",function(){var t=event.target.dataset.action,e=a.findIndex(function(t){return t.id===parseInt(event.target.dataset.index)});switch(t){case"minus":i.removeFromCart(a[e],event.target.dataset.index),i.renderCartChange(r,n);break;case"plus":0<a[e].available&&i.addToCart(a[e]),i.renderCartChange(r,n);break;default:console.log("nothing")}}),window.addEventListener("storage",function(t){"productsInCart"===t.key&&(i.renderCartChange(r,n),i.numberItemsCart())})}()},{"./modules/cart":2,"./modules/helpers":3,"./modules/localStorage":4,"@babel/runtime/helpers/asyncToGenerator":6,"@babel/runtime/helpers/defineProperty":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/regenerator":11}],2:[function(t,e,r){"use strict";var n=t("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var o=n(t("@babel/runtime/helpers/defineProperty")),a=n(t("@babel/runtime/helpers/classCallCheck")),i=n(t("@babel/runtime/helpers/createClass")),c=t("./localStorage.js"),u=t("./tooltipElem");function l(e,t){var r,n=Object.keys(e);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(e),t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)),n}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach(function(t){(0,o.default)(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}r.default=function(){function r(t,e){(0,a.default)(this,r),this.productsInCart=t,this.cartNumbers=e}return(0,i.default)(r,[{key:"addToCart",value:function(t){var e=(0,c.getGoodsLS)(this.productsInCart);null!=e?null==e[t.id]?(--(e=s(s({},e),{},(0,o.default)({},t.id,t)))[t.id].available,e[t.id].availableInCart+=1):(--e[t.id].available,e[t.id].availableInCart+=1,--t.available,t.availableInCart+=1):(--t.available,t.availableInCart=1,e=(0,o.default)({},t.id,t)),(0,c.setGoodLS)("productsInCart",e),this.numberItemsCart(),this.totalCostADD(t)}},{key:"numberItemsCart",value:function(){(0,c.quantityInCartLS)(this.cartNumbers);var t=(0,c.getGoodsLS)(this.productsInCart),t=Object.values(t).reduce(function(t,e){return t+e.availableInCart},0);localStorage.setItem("cartNumbers",t),document.querySelector(".js-counter-cart").textContent=t}},{key:"renderCart",value:function(t,r){var n=this;(0,u.toolTip)(),Object.values(t).map(function(t,e){r.innerHTML+='<li class="products__cart-item">\n                                    <div>\n                                        <p class="products__name js-products-name">'.concat(t.name,'</p>\n                                        <button class="js-btn-minus" data-index="').concat(t.id,'" data-action="minus">-</button>\n                                        <span class="js-counter">').concat(t.availableInCart,'</span>\n                                        <button class="js-btn-plus" ').concat(n.toolTipPlus(t.available),' data-index="').concat(t.id,'" data-action="plus">+</button>                                        \n                                    </div>\n                                    <div>\n                                        <span class="js-sum">$').concat(t.availableInCart*t.price,"</span>\n                                    </div>                                        \n                                </li>")})}},{key:"toolTipPlus",value:function(t){if(0===t)return(0,u.toolTip)(),"data-tooltip = 'product is no longer in stock'"}},{key:"totalCostADD",value:function(t){var e=localStorage.getItem("totalCost");null!=e?(e=parseInt(e),localStorage.setItem("totalCost",e+t.price)):localStorage.setItem("totalCost",t.price)}},{key:"totalCostRamove",value:function(t){var e=localStorage.getItem("totalCost");null!=e&&(e=parseInt(e),localStorage.setItem("totalCost",e-t.price))}},{key:"displayCard",value:function(t,e){var r=(0,c.getGoodsLS)(this.productsInCart),n=localStorage.getItem("totalCost");r&&t&&this.renderCart(r,t),e.innerHTML=n}},{key:"renderCartChange",value:function(t,e){t.innerHTML="",this.displayCard(t,e)}},{key:"removeFromCart",value:function(t,e){var r=e;console.log("key",r);e=(0,c.getGoodsLS)(this.productsInCart);console.log("cartItems",e),0<t.availableInCart&&(console.log("no delete"),e[t.id].available+=1,--e[t.id].availableInCart,t.available+=1,--t.availableInCart),0===t.availableInCart&&(console.log("delete"),delete e[r]),(0,c.setGoodLS)("productsInCart",e),this.totalCostRamove(t),this.numberItemsCart()}}]),r}()},{"./localStorage.js":4,"./tooltipElem":5,"@babel/runtime/helpers/classCallCheck":7,"@babel/runtime/helpers/createClass":8,"@babel/runtime/helpers/defineProperty":9,"@babel/runtime/helpers/interopRequireDefault":10}],3:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.renderGoods=function(t,e){t=t.map(function(t,e){return'<li class="products__item">\n                       <p class="products__name js-products-name">'.concat(t.name,'/p>\n                       <p class="products__price">$<span class="js-products-price"> ').concat(t.price,'</span></p>\n                       <button type="button" data-action="add" ').concat(function(t){if(0===t)return"disabled"}(t.available),' data-index="').concat(e,'" class="btn-add products__btn-add js-add-btn ').concat(function(t){if(0===t)return"availableNull"}(t.available),'">add</button>\n                </li>')}).join("");e.innerHTML=t}},{}],4:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.getGoodsLS=function(t){t=localStorage.getItem(t);return t=JSON.parse(t)},r.quantityInCartLS=function(t){t=localStorage.getItem(t);return t=parseInt(t)},r.setQuantityLS=function(t,e){localStorage.setItem(t,e)},r.setGoodLS=function(t,e){localStorage.setItem("productsInCart",JSON.stringify(e))}},{}],5:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.toolTip=function(){var o;document.onmouseover=function(t){var e,r=t.target,n=r.dataset.tooltip;n&&((o=document.createElement("div")).className="tooltip",o.innerHTML=n,document.body.append(o),t=(e=r.getBoundingClientRect()).left+(r.offsetWidth-o.offsetWidth)/2,(n=e.top-o.offsetHeight-5)<0&&(n=e.top+r.offsetHeight+5),o.style.left=(t=t<0?0:t)+"px",o.style.top=n+"px")},document.onmouseout=function(t){o&&(o.remove(),o=null)}}},{}],6:[function(t,e,r){function u(t,e,r,n,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}e.exports=function(c){return function(){var t=this,i=arguments;return new Promise(function(e,r){var n=c.apply(t,i);function o(t){u(n,e,r,o,a,"next",t)}function a(t){u(n,e,r,o,a,"throw",t)}o(void 0)})}},e.exports.default=e.exports,e.exports.__esModule=!0},{}],7:[function(t,e,r){e.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},e.exports.default=e.exports,e.exports.__esModule=!0},{}],8:[function(t,e,r){function n(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}e.exports=function(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t},e.exports.default=e.exports,e.exports.__esModule=!0},{}],9:[function(t,e,r){e.exports=function(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t},e.exports.default=e.exports,e.exports.__esModule=!0},{}],10:[function(t,e,r){e.exports=function(t){return t&&t.__esModule?t:{default:t}},e.exports.default=e.exports,e.exports.__esModule=!0},{}],11:[function(t,e,r){e.exports=t("regenerator-runtime")},{"regenerator-runtime":12}],12:[function(t,e,r){e=function(i){"use strict";var u,t=Object.prototype,l=t.hasOwnProperty,e="function"==typeof Symbol?Symbol:{},n=e.iterator||"@@iterator",r=e.asyncIterator||"@@asyncIterator",o=e.toStringTag||"@@toStringTag";function a(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{a({},"")}catch(t){a=function(t,e,r){return t[e]=r}}function c(t,e,r,n){var o,a,i,c,e=e&&e.prototype instanceof y?e:y,e=Object.create(e.prototype),n=new I(n||[]);return e._invoke=(o=t,a=r,i=n,c=f,function(t,e){if(c===d)throw new Error("Generator is already running");if(c===h){if("throw"===t)throw e;return _()}for(i.method=t,i.arg=e;;){var r=i.delegate;if(r){var n=function t(e,r){var n=e.iterator[r.method];if(n===u){if(r.delegate=null,"throw"===r.method){if(e.iterator.return&&(r.method="return",r.arg=u,t(e,r),"throw"===r.method))return v;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}n=s(n,e.iterator,r.arg);if("throw"===n.type)return r.method="throw",r.arg=n.arg,r.delegate=null,v;var n=n.arg;if(!n)return r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v;{if(!n.done)return n;r[e.resultName]=n.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=u)}r.delegate=null;return v}(r,i);if(n){if(n===v)continue;return n}}if("next"===i.method)i.sent=i._sent=i.arg;else if("throw"===i.method){if(c===f)throw c=h,i.arg;i.dispatchException(i.arg)}else"return"===i.method&&i.abrupt("return",i.arg);c=d;n=s(o,a,i);if("normal"===n.type){if(c=i.done?h:p,n.arg!==v)return{value:n.arg,done:i.done}}else"throw"===n.type&&(c=h,i.method="throw",i.arg=n.arg)}}),e}function s(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}i.wrap=c;var f="suspendedStart",p="suspendedYield",d="executing",h="completed",v={};function y(){}function b(){}function m(){}var g={};g[n]=function(){return this};e=Object.getPrototypeOf,e=e&&e(e(L([])));e&&e!==t&&l.call(e,n)&&(g=e);var C=m.prototype=y.prototype=Object.create(g);function w(t){["next","throw","return"].forEach(function(e){a(t,e,function(t){return this._invoke(e,t)})})}function x(i,c){var e;this._invoke=function(r,n){function t(){return new c(function(t,e){!function e(t,r,n,o){t=s(i[t],i,r);if("throw"!==t.type){var a=t.arg,r=a.value;return r&&"object"==typeof r&&l.call(r,"__await")?c.resolve(r.__await).then(function(t){e("next",t,n,o)},function(t){e("throw",t,n,o)}):c.resolve(r).then(function(t){a.value=t,n(a)},function(t){return e("throw",t,n,o)})}o(t.arg)}(r,n,t,e)})}return e=e?e.then(t,t):t()}}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function I(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function L(e){if(e){var t=e[n];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var r=-1,t=function t(){for(;++r<e.length;)if(l.call(e,r))return t.value=e[r],t.done=!1,t;return t.value=u,t.done=!0,t};return t.next=t}}return{next:_}}function _(){return{value:u,done:!0}}return((b.prototype=C.constructor=m).constructor=b).displayName=a(m,o,"GeneratorFunction"),i.isGeneratorFunction=function(t){t="function"==typeof t&&t.constructor;return!!t&&(t===b||"GeneratorFunction"===(t.displayName||t.name))},i.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,a(t,o,"GeneratorFunction")),t.prototype=Object.create(C),t},i.awrap=function(t){return{__await:t}},w(x.prototype),x.prototype[r]=function(){return this},i.AsyncIterator=x,i.async=function(t,e,r,n,o){void 0===o&&(o=Promise);var a=new x(c(t,e,r,n),o);return i.isGeneratorFunction(e)?a:a.next().then(function(t){return t.done?t.value:a.next()})},w(C),a(C,o,"Generator"),C[n]=function(){return this},C.toString=function(){return"[object Generator]"},i.keys=function(r){var t,n=[];for(t in r)n.push(t);return n.reverse(),function t(){for(;n.length;){var e=n.pop();if(e in r)return t.value=e,t.done=!1,t}return t.done=!0,t}},i.values=L,I.prototype={constructor:I,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=u,this.done=!1,this.delegate=null,this.method="next",this.arg=u,this.tryEntries.forEach(O),!t)for(var e in this)"t"===e.charAt(0)&&l.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=u)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(r){if(this.done)throw r;var n=this;function t(t,e){return a.type="throw",a.arg=r,n.next=t,e&&(n.method="next",n.arg=u),!!e}for(var e=this.tryEntries.length-1;0<=e;--e){var o=this.tryEntries[e],a=o.completion;if("root"===o.tryLoc)return t("end");if(o.tryLoc<=this.prev){var i=l.call(o,"catchLoc"),c=l.call(o,"finallyLoc");if(i&&c){if(this.prev<o.catchLoc)return t(o.catchLoc,!0);if(this.prev<o.finallyLoc)return t(o.finallyLoc)}else if(i){if(this.prev<o.catchLoc)return t(o.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return t(o.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;0<=r;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&l.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}var a=(o=o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc?null:o)?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,v):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;0<=e;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),O(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;0<=e;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n,o=r.completion;return"throw"===o.type&&(n=o.arg,O(r)),n}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:L(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=u),v}},i}("object"==typeof e?e.exports:{});try{regeneratorRuntime=e}catch(t){Function("r","regeneratorRuntime = r")(e)}},{}]},{},[1]);