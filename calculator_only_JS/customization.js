import Calculator from './modules/calculator.js';

let symbols = prompt('Enter expression to calculate!   Example: 2+2+3 or 20%100 or 2+3*6', );

const CALCULATOR = new Calculator(symbols);

let result = CALCULATOR.init();

result === undefined ?alert(`Result: ${0}`):alert(`Result: ${result}`);


