const displayDiv = document.querySelector(".display");
const clearBtn = document.querySelector("#clear");
const equalBtn = document.querySelector("#equal");
const buttons = document.querySelectorAll(".button");

let isResultdisplay = false;
let result = JSON.parse(localStorage.getItem("result")) || "";
displayResult();

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;
    const isOperator = ["+", "-", "*", "/"].includes(value);

    if (isResultdisplay) {
      // Eğer sonuç gösterilmişse ve operatör değilse, yeni bir işlem başlat
      result = isOperator ? result + value : value;
      isResultdisplay = false;
    } else {
      // Eğer sonuç gösterilmemişse, değeri işleme ekle
      result += value;
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
    result = "";
  }
});

clearBtn.addEventListener("click", () => {
  isResultdisplay = false;
  result = "";
  displayResult();
});
