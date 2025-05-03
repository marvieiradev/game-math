let score = 0;
let timer;
let correctAnswer;
let level = 1;
let time = 0;
const answer = document.getElementById("answer").value;

function generateEquation() {
  const num1 = Math.floor(Math.random() * 10 * level) + 1;
  const num2 = Math.floor(Math.random() * 10 * level) + 1;
  const operator = ["+", "-", "*", "/"][Math.floor(Math.random() * 4)];
  let equation = `${num1} ${operator} ${num2}`;

  correctAnswer = eval(equation);
  document.getElementById("equation").innerText =
    equation.replace("/", "÷") + " = ?";

  switch (operator) {
    case "+":
      correctAnswer = num1 + num2;
      break;
    case "-":
      correctAnswer = num1 - num2;
      break;
    case "*":
      correctAnswer = num1 * num2;
      break;
    case "/":
      correctAnswer = num1 / num2;
      break;
  }
  if (!Number.isInteger(correctAnswer) || correctAnswer < 0) {
    generateEquation(); // Regenerate if the answer is negative or not an integer
  }

  console.log("Correct Answer: ", correctAnswer);
}

function checkAnswer() {
  const userAnswer = parseInt(document.getElementById("answer").value, 10);
  if (userAnswer === correctAnswer) {
    score++;

    document.getElementById("score").innerText = score;
    document.getElementById("answer").value = ""; // Clear the input field

    if (score % 5 === 0) {
      level++; // Increase level every 5 correct answers
      document.getElementById("level").innerText = level;
    }
    // Generate a new equation
    generateEquation();
  }
}

function startTimer() {
  time = 0;
  timer = setInterval(() => {
    time++;
    if (time > 60) {
      clearInterval(timer); // Stop the timer when it reaches 30 seconds
      gameOver(); // Call gameOver function
    }
    document.getElementById("time").innerText = time;
  }, 1000);
}

function gameOver() {
  alert("Game Over! Your score is: " + score);
  generateEquation(); // Reset the game
  score = 0; // Reset score
  level = 1; // Reset level
  startTimer(); // Restart the timer
  document.getElementById("score").innerText = score; // Update score display
  document.getElementById("level").innerText = level; // Update level display
}

document.addEventListener(
  "keypress",
  function (e) {
    if (e.which == 13) {
      checkAnswer(); // Check the answer when Enter is pressed
      e.preventDefault(); // Prevent the default action of the Enter key
    }
  },
  false
);

generateEquation();
startTimer(); // Start the timer when the page loads
