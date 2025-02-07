const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
let targetColor = "";
let score = 0;

// Selecting elements using data-testid
const colorBox = document.querySelector("[data-testid='colorbox']");
const optionsContainer = document.querySelector(".options-container");
const statusMessage = document.querySelector("[data-testid='gamestatus']");
const scoreDisplay = document.querySelector("[data-testid='score']");
const newGameButton = document.querySelector("[data-testid='newGameButton']");

// Function to start a new game
function startGame() {
  targetColor = colors[Math.floor(Math.random() * colors.length)];
  colorBox.style.backgroundColor = "#ddd"; // Hidden target color
  colorBox.textContent = "❓"; // Display question mark

  optionsContainer.innerHTML = "";
  let shuffledColors = [...colors].sort(() => 0.5 - Math.random());

  shuffledColors.forEach((color) => {
    const button = document.createElement("div");
    button.classList.add("color-option");
    button.style.backgroundColor = color;
    button.setAttribute("data-testid", "coloroption");
    button.addEventListener("click", () => checkAnswer(color, button));
    optionsContainer.appendChild(button);
  });

  statusMessage.textContent = "Guess the color!";
  statusMessage.style.color = "black";
}

// Function to check the player's guess
function checkAnswer(selectedColor, button) {
  if (selectedColor === targetColor) {
    score++;
    scoreDisplay.textContent = score;
    scoreDisplay.classList.add("score-increase");
    statusMessage.textContent = "Correct! 🎉";
    statusMessage.style.color = "green";

    colorBox.style.backgroundColor = targetColor;
    colorBox.textContent = "";

    button.classList.add("correct-answer");

    setTimeout(() => {
      scoreDisplay.classList.remove("score-increase");
      startGame();
    }, 1000);
  } else {
    score--;
    scoreDisplay.textContent = score;
    scoreDisplay.classList.add("score-decrease");

    statusMessage.textContent = "Try again! ❌";
    statusMessage.style.color = "red";
    button.classList.add("wrong-answer");

    setTimeout(() => {
      scoreDisplay.classList.remove("score-decrease");
      button.remove();
    }, 500);
  }
}

// Event listener for New Game button
newGameButton.addEventListener("click", () => {
  score = 0;
  scoreDisplay.textContent = score;
  startGame();
});

// Start the game on page load
startGame();
