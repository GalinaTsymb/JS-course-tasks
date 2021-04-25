/**
 * status fetch
 * @param response
 * @returns {Promise<never>|Promise<unknown>}
 */
export function status (response) {
    if (response.status !== 200) {
        return Promise.reject(new Error(response.statusText))
    }
    return Promise.resolve(response)
}

/**
 * return json from fetch
 * @param response
 * @returns {*|Promise<any>}
 */
export function json (response) {
    return response.json()
}

/**
 * checks the object for emptiness
 * @param obj
 * @returns {boolean}
 */
export function isEmptyObject (obj) {
     return Object.keys(obj).length === 0;
}

/**
 * synchronizes the incoming data with the data in the shopping cart
 * @param data
 * @param cart
 * @returns {*|Uint8Array|BigInt64Array|any[]|Float64Array|Int8Array|Float32Array|Int32Array|Uint32Array|Uint8ClampedArray|BigUint64Array|Int16Array|Uint16Array}
 */
export function updateBalances(data, cart){
    let new_data = data.map(value => {
        let item = cart[value.id];

        if(item){
            return item;
        }
        return value;
    });
    return new_data;
}

