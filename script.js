/*

User clicks button number display on main
if  user initial click not button number, nothing happens

Once user clicks button operator, move number and operator to top display, get first operand and operator

(if user clicks back button, erase last number input, if no number on main, nothing happens)
(if user clicks clear, remove everything on display)
(if customer clicked ., check if operand already has ., if true nothing happens, if false add .)

if user did not enter a number yet but clicked another operator, replace previous operator with new one. If user already has a number entered, perform operation and make it first operand and get the new operator.

if user entered second operand and clicked equal, perform operation and end process.

*/

let buttons = document.querySelectorAll('#main-body .button-cntnr');
let mainDisplay = document.querySelector('#main-display span');
let topDisplay = document.querySelector('#top-display span');
let firstOperand = '';
let secondOperand = '';
let selectedOprtr = '';

buttons.forEach( (button) => {
    button.addEventListener('click', () => {
        operate(button);
    });
});

function operate(button) {
    console.log(mainDisplay.textContent.length)
    if(mainDisplay.textContent.length == 14) {
        mainDisplay.style.fontSize = '.9em';
    }
    switch(button.dataset.type) {
        case "number":
            if(firstOperand.length <= 16) {
                if(button.dataset.value == "." && !firstOperand.includes(".")) {
                    firstOperand += button.dataset.value;
                    mainDisplay.textContent += button.dataset.value;
                } else if(button.dataset.value != ".") {
                    firstOperand += button.dataset.value;
                    mainDisplay.textContent += button.dataset.value;
                }
            }
            break;
        case "operator":
            if(button.dataset.value == "%") {
                let operandLength = mainDisplay.textContent.length
                if(mainDisplay.textContent.charAt(operandLength - 1) == ".") {
                    mainDisplay.textContent = mainDisplay.textContent.slice(0, operandLength - 1);
                    firstOperand = mainDisplay.textContent.slice(0, operandLength - 1);
                }
                topDisplay.textContent = mainDisplay.textContent;
                break;
            }
    }
}