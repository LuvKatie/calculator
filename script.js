const page = document.querySelector('body');

const calcContainer = document.createElement('div');
const calcDisplay = document.createElement('div');
const calcBtnContainer = document.createElement('div');

calcContainer.classList.add('calculator');
calcDisplay.classList.add('display');
calcBtnContainer.classList.add('buttons');

page.append(calcContainer);
calcContainer.append(calcDisplay, calcBtnContainer);

let btnContent = [];
let topBtns = [0, 1, 2, 3, 4, 5, 6, 7];
let sideBtns = [11, 15, 19];

for (i = 1; 20 >= i; i++) {
    const btn = document.createElement('div');
    btn.classList.add('calcBtn', `${i}`);
    calcBtnContainer.append(btn);
}

const btnSelect = document.querySelectorAll('.calcBtn');

// Sets a background color to first 8 divs within the Calculator Buttons
for (let i = 0; 8 > i; i++) {
    btnSelect[topBtns[i]].style.backgroundColor = '#F8F8FF';
};
// Sets background for the right side Calculator Buttons
for (let i = 0; 3 > i; i++) {
    if (i < 2) {
    btnSelect[sideBtns[i]].style.backgroundColor = '#F8F8FF';
    } else {
    btnSelect[sideBtns[i]].style.backgroundColor = '#FFB6C1';
    }
};