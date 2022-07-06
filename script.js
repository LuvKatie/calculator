const page = document.querySelector('body');

const calcContainer = document.createElement('div');
const calcDisplay = document.createElement('div');
const calcBtnContainer = document.createElement('div');

calcContainer.classList.add('calculator');
calcDisplay.classList.add('display');
calcBtnContainer.classList.add('buttons');

page.append(calcContainer);
calcContainer.append(calcDisplay, calcBtnContainer);

let negPosPeriod = [16, 18];
let negPPContent = ['- / +', '.'];

let nums = [4, 5, 6, 8, 9, 10, 12, 13, 14, 17];
let numsContent = [];

// Loop to iterate 10 numbers into empty array numsContent
for (i = 1; i <= 10; i++) {
    (i == 10) ? numsContent.push('0') : numsContent.push(`${i}`);
}

let opBtns = {
    sideBtns: [11, 15, 19],
    topBtns: [0, 1, 2, 3, 7],
}

let opContent = {
    sideContent: ['-', '+', '='],
    topContent: ['%', 'C', '<-', '/', 'x'],
}

// Create 4x5 grid square for Calculator buttons
for (i = 1; 20 >= i; i++) {
    const btn = document.createElement('div');
    btn.classList.add('calcBtn', `${i}`);
    calcBtnContainer.append(btn);
}
const btnSelect = document.querySelectorAll('.calcBtn');

// Assigning classes to the operator buttons
function operatorClass(btnClasses) {
    for (let key in btnClasses) {
        for (let i = 0; btnClasses[key].length > i; i++) {

            if (btnClasses[key][i] == 19) {
                btnSelect[btnClasses[key][i]].classList.add('equals');
            }

            btnSelect[btnClasses[key][i]].classList.add('operator');
        }
    }
}

// Assigning content to operator buttons
function operatorContent (btnClasses, btnContent) {
    for (let key in btnClasses) {
        if (btnClasses[key] == btnClasses.sideBtns) {
            for (i = 0; btnClasses[key].length > i; i++)
                btnSelect[btnClasses[key][i]].innerText = btnContent.sideContent[i];
        } else { // Top content
            for (i = 0; btnClasses[key].length > i; i++)
                btnSelect[btnClasses[key][i]].innerText = btnContent.topContent[i];
        }
    }
}

operatorClass(opBtns);
operatorContent(opBtns, opContent);