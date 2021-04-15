import {
    checkString

} from "./helpers.js";

export default class Calculator{

    constructor(userString) {
        this.userString = checkString(userString);
    }

    /**
     *  parse the string, using the split method, through a regular expression, while the separator remains
     *  Next, we iterate over the array (map) where the numbers in the array are converted to Number
     * @returns {any[]}
     */
    parseCalculationString() {
        //checks value on null, undefined or ''
        if (this.userString === null || this.userString === '' || this.userString === undefined) return;


        let array = this.userString.split(/(\+|\-|\/|\*|\%)/).map((currentNumber, index) =>
            index % 2 === 0 ? Number(currentNumber):currentNumber);

    return array;
    }

    /**
     * method multiplication
     * @param a
     * @param b
     * @returns {number}
     */

    multiplication(a, b){
        return (a * b);
    }

    /**
     * method subtraction
     * @param a
     * @param b
     * @returns {number}
     */

    subtraction(a, b){
        return (a - b);
    }

    /**
     * method additions
     * @param a
     * @param b
     * @returns {*}
     */
    additions(a, b){
        return a + b;
    }

    /**
     * method division, check division by zero
     * @param a
     * @param b
     * @returns {number}
     */
    division (a, b){
        if(b === 0) return alert ('you cannot divide by zero');
        return a/b;
    }

    /**
     * method percentage of the number
     * @param a
     * @param b
     * @returns {number}
     */
    percentage(a, b){
        return a / 100 * b;
    }

    /**
     * method of calculating operations
     */
    calculatorOperations(){

        //take a parsed string
        let expression  = this.parseCalculationString();
        //checks date on null, undefined or ''
        if (expression === null || expression === '' || expression === undefined) return;

        let result      = []; // variable for save result
        let currentOperation; // variable for current operating

        //an array of objects in which the key is - arithmetic signs and value is - method name
        // Important!!! The order of placing objects, the priority of the operation depends on it
        let operations  = [{'%': this.percentage},
                          {'*': this.multiplication, '/': this.division},
                          {'+': this.additions, '-': this.subtraction}];
        //loop by array 'operations'
        for (let i = 0; i < operations .length; i++) {
            // loop by array (parsed string)
            for (let j = 0; j < expression.length; j++) {
                //condition for finding an array element 'operations' in an array 'expression'
                //operations[i] - accessing the key of an element(object) in an array 'operations'
                //[expression[j]] - accessing the value of an element(object) in an array 'operations'
                if (operations[i][expression[j]]) {
                    //currentOperation saved value of an element(object) in an array 'operations' - name method
                    currentOperation = operations[i][expression[j]];
                }
                else if (currentOperation) {
                    //save the result of the method execution,
                    //necessarily result[result.length - 1] - take the previous element
                    result[result.length - 1] = currentOperation(result[result.length - 1], expression[j]);
                    //clear currentOperation
                    currentOperation = null;
                } else {
                    //add elements to the array before the sign (which did not satisfy the condition)
                    result.push(expression[j]);
                }
            }
            // saved result int the expression
            expression = result;
            // clear array result
            result = [];

        }
        //check - if the result is more than one element, then the calculations were not correct
        if ( expression.length > 1) {
            alert('it is impossible to make a calculation');
            return expression;
        } else {
           return expression[0];
        }
    }

    init() {
     return   this.calculatorOperations();
    }

}