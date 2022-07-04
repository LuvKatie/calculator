const page = document.querySelector('body');

const calcContainer = document.createElement('div');
const calcDisplay = document.createElement('div');
const calcBtnContainer = document.createElement('div');

calcContainer.classList.add('calculator');
calcDisplay.classList.add('display');
calcBtnContainer.classList.add('buttons');

page.append(calcContainer);
calcContainer.append(calcDisplay, calcBtnContainer);

let topBtns = [0, 1, 2, 3, 4, 5, 6, 7];
let sideBtns = [11, 15, 19];
let sideBtnContent = ['-', '+', '='];

for (i = 1; 20 >= i; i++) {
    const btn = document.createElement('div');
    btn.classList.add('calcBtn', `${i}`);
    calcBtnContainer.append(btn);
}

const btnSelect = document.querySelectorAll('.calcBtn');

// Assigning classes to top section of operators
for (let i = 0; 8 > i; i++) {
    btnSelect[topBtns[i]].classList.add('operator');
};

// Assigning classes to side operator buttons, and a separate one for the Equals button
for (let i = 0; 3 > i; i++) {
    if (i < 2) {
        btnSelect[sideBtns[i]].classList.add('operator');
    } else {
        btnSelect[sideBtns[i]].classList.add('equals');
    }


// Setting the innerText of side buttons or the content.
    btnSelect[sideBtns[i]].innerText = sideBtnContent[i]
};