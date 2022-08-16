// functions
// updateDisplay
// changeSign
// showAnswer
// clear
// delete

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
// delete: remove final char from current operand

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

function getCurrentOperandReference() {
    return operator === null ? 0 : 1;
}

function typeChar(char) {
    const operandReference = getCurrentOperandReference();
    const operandValue = operands[operandReference];
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

function setOperator(operatorFunction) {
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