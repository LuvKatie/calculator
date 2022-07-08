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
    topContent: ['%', 'C', '<-', '/', 'x'],
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

btnSelect.forEach(btn => btn.addEventListener('click', () => {
    btn.className.includes('operator') ? oneOperatorCheck(btn) : numberCheck(btn);
}))

function oneOperatorCheck(op) {
        if (currOp.innerText == '') {
            currOp.innerText = op.innerText;
        }
}

function numberCheck(num) {
    const classNames = ['number', 'decimal'];
    classNames.some(className => num.classList.contains(className)) ? numPopulate(num) : checkOP(num);
}

function numPopulate(num) {
    if(currNum.innerText == '0') {
        currNum.innerText = num.innerText
    } else {
        currNum.innerText += num.innerText
    }
}

function checkOP(value) {
        value.innerText == 'C' ? clear() : numberNegPos();
}

function clear() {
        operation = [];
        currOperators = [];
        currNum.innerText = '0';
        currOP.innerText = '';
}

function numberNegPos() {
        let str = currNum.innerText;
        if (str.charAt(0) != '-') {
            let neg = '-' + str;
            currNum.innerText = neg;
        } else {
            let pos = str.slice(1);
            currNum.innerText = pos;
        }
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