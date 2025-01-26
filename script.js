document.addEventListener("DOMContentLoaded", () => {
  const inputBox = document.getElementById("inputbox");
  const numberButtons = document.querySelectorAll(".numbers");
  const operatorButtons = document.querySelectorAll(".operators");
  const clearButton = document.querySelector(".c");
  const allClearButton = document.querySelector(".ac");
  const equalButton = document.querySelector(".equalBtn");
  const memoryButtons = document.querySelectorAll(".operator");

  let currentInput = "";
  let memoryValue = 0;

  // Handle number buttons
  numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentInput += button.innerText;
      inputBox.value = currentInput;
    });
  });

  // Handle operator buttons
  operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const operator = button.innerText;
      if (currentInput && !isNaN(currentInput.slice(-1))) {
        currentInput += operator;
        inputBox.value = currentInput;
      }
    });
  });

  // Handle clear (C) button
  clearButton.addEventListener("click", () => {
    currentInput = "";
    inputBox.value = "0";
  });

  // Handle all clear (AC) button
  allClearButton.addEventListener("click", () => {
    currentInput = "";
    inputBox.value = "0";
    memoryValue = 0;
  });

  // Handle equals (=) button
  equalButton.addEventListener("click", () => {
    try {
      if (currentInput.includes("^")) {
        const [base, exponent] = currentInput.split("^");
        currentInput = Math.pow(Number(base), Number(exponent)).toString();
      } else {
        currentInput = eval(currentInput).toString();
      }
      inputBox.value = currentInput;
    } catch (error) {
      inputBox.value = "Error";
      currentInput = "";
    }
  });

  // Handle memory buttons
  memoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      switch (button.innerText) {
        case "M+":
          memoryValue += Number(inputBox.value) || 0;
          break;
        case "M-":
          memoryValue -= Number(inputBox.value) || 0;
          break;
        case "MRC":
          inputBox.value = memoryValue.toString();
          break;
        case "OFF":
          inputBox.value = "0";
          currentInput = "";
          memoryValue = 0;
          break;
      }
    });
  });
});
