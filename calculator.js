//Keep track of math
let runningTotal = 0;
//Keep track of number buttons that clicked on screen
let buffer = "0";
//Keep track of operator buttons that clicked
let previousOperator = null;

//Grab Screen
const screen = document.querySelector('.screen');

//Handles clicked buttons
function buttonClick(value) {
    if (isNaN(value)) {
        //not Number
        handleOperator(value);

    } else {
        //is number
        handleNumber(value);

    }
    screen.innerText = buffer;

}
//Handles operator other than math operators
function handleOtherOperator(operator) {
    switch (operator) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if (previousOperator === null) {
                //do nothing
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
    }

}
//Handles math operators
function handleOperator(operator) {

    switch (operator) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if (previousOperator === null) {
                //do nothing
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '-':
        case '×':
        case '/':
            handleMath(operator);
            break;

    }

}

// Getting ready for real math
function handleMath(operator) {
    if (buffer === '0') {
        //do nothing
        return;
    }
    //Converting to int to do math
    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);

    }

    previousOperator = operator;
    buffer = "0";
}
//Doing real math
function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer

    } else if (previousOperator === '-') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }


}
//Handles clicked number
function handleNumber(numStr) {
    if (buffer === "0") {
        buffer = numStr
    } else {
        buffer += numStr;
    }
}

//like Main Method
function init() {
    document.querySelector('.calc-buttons')
        .addEventListener('click', function(event) {
            buttonClick(event.target.innerText);
        });
}

init();