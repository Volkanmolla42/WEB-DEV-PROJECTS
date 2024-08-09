const displayDiv = document.querySelector(".display");
const clearBtn = document.querySelector("#clear");
const equalBtn = document.querySelector("#equal");
const buttons = document.querySelectorAll(".button");

let result = JSON.parse(localStorage.getItem("result")) || "";
let isResultdisplay = false;
displayResult();

buttons.forEach((e) => {
  e.addEventListener("click", () => {
    const value = e.textContent;

    if (isResultdisplay === false) {
      result += value;
    } else {
      if (value === "+" || value === "-" || value === "*" || value === "/") {
        result += value;
      } else {
        result = value;
      }
      isResultdisplay = false;
    }

    displayResult();
  });
});

function displayResult() {
  displayDiv.textContent = result;
  localStorage.setItem("result", JSON.stringify(result));
}

equalBtn.addEventListener("click", () => {
  try {
    result = eval(result).toString();
    isResultdisplay = true;
    displayResult();
  } catch (error) {
    displayDiv.textContent = "Error";
    result = ""; // Reset transactionDiv on error
  }
});

clearBtn.addEventListener("click", () => {
  isResultdisplay = false;
  result = "";
  displayResult();
});
