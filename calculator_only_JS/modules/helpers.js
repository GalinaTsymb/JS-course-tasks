/**
 * check incoming data from the user, only numbers and arithmetic signs
 * @param str
 * @returns {void|*}
 */
export function checkString(str){

    if(!/[0-9]|\+|\-|\/|\*|\%/.test(str)) return alert("invalid expression format");

    return str;
}


