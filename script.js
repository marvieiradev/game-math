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
    generateEquation();
  }
}

function checkAnswer() {
  const userAnswer = parseInt(document.getElementById("answer").value, 10);
  if (userAnswer === correctAnswer) {
    score++;

    document.getElementById("score").innerText = score;
    document.getElementById("answer").value = "";

    if (score % 5 === 0) {
      level++;
      document.getElementById("level").innerText = level;
    }
    generateEquation();
  }
}

function startTimer() {
  time = 0;
  timer = setInterval(() => {
    time++;
    if (time > 60) {
      clearInterval(timer);
      gameOver();
    }
    document.getElementById("time").innerText = time;
  }, 1000);
}

function gameOver() {
  generateEquation();
  document.getElementById("modal").style.display = "flex";
  document.getElementById("final-score").innerText =
    "Você fez " + score + " pontos!";
}

document.getElementById("restart").onclick = function () {
  document.getElementById("modal").style.display = "none";
  document.getElementById("answer").value = "";
  document.getElementById("score").innerText = 0;
  document.getElementById("level").innerText = 1;
  startGame();
};

document.addEventListener(
  "keypress",
  function (e) {
    if (e.which == 13) {
      checkAnswer();
      e.preventDefault();
    }
  },
  false
);

startGame = () => {
  score = 0;
  level = 1;
  generateEquation();
  startTimer();
};

startGame();
