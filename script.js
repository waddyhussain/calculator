// functions
// updateDisplay
// showAnswer
// clear

// ---------- Logic  ---------------

// what to display:
// main section: 
// display current operand if not empty
// if operand empty and current operand is operand1, display ans if ans exists
// else display 0
// top section:
// display topText variable
// if topText empty and ans exists, display ans

// press equals:
// does nothing if operand1 is still being entered
// convert op2 to number
// op1 = calc(op1, op2, oper)
// update top text
// display answer (op1) 
// if user types numbers: clear current entry (op1)
// if user selects operator: chain computation

// clear: reset all variables

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

function updateDisplay() {

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