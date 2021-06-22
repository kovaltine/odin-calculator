//add keyboard support

//load the dom
const numbers = document.querySelectorAll('.number');
const newDisplay = document.querySelector('#display');
const operands = document.querySelectorAll('.operand');
const equals = document.querySelector('#equals');
const clear = document.querySelector('#AC');
const decimal = document.querySelector('#decimal');
const remove = document.querySelector('#del');

//add event listeners to the buttons
numbers.forEach(number => number.addEventListener('click', modifyDisplay))
operands.forEach(operand => operand.addEventListener('click', modifyDisplay))
decimal.addEventListener('click', addDecimal)
equals.addEventListener('click', getEquals)
clear.addEventListener('click', clearDisplay);
remove.addEventListener('click', delItem);

// delete a single item from the display
function delItem() {
    newDisplay.textContent = newDisplay.textContent.toString().slice(0, -1)
    if (newDisplay.textContent == '') {
        return newDisplay.textContent = 0
    } else {
        return newDisplay.textContent
    }
}

//could make decimal its own function
function addDecimal(e) {
    let display = newDisplay.textContent;
    let arrDisplay = [...display];
    let regex = /(\+|-|\*|\/|=)/
    let decimal = e.target.textContent;

    if (display == '0') {
        return newDisplay.textContent = display + decimal;
        // if there is no decimal in the whole display, can just go ahead and add one
    } else if (!display.includes(decimal)) {
        return newDisplay.textContent = display + decimal
    } else if (display.match(regex)) {
        // check if the display has an operand
        // find which operand it is
        let operand = findOperand(arrDisplay)
        // find the index of that operand in the display
        let operandIndex = arrDisplay.indexOf(operand)
        let start = operandIndex + 1
        // isolate the second number
        let numberArr = findNumber(start, arrDisplay.length, arrDisplay)
        // check if it contains a decimal
        if (numberArr.includes(decimal)) {
            return;
        } else {
            return newDisplay.textContent = display + decimal
        }

    } else {
        // if we're working with the first number
        number = display
        if (!number.includes(decimal)) {
            return newDisplay.textContent = display + decimal
        } else {
            return
        }
    }
}

// update the display with either numbers or operators
function modifyDisplay(e) {
    let display = newDisplay.textContent;
    let arrDisplay = [...display];
    let newNum = e.target.id;
    let regex = /^(\+|-|\*|\/|=)$/
    if (display == '0') {
        return newDisplay.textContent = newNum
    } else if (arrDisplay[arrDisplay.length - 1].match(regex) && e.target.id.match(regex)) {
        return newDisplay.textContent
    } else {
        return newDisplay.textContent = display + newNum;
    }
}

// go through the items in the array and find the operand
function findOperand(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == '/') {
            return arr[i]
        } else if (arr[i] == '*') {
            return arr[i]
        } else if (arr[i] == '+') {
            return arr[i]
        } else if (arr[i] == '-') {
            return arr[i]
        }
    }

}

// puts separate numbers into their own array
function findNumber(start, index, arr) {
    let numArr = [];
    for (let i = start; i < index; i++) {
        numArr.push(arr[i])
    }
    return numArr
}

// separates the display into numbers and operand, sends info to operate()
function getEquals() {
    let display = newDisplay.textContent;
    let arrDisplay = [...display];
    let operand = findOperand(arrDisplay)
    if (!operand) {
        return;
    }

    //find the location of the operand in the string and use that to isolate the numbers
    let operandIndex = arrDisplay.indexOf(operand)
    let firstArr = findNumber(0, operandIndex, arrDisplay)
    let first = parseFloat(firstArr.join(''))

    //start of the second number is one past the operand
    let secondStart = operandIndex + 1

    // this index is the end of the second number
    let secondEnd = arrDisplay.length
    let secondArr = findNumber(secondStart, secondEnd, arrDisplay)
    let second = parseFloat(secondArr.join(''))
    //perform the operations
    return operate(first, operand, second)
}

// clears the display
function clearDisplay() {
    return newDisplay.textContent = 0;
}

//update the display to the answer using basic calculations
function operate(a, operator, b) {
    // store the answer in the result variable
    let result;
    if (operator == '+') {
        result = add(a, b);
    } else if (operator == '-') {
        result = subtract(a, b);
    } else if (operator == '*') {
        result = multiply(a, b);
    } else if (operator == '/') {
        result = divide(a, b);
    } else {
        return
    }
    // update display
    return newDisplay.textContent = result
}

// basic calculations
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    if (b == 0) {
        console.log('that won\'t work')
        return;
    }
    return a / b;
}