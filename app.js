const body = document.querySelector("body");
const header = document.createElement("header");
const main = document.createElement("main");
const footer = document.createElement("footer");

body.appendChild(header);
body.appendChild(main);
body.appendChild(footer);

// ========== Header ==========
const headerPara = document.createElement("p");
headerPara.innerText = "Number Guessing Game";
headerPara.id = "headerPara";
header.appendChild(headerPara);

// ========== Main Container ==========
const mainContainer = document.createElement("section");
mainContainer.id = "mainContainer";

const paraArray = [
  "Try guessing a random number between 1 and 100",
  "You have Total 5 attempts to guess the number",
  "Guess a number",
];

paraArray.forEach((msg) => {
  const para = document.createElement("p");
  para.classList.add("mainContainerHeaderPara");
  para.innerText = `${msg}`;
  mainContainer.appendChild(para);
});

// ========== Form ==========
const form = document.createElement("form");
form.classList.add("form");

const inputNum = document.createElement("input");
inputNum.id = "inputNum";
inputNum.setAttribute("type", "number");
form.appendChild(inputNum);

const submitBtn = document.createElement("button");
submitBtn.id = "submitBtn";
submitBtn.innerText = "Submit Guess";
form.appendChild(submitBtn);

mainContainer.appendChild(form);

// ========== Result Display ==========
const result = document.createElement("div");
result.id = "result";
mainContainer.appendChild(result);

// ========== Bottom UI (Guesses) ==========
function bottomPara(paraId, valueId, paraText, value) {
  const guessContainer = document.createElement("div");
  guessContainer.classList.add("guesses");

  const para = document.createElement("p");
  para.id = `${paraId}`;
  para.innerText = `${paraText}`;
  guessContainer.appendChild(para);

  const guessValueDiv = document.createElement("div");
  guessValueDiv.classList.add("guessValueDiv");
  guessValueDiv.id = `${valueId}`;
  guessValueDiv.innerText = `${value}`;
  guessContainer.appendChild(guessValueDiv);

  mainContainer.appendChild(guessContainer);
}

bottomPara("para1", "previousGuessvalue", "Previous Guesses:", "");
bottomPara("para2", "remainingValue", "Guesses Remaining:", "5");
main.appendChild(mainContainer);

// ========== Game Logic ==========
const min = 1;
const max = 10;
let randomValue = min + Math.floor(Math.random() * (max - min + 1));
console.log("Random value:", randomValue);

let guessString = "";
let counter = 5;
let isGameOver = false;

// ========== Cached DOM References ==========
const inputValEl = document.querySelector("#inputNum");
const remainingValEl = document.querySelector("#remainingValue");
const previousGuessValEl = document.querySelector("#previousGuessvalue");

// ========== UI Update Helper ==========
function updateUI() {
  remainingValEl.innerText = counter;
  previousGuessValEl.innerText = guessString;
  inputValEl.value = "";
}

// ========== Submit Event ==========
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (isGameOver) {
    setTimeout(() => {
      alert("Game over! Click OK to play again.");
      location.reload();
    }, 100);
    return;
  }

  if (counter < 5) result.innerText = "";

  const inputVal = inputValEl.value;

  if (inputVal <= 0 || inputVal > 10 || isNaN(inputVal)) {
    alert("Please enter a valid number between 1 and 10 !!");
    return;
  }
  if (parseInt(inputVal) === randomValue) {
    result.innerText = "🎉 Congrats!!! You won";
    isGameOver = true;
  } else {
    result.innerText = "OOPS Incorrect guess! Try again";
    guessString += `${inputVal} `;
    counter--;
  }

  updateUI();
  result.classList.add("afterSubmit");

  if (counter <= 0 && !isGameOver) {
    isGameOver = true;
    setTimeout(() => {
      alert("Game over! Click OK to play again.");
      location.reload();
    }, 100);
  }
});
