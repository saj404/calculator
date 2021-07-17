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
let result = '';
let decimalLimit = /\./;

buttons.forEach( (button) => {
    button.addEventListener('click', () => {
        operate(button);
    });
});

function operate(button) {
    if(mainDisplay.textContent.length == 14) {
        mainDisplay.style.fontSize = '.9em';
    }
    switch(button.dataset.type) {
        case "number":
            if(result) {
                clear();
            }
            let numberCheck;
            numberCheck = checkInput(button); //checks for initial zero input
            if(numberCheck == true) {
                if(mainDisplay.textContent.length <= 16 && selectedOprtr == '') { //limits number to 16 digits and firstOperand
                    if(button.dataset.value == "." && !decimalLimit.test(mainDisplay.textContent)) { //limits to one '.'
                        mainDisplay.textContent += button.dataset.value;
                    } else if(button.dataset.value != ".") {
                        mainDisplay.textContent += button.dataset.value;
                    }
                } else if (mainDisplay.textContent.length <= 16 && selectedOprtr != '') {
                    if(button.dataset.value == "." && !decimalLimit.test(mainDisplay.textContent)) { //limits to one '.'
                        secondOperand += button.dataset.value;
                        mainDisplay.textContent += button.dataset.value;
                    } else if(button.dataset.value != ".") {
                        secondOperand += button.dataset.value;
                        mainDisplay.textContent += button.dataset.value;
                    }
                }                
            }
            break;
        case "operator":
            switch(button.dataset.value) {
                case "%":
                case "÷":
                case "x":
                case "-":
                case "+":
                    checkOperand();
                    if(secondOperand != '') {
                        secondOperand = parseFloat(secondOperand);
                        result = compute();
                        firstOperand = result;
                        result = '';
                        secondOperand = '';
                        selectedOprtr = button.dataset.value;
                        topDisplay.textContent = `${firstOperand} ${selectedOprtr}`;
                        mainDisplay.textContent = '0';
                    } else if(result == "N") {
                        clear();
                    } else if(result != '') {
                        result = '';
                        selectedOprtr = button.dataset.value;
                        topDisplay.textContent = `${firstOperand} ${selectedOprtr}`;
                        mainDisplay.textContent = '0';
                    } else {
                        selectedOprtr = button.dataset.value;
                        topDisplay.textContent = `${firstOperand} ${selectedOprtr}`;
                        mainDisplay.textContent = '0';                        
                    }
                    break;
            }
            break;
        case "special":
            switch(button.dataset.value) {
                case "c":
                    clear();
                    break;
                case "back":
                    let mainDisplayLength = mainDisplay.textContent.length;
                    if(mainDisplay.textContent != '0') {
                        mainDisplay.textContent = mainDisplay.textContent.slice(0, mainDisplayLength - 1);
                        if(mainDisplay.textContent == '') {
                            mainDisplay.textContent = '0';
                        }
                    }
                    if(result != '') {
                        clear();                      
                    } else if(firstOperand != '') {
                        secondOperand = secondOperand.slice(0, mainDisplayLength - 1);
                    }
                    break;
                case "=":
                    if(firstOperand !== '' && secondOperand !== '') {
                        secondOperand = parseFloat(secondOperand);
                        topDisplay.textContent = `${firstOperand} ${selectedOprtr} ${secondOperand}`;
                        if(selectedOprtr == "÷" && secondOperand === 0) {
                            result = "N";
                            mainDisplay.textContent = "Nice try kid.";
                        } else {
                            result = compute();
                            mainDisplay.textContent = result;
                        }
                        firstOperand = '';
                        secondOperand = '';
                        selectedOprtr = '';
                    }
                    break;
            }
            break;
    }
}

function checkInput(button) { //checks for initial zero input
    let valueResult;
    if(button.dataset.value == '0') {
        if(mainDisplay.textContent == '0') {
            if(firstOperand != '') {
                secondOperand = 0;
            }
            valueResult = false;
            return valueResult;
        } else {
            valueResult = true;
            return valueResult;
        }
    } else {
        if(mainDisplay.textContent == '0') {
            if(button.dataset.value != '.') {
                mainDisplay.textContent = '';
            }
            valueResult = true;
            return valueResult;
        }  else {
            valueResult = true;
            return valueResult;
        }
    }
}

function clear() {
    firstOperand = '';
    secondOperand = '';
    selectedOprtr = '';
    mainDisplay.textContent = '0';
    topDisplay.textContent = '';  
    result = '';
}

function checkOperand() {
    if(firstOperand == '') {
        firstOperand = parseFloat(mainDisplay.textContent);
    }
}

function compute() {
    let answer;
    if(selectedOprtr == "%") {
        answer = modulo();
    } else if(selectedOprtr == "÷") {
        answer = divide();
    } else if(selectedOprtr == "x") {
        answer = multiply();
    } else if(selectedOprtr == "-") {
        answer = subtract();
    } else if(selectedOprtr == "+") {
        answer = add();
    }
    return answer;
}

function modulo() {
    return (parseFloat(firstOperand) % parseFloat(secondOperand));
}
function divide() {
    return (parseFloat(firstOperand) / parseFloat(secondOperand));
}
function multiply() {
    return (parseFloat(firstOperand) * parseFloat(secondOperand));
}
function subtract() {
    return (parseFloat(firstOperand) - parseFloat(secondOperand));
}
function add() {
    return (parseFloat(firstOperand) + parseFloat(secondOperand));
}