const page = document.querySelector('body');

const calcContainer = document.createElement('div');
const calcDisplay = document.createElement('div');
const calcOpDisplay = document.createElement('div');
const calcNumberDisplay = document.createElement('div');
const calcBtnContainer = document.createElement('div');

calcContainer.classList.add('calculator');
calcDisplay.classList.add('display');
calcOpDisplay.classList.add('currOperator');
calcNumberDisplay.classList.add('currNumber');
calcBtnContainer.classList.add('buttons');

page.append(calcContainer);
calcContainer.append(calcDisplay, calcBtnContainer);
calcDisplay.append(calcOpDisplay, calcNumberDisplay);

let nums = [4, 5, 6, 8, 9, 10, 12, 13, 14, 17];
let numsContent = [];

let opBtns = {
    sideBtns: [11, 15, 19],
    topBtns: [0, 1, 2, 3, 7],
    negPos: [16, 18],
}

let opContent = {
    sideContent: ['-', '+', '='],
    topContent: ['%', 'C', '<-', '/', '*'],
    negPosPeriod: ['-/+', '.'],
}

// Create 4x5 grid square for Calculator buttons
for (i = 1; 20 >= i; i++) {
    const btn = document.createElement('div');
    btn.classList.add('calcBtn', `${i}`);
    calcBtnContainer.append(btn);
}

const btnSelect = document.querySelectorAll('.calcBtn');
const currNum = document.querySelector('.currNumber');
const currOp = document.querySelector('.currOperator');

currNum.innerText = '0';

operatorClass(opBtns);
operatorContent(opBtns, opContent);
numberClassContent(nums, numsContent);

const negativePositive = document.querySelector('.negPos');

let operation = [];
let currOperators = [];
let total = 0;
let next = 0;

btnSelect.forEach(btn => btn.addEventListener('click', () => {
    btn.className.includes('operator') ? operatorFNC(btn) : numberCheck(btn);
}))

const performMath = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
    '%': (x, y) => x % y,
}

function operateEval(value) {
    if(value.innerText !== '=') {
        currOp.innerText = currOperators[0];
    } else {
        currOperators = [];
        currOp.innerText = '';
    }

    currNum.innerText = total;
    operation = [];
    next = 0;
} 

function operate(currValue) {
        if (operation[0] == 0 && currOperators[0] == '/') {
            clear();
            currNum.innerText = 'Nice try; not today!';
        }

        if (total == 0 && operation[1]) {
            total = performMath[currOperators[0]](Number(operation[0]), Number(operation[1]));

            operateEval(currValue);

        } else if (total > 0 || total < 0 && operation[0]) {
            total = performMath[currOperators[0]](total, Number(operation[0]));

            operateEval(currValue);
        }
}

function operatorFNC(op) {
        if (currNum.innerText == 'Nice try; not today!') {
            return;
        }
    // Store number value and reset display for next number
        if (!(operation[0]) && currNum.innerText !== '' && total == 0) {
            operation.push(currNum.innerText);
            currNum.innerText = '';
        }

    // Assign operator to display and also store same operator
        if (currOp.innerText == '' && !(currOperators[0]) && total == 0) {
            currOp.innerText = op.innerText;
            currOperators.push(op.innerText);
        } else if (currOp.innerText == '' && !(currOperators[0]) && total !== 0) {
            currOp.innerText = op.innerText;
            currOperators.push(op.innerText);
        } else if (operation.length == 0 && total == 0) {
            operation.push(currNum.innerText);
        } else if (currNum.innerText !== '') {
            operation.push(currNum.innerText);
            operate(op);
        } else {
            return;
        }
}

function numberCheck(num) {
    const classNames = ['number', 'decimal'];
    classNames.some(className => num.classList.contains(className)) ? numPopulate(num) : checkOP(num);
}

function nextNumber(num) {
    currNum.innerText = num.innerText;
    next = 1;
}

// Populates number display and continues the operation if an operator was called upon current number
function numPopulate(num) {
    if (currNum.innerText == 'Nice try; not today!') {
        return;
    } else if (total > 0 && !(currOperators[0])) {
        return;
    }

    if (currNum.innerText.includes('.') && num.innerText == '.') {
        return;
    }

    if (currNum.innerText == '0') {
        currNum.innerText = num.innerText
    } else if (!(currOperators[0]) && total == 0) {
        currNum.innerText += num.innerText;
    } else if (total == 0) {
        currNum.innerText += num.innerText
    } else if (total != 0 && currOperators[0]) {
        (next == 0 && currNum.innerText == total || currNum.innerText == -(total)) ? nextNumber(num) : currNum.innerText += num.innerText;
    }   
}

function checkOP(value) {
        if (value.innerText == 'C') {
            clear()
        } else if (value.innerText == '<-') {
            backspace();
        } else if (value.innerText == '=' && currNum.innerText !== '' && currOperators[0] && total !== 0 || operation[0]) {
            operation.push(currNum.innerText);
            operate(value);
        } else if (value.innerText == '-/+') {
            numberNegPos();
        } else {
            return;
        }
}

function softClear(value) {
        currOp.innerText = '';
        currNum.innerText = value.innerText;
}

function clear() {
        operation = [];
        currOperators = [];
        total = 0;
        currNum.innerText = '0';
        currOp.innerText = '';
}

function numberNegPos() {
        let str = currNum.innerText;

        if (currNum.innerText == 'Nice try; not today!') {
            return;
        }
        
        if (total != 0) {
            if (str.charAt(0) != '-' && str.charAt(0) != 0) {
                let neg = '-' + str;
                currNum.innerText = neg;
                if (currNum.innerText == total || currNum.innerText == -(total)) {
                    total = currNum.innerText;
                }
            } else if (str.charAt(0) != 0) {
                let pos = str.slice(1);
                currNum.innerText = pos;
                if (currNum.innerText == total || currNum.innerText == -(total)) {
                    total = currNum.innerText;
                }
            } else {
                return;
            }
        }
}

function backspace() {
    if (currNum.innerText == 'Nice try; not today!') {
        return;
    }

    let currValue = currNum.innerText;
    currNum.innerText = currValue.slice(-currValue.length, -1);

}

function numberClassContent(number, content) {
    // Loop to iterate 10 numbers into empty array numsContent
    for (i = 1; i <= 10; i++) {
        (i == 10) ? numsContent.push('0') : numsContent.push(`${i}`);
    }

    for (i = 0; nums.length > i; i++) {
        btnSelect[number[i]].classList.add('number');
        btnSelect[number[i]].innerText = content[i];
    }
}

// Assigning classes to the operator buttons
function operatorClass(btnClasses) {
    for (let key in btnClasses) {
        for (let i = 0; btnClasses[key].length > i; i++) {
            if (btnClasses[key][i] == 19) {
                btnSelect[btnClasses[key][i]].classList.add('equals');
            } else if (btnClasses[key][i] == 18) {
                btnSelect[btnClasses[key][i]].classList.add('decimal');
            } else if (btnClasses[key][i] == 16) {
                btnSelect[btnClasses[key][i]].classList.add('negPos');
            } else if (btnClasses[key][i] == 2) {
                btnSelect[btnClasses[key][i]].classList.add('back');
            } else if (btnClasses[key][i] == 1) {
                btnSelect[btnClasses[key][i]].classList.add('clear');
            } else {
                btnSelect[btnClasses[key][i]].classList.add('operator');
            }
        }
    }
}

// Assigning content to operator buttons
function operatorContent (btnClasses, btnContent) {
    for (let key in btnClasses) {
        if (btnClasses[key] == btnClasses.sideBtns) {
            for (i = 0; btnClasses[key].length > i; i++)
                btnSelect[btnClasses[key][i]].innerText = btnContent.sideContent[i];
        } else if (btnClasses[key] == btnClasses.negPos) {
            for (i = 0; btnClasses[key].length > i; i++)
                btnSelect[btnClasses[key][i]].innerText = btnContent.negPosPeriod[i];
        } else { // Top content
            for (i = 0; btnClasses[key].length > i; i++)
                btnSelect[btnClasses[key][i]].innerText = btnContent.topContent[i];
        }
    }
}