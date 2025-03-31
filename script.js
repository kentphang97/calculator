let firstOperand = 0;
let secondOperand = 0;
let currentOperation = null;
let reqClearCurrentScreen = false;

const btnNumber = document.querySelectorAll(".btn-number");
const btnOperator = document.querySelectorAll(".btn-operator");
const currentScreen = document.querySelector(".current-screen");
const lastScreen = document.querySelector(".last-screen");
const equal = document.querySelector(".btn-equal");
const btnClear = document.querySelector(".btn-clear");
const btnDelete = document.querySelector(".btn-delete");
const btnPoint = document.querySelector(".btn-dot");

//#region Function

function add(a, b) {
  console.log(typeof a);
  console.log(typeof b);
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function clearCurrentScreen() {
  currentScreen.textContent = "";
  reqClearCurrentScreen = false;
}

function displayCurrentScreen(text) {
  if (currentScreen.textContent === "0" || reqClearCurrentScreen) {
    clearCurrentScreen();
  }
  currentScreen.textContent += text;
}

function calculation(currentOperation, firstOperand, secondOperand) {
  let a = Number(firstOperand);
  let b = Number(secondOperand);

  if (currentOperation === "÷") {
    return divide(a, b);
  } else if (currentOperation === "+") {
    return add(a, b);
  } else if (currentOperation === "-") {
    return subtract(a, b);
  } else if (currentOperation === "x") {
    return multiply(a, b);
  }
}

function setOperation(operator) {
  if (currentOperation !== null) evaluate();
  firstOperand = currentScreen.textContent;
  currentOperation = operator;
  lastScreen.textContent = `${firstOperand} ${currentOperation}`;
  reqClearCurrentScreen = true;
}

function evaluate() {
  if (currentOperation === null || reqClearCurrentScreen) return;
  if (currentOperation === "÷" && currentScreen.textContent === "0") {
    alert("You can't divide by 0!");
    return;
  }
  secondOperand = currentScreen.textContent;
  currentScreen.textContent = roundResult(
    calculation(currentOperation, firstOperand, secondOperand)
  );
  console.log(currentOperation);
  lastScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  currentOperation = null;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}
function clear() {
  currentScreen.textContent = "0";
  lastScreen.textContent = "";
  firstOperand = "";
  secondOperand = "";
  currentOperation = null;
}

function dltInput() {
  if (currentScreen.textContent.length < 1) {
    currentScreen.textContent = "0";
  } else {
    currentScreen.textContent = currentScreen.textContent.slice(0, -1);
  }
}

function appendPoint() {
  if (reqClearCurrentScreen) clearCurrentScreen();
  if (currentScreen.textContent === "") currentScreen.textContent = "0";
  if (currentScreen.textContent.includes(".")) return;
  currentScreen.textContent += ".";
}
//#endregion

//#region event listener

btnNumber.forEach((button) =>
  button.addEventListener("click", () =>
    displayCurrentScreen(button.textContent)
  )
);

btnOperator.forEach((button) => {
  button.addEventListener("click", () => setOperation(button.textContent));
});

equal.addEventListener("click", evaluate);

btnClear.addEventListener("click", clear);

btnDelete.addEventListener("click", dltInput);
btnPoint.addEventListener("click", appendPoint);

//#endregion
