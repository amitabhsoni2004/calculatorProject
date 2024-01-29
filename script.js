document.querySelectorAll('.num').forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

const display = document.querySelector('.text');
let currentInput = '';
let previousInput = '';
let operation = null;

function handleButtonClick(event) {
    const target = event.target.closest('.num');

    if (!target) return;

    const buttonText = target.innerText;

    

    if (buttonText.match(/[0-9.]/)) {
        handleNumber(buttonText);
    } else if (buttonText === 'C') {
        handleClear();
    } else if (buttonText === 'CE') {
        handleClearEntry();
    } else if (buttonText === 'x') {
        handleBackspace();
    } else if (buttonText === '=') {
        handleEquals();
    } else if (buttonText === '1/x') {
        handleReciprocal();
    } else if (buttonText === 'x^2') {
        handleSquare();
    } else if (buttonText === '2√x') {
        handleSquareRoot();
    } else if (buttonText === '%') {
        handlePercentage();
    } else {
        handleOperation(buttonText);
    }
}

// ... (rest of your code remains unchanged)


function handleNumber(number) {
    if (currentInput.length <= 10) {
        currentInput += number;
        display.innerText = currentInput;
    }
}

function handleOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        handleEquals();
    }
    operation = op;
    previousInput = currentInput;
    currentInput = '';
    display.innerText = `${previousInput} ${operation}`;
}

function handleEquals() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '÷':
            computation = prev / current;
            break;
        default:
            return;
    }
    currentInput = computation.toString();
    operation = undefined;
    previousInput = '';
    display.innerText = currentInput;
}

function handleClear() {
    currentInput = '';
    previousInput = '';
    operation = null;
    display.innerText = '0';
}

function handleClearEntry() {
    currentInput = '';
    display.innerText = '0';
}

function handleBackspace() {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        display.innerText = currentInput || '0';
    }
}

function handleReciprocal() {
    const value = parseFloat(currentInput);
    if (!isNaN(value) && value !== 0) {
        currentInput = (1 / value).toString();
        display.innerText = currentInput;
    }
}

function handleSquare() {
    const value = parseFloat(currentInput);
    if (!isNaN(value)) {
        currentInput = (value * value).toString();
        display.innerText = currentInput;
    }
}

function handleSquareRoot() {
    const value = parseFloat(currentInput);
    if (!isNaN(value) && value >= 0) {
        currentInput = Math.sqrt(value).toString();
        display.innerText = currentInput;
    }
}

function handlePercentage() {
    const value = parseFloat(currentInput);
    if (!isNaN(value)) {
        currentInput = (value / 100).toString();
        display.innerText = currentInput;
    }
}