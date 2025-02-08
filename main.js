// selecting  DOM elements
let colorBox = document.getElementById("color-box");
let scoreDisplay = document.getElementById("score");
let gameStatus = document.getElementById("status"); 
let buttons = document.querySelectorAll(".btn");
let resetButton = document.getElementById("reset-btn");

// Function to generate random color
function generateRandomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// random RGB colors
let colors = [];
for(let i = 0; i < 6; i++) {
    colors.push(generateRandomRGB());
}

let score = 0;

// Assigning random colors to buttons
buttons.forEach((button, index) => {
    button.style.backgroundColor = colors[index];
});

let targetColor;

function startGame(){
    colors = [];
    for(let i = 0; i < 6; i++) {
        colors.push(generateRandomRGB());
    }
    
    // Assignin new colors to buttons
    buttons.forEach((button, index) => {
        button.style.backgroundColor = colors[index];
        button.classList.remove("correct", "wrong");
    });

    targetColor = colors[Math.floor(Math.random() * colors.length)];
    colorBox.style.backgroundColor = "gray";
    gameStatus.textContent = "Guess the correct color!";
    
}

function checkColor(event) {
    let clickedColor = event.target.style.backgroundColor;

    if (colorBox.style.backgroundColor === "gray") {
        colorBox.style.backgroundColor = targetColor;
    }

    if (clickedColor === targetColor){
        gameStatus.textContent = "Correct!";
        gameStatus.style.color = "green";
        score++; 
        scoreDisplay.textContent = `Score: ${score}`;
        event.target.classList.add("correct");
        setTimeout(startGame, 1000);
    } else {
        gameStatus.textContent = "Wrong! Try again.";
        gameStatus.style.color = "red";
        event.target.classList.add("wrong");
    }
}


buttons.forEach(button => {
    button.addEventListener("click", checkColor);
});

// Reset game 
resetButton.addEventListener("click", () => {
    score = 0;
    scoreDisplay.textContent = "Score: 0"; 
    gameStatus.textContent = "Guess the correct color!";
    gameStatus.style.color = "white";
    buttons.forEach(button => {
        button.classList.remove("correct", "wrong"); // Remove result classes
    });
    startGame();
});

// Start the game when page load
startGame();
