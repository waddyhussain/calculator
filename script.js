// functions add, subtract, multiply, divide
// setOperator
// updateDisplay
// enterNumber
// changeSign
// updateAnswer

// ---------- Logic  ---------------

// press number: concat to end of operand string
// if number == 0 and operand str is empty, do nothing
// if operator is empty, concat operand1, else operand2
// can only contain decimal once
// handle making numbers negative?
// update display (if operand empty, display 0)

// what to display:
// main section: 
// display current operand if not empty
// if operand empty and current operand is operand1, display ans if ans exists
// else display 0
// top section:
// display topText variable
// if topText empty and ans exists, display ans

// press operator (not equals):

// if operand2 empty
//     convert operand1 to number if necessary 
//         try use operand1
//         if operand1 empty and ans exists, set operand1 to answer
//         else use 0
//     set operator
//     update topText
// else
//     convert operand2 to number if necessary (if empty set to 0)
//     operand1 = calculate(operand1, operand2, operator)
//     set new operator
//     update topText
// endif

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