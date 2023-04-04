let isNum1 = true;
let allowNum = true;
let allowNeg = true;
let allowOp = false;
let allowEq = false;
let num1 = "";
let num2 = "";
let operator = "";
let display = "";

function add(a, b) {
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

function operate(num1, num2, operator) {
  switch (operator) {
    case "+":
      return +add(Number(num1), Number(num2)).toFixed(3);
    case "−":
      return +subtract(Number(num1), Number(num2)).toFixed(3);
    case "×":
      return +multiply(Number(num1), Number(num2)).toFixed(3);
    case "÷":
      return +divide(Number(num1), Number(num2)).toFixed(3);
  }
}

function updateDisplay() {
  display = num1 + operator + num2;
  document.querySelector(".display").textContent = display;
}

function divisionByZero() {
  allowNum = false;
  allowNeg = false;
  allowOp = false;
  allowEq = false;
  num1 = "Can't divide by 0";
  num2 = "";
  operator = "";
  updateDisplay();
}

document.querySelectorAll(".number").forEach((btn) => {
  btn.addEventListener("click", () => {
    const input = btn.textContent;
    if (allowNum) {
      if (isNum1) {
        num1 += input;
      } else {
        num2 += input;
        allowEq = true;
      }
      allowNeg = false;
      allowOp = true;
      updateDisplay();
    }
  });
});

document.querySelector(".negative").addEventListener("click", () => {
  if (allowNeg) {
    if (isNum1) {
      num1 += "-";
    } else {
      num2 += "-";
    }
    allowNeg = false;
    updateDisplay();
  }
});

document.querySelectorAll(".operator").forEach((btn) => {
  btn.addEventListener("click", () => {
    const input = btn.textContent;
    if (allowOp) {
      if (!isNum1) {
        if (operator === "÷" && num2 == 0) {
          divisionByZero();
          return;
        } else {
          num1 = operate(num1, num2, operator);
          num2 = "";
        }
      } else {
        isNum1 = false;
        allowNum = true;
      }
      allowNeg = true;
      allowOp = false;
      allowEq = false;
      operator = input;
      updateDisplay();
    }
  });
});

document.querySelector(".equals").addEventListener("click", () => {
  if (allowEq) {
    if (operator === "÷" && num2 == 0) {
      divisionByZero();
      return;
    } else {
      isNum1 = true;
      allowNum = false;
      allowEq = false;
      num1 = operate(num1, num2, operator);
      num2 = "";
      operator = "";
      updateDisplay();
    }
  }
});

document.querySelector(".clear").addEventListener("click", () => {
  isNum1 = true;
  allowNum = true;
  allowNeg = true;
  allowOp = false;
  allowEq = false;
  num1 = "";
  num2 = "";
  operator = "";
  updateDisplay();
});

// debug logging
document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const clickedOn = e.target.textContent;
    console.table({
      clickedOn,
      isNum1,
      allowNum,
      allowNeg,
      allowOp,
      allowEq,
      num1,
      num2,
      operator,
      display,
    });
  });
});
