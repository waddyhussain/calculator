function add(a, b) {
    return +a + +b;
}

function subtract(a, b) {
    return +a - +b;
}

function multiply(a, b) {
    return +a * +b;
}

function divide(a, b) {
    return +a / +b;
}

function getCurrentOperand() {
    const reference = operator === null ? 0 : 1;
    const value = operands[reference];
    return [reference, value];
}

function typeChar(char) {
    const [operandReference, operandValue] = getCurrentOperand();
    switch (char) {
        case "0":
            if (operandValue) {
                operands[operandReference] += char;
            }
            break;
        case ".":
            if (!operandValue) {
                operands[operandReference] += "0";
            }
            if (!operandValue.includes(".")) {
                operands[operandReference] += char;
            }
            break;
        default:
            operands[operandReference] += char;
    }
    updateDisplay();
}

function deleteChar() {
    const [operandReference, operandValue] = getCurrentOperand();
    operands[operandReference] = operandValue.slice(0, -1);
    updateDisplay()
}

function changeSign() {
    const [operandReference, operandValue] = getCurrentOperand();
    if (!operandValue) return;
    if (operandValue.charAt(0) === "-") {
        operands[operandReference] = operandValue.slice(1);
    } else {
        operands[operandReference] = "-" + operandValue;
    }
    updateDisplay();
}

function setOperator(operatorFunction) {
    if (getCurrentOperand()[1] === "-") return;
    if (!operands[1]) {
        operands[0] = Number(operands[0] || ans);
    } else {
        operands[0] = operator(...operands);
    }
    operator = operatorFunction;
    topText = `${operands[0]} ${operatorSymbols.get(operator)}`;
    updateDisplay();
}

function showAnswer() {
    if (operator === null || operands[1] === "-") {
        return;
    }
    ans = operator(...operands);
    
    const main = document.querySelector(".main-text");
    const top = document.querySelector(".top-text");
    main.textContent = ans;
    top.textContent = `${operands[0]} ${operatorSymbols.get(operator)} ${+operands[1]} =`;

    topText = "";
    operands[0] = "";
    operands[1] = "";
    operator = null;
}

function clear() {
    operands[0] = "";
    operands[1] = "";
    operator = null;
    ans = null;
    topText = "";
    updateDisplay();
}

function updateDisplay() {
    const main = document.querySelector(".main-text");
    const top = document.querySelector(".top-text");
    main.textContent = getCurrentOperand()[1] || "0";
    if (topText || ans === null) {
        top.textContent = topText;
    } else {
        top.textContent = `Ans: ${ans}`;
    }
}

const operatorSymbols = new Map();
operatorSymbols.set(add, "+");
operatorSymbols.set(subtract, "-");
operatorSymbols.set(multiply, "×");
operatorSymbols.set(divide, "÷");

const operands = ["", ""];
let operator = null;
let ans = null;
let topText = "";

Array.from(document.querySelectorAll("button[data-value]")).forEach(button => {
    const char = button.attributes["data-value"].value;
    button.addEventListener("click", () => typeChar(char));
});

Array.from(document.querySelectorAll(".operator")).forEach(button => {
    const operatorFunction = window[button.attributes["data-operation"].value];
    button.addEventListener("click", () => setOperator(operatorFunction));
});

document.querySelector(".clear").addEventListener("click", clear);
document.querySelector(".delete").addEventListener("click", deleteChar);
document.querySelector(".equals").addEventListener("click", showAnswer);
document.querySelector(".change-sign").addEventListener("click", changeSign);

const keyMappings = {
    "+": () => setOperator(add),
    "-": () => setOperator(subtract),
    "*": () => setOperator(multiply),
    "/": () => setOperator(divide),
    "=": showAnswer,
    "Enter": showAnswer,
    "Backspace": deleteChar,
    "Escape": clear
}

window.addEventListener("keydown", (e) => {
    if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."].includes(e.key)) {
        typeChar(e.key);
    } else if (e.key in keyMappings) {
        keyMappings[e.key]();
    }
});

// Prevent enter key from activating last clicked button
Array.from(document.querySelectorAll("button")).forEach(button => {
    button.addEventListener("click", e => e.target.blur());
});