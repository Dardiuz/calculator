let operator = "";
let previousValue = "";
let currentValue = "";

document.addEventListener("DOMContentLoaded", function () {
  let numbers = document.querySelectorAll(".button");
  let operators = document.querySelectorAll(".button-operator");

  let clear = document.querySelector(".button-clear");
  let equal = document.querySelector(".button-equals");
  let decimal = document.querySelector(".button-decimal");

  let display = document.querySelector(".screen");

  numbers.forEach((number) =>
    number.addEventListener("click", function (e) {
      handleNumber(e.target.textContent);
      display.textContent = currentValue;
    })
  );

  operators.forEach((op) =>
    op.addEventListener("click", function (e) {
      handleOperator(e.target.textContent);
      display.textContent = currentValue + " " + operator;
    })
  );

  clear.addEventListener("click", function () {
    currentValue = "";
    previousValue = "";
    operator = "";
    display.textContent = currentValue;
  });

  equal.addEventListener("click", function () {
    if (currentValue != "" && previousValue != "") {
      calculate();
      display.textContent = "";
      if (previousValue.length <= 5) {
        display.textContent = previousValue;
      } else {
        display.textContent = previousValue.slice(0, 5) + "...";
      }
    }
  });

  decimal.addEventListener("click", function () {
    addDecimal();
  });
});

function handleNumber(num) {
  if (currentValue.length <= 6) {
    currentValue += num;
  }
}

function handleOperator(op) {
  operator = op;
  previousValue = currentValue;
  currentValue = "";
}

function calculate() {
  previousValue = Number(previousValue);
  currentValue = Number(currentValue);

  if (operator === "+") {
    previousValue += currentValue;
  } else if (operator === "-") {
    previousValue -= currentValue;
  } else if (operator === "x") {
    previousValue *= currentValue;
  } else if (operator === "/") {
    previousValue /= currentValue;
  }

  previousValue = roundNumber(previousValue);
  previousValue = previousValue.toString();
}

function roundNumber(num) {
  return Math.round(num * 1000) / 1000;
}

function addDecimal() {
  if (!currentValue.includes(".")) {
    currentValue += ".";
  }
}
