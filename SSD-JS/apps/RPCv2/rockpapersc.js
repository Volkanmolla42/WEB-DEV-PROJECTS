// Selecting DOM elements
const rockBtn = document.querySelector(".rock");
const paperBtn = document.querySelector(".paper");
const scissorsBtn = document.querySelector(".scissors");
const playerCSpan = document.querySelector(".playerC");
const computerCSpan = document.querySelector(".computerC");
const resultDiv = document.querySelector(".result");
const scoresDiv = document.querySelector(".scores");
const resetBtn = document.querySelector(".resetBtn");
const autoBtn = document.querySelector(".autoPlayBtn");

// Add event listeners for buttons
scissorsBtn.addEventListener("click", () => playGame("MAKAS"));
rockBtn.addEventListener("click", () => playGame("TAŞ"));
paperBtn.addEventListener("click", () => playGame("KAĞIT"));
resetBtn.addEventListener("click", resetScore);
autoBtn.addEventListener("click", autoPlay);

let score;
let autoPlaying = false;
let autoPlayInterval;

displayScore();

// Function to display the score
function displayScore() {
  score = JSON.parse(localStorage.getItem("score")) || {
    wins: 0,
    loses: 0,
    draws: 0,
  };
  scoresDiv.textContent = `Wins: ${score.wins}, Loses: ${score.loses}, Draws: ${score.draws}`;
}
function autoPlay() {
  autoPlaying = !autoPlaying;
  if (autoPlaying) {
    autoBtn.textContent = "Stop Auto Play";
    const playerChoice = pickChoices();
    autoPlayInterval = setInterval(() => {
      playGame(playerChoice);
    }, 1000);
  } else {
    clearInterval(autoPlayInterval);
    autoBtn.textContent = "Auto Play";
  }
}
function pickChoices() {
  const randomNumber = Math.floor(Math.random() * 3);
  const choices = ["TAŞ", "KAĞIT", "MAKAS"];
  const choice = choices[randomNumber];
  return choice;
}
// Function to play the game
function playGame(playerChoice) {
  const computerChoice = pickChoices();
  let resultMsg = "";
  playerCSpan.textContent = `Oyuncu: ${playerChoice}`;
  computerCSpan.textContent = `${computerChoice} :Bilgisayar`;

  if (playerChoice === computerChoice) {
    resultMsg = "BERABERE!";
    score.draws++;
  } else if (
    (playerChoice === "TAŞ" && computerChoice === "MAKAS") ||
    (playerChoice === "KAĞIT" && computerChoice === "TAŞ") ||
    (playerChoice === "MAKAS" && computerChoice === "KAĞIT")
  ) {
    resultMsg = "KAZANDIN!";
    score.wins++;
  } else {
    resultMsg = "KAYBETTİN!";
    score.loses++;
  }

  resultDiv.textContent = resultMsg;
  localStorage.setItem("score", JSON.stringify(score));
  displayScore();
}

// Function to reset the score
function resetScore() {
  localStorage.removeItem("score");
  displayScore();
}
