let score = 0;
let timer;
let correctAnswer;
let level = 0;
let time = 0;

function generateEquation() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operator = ["+", "-", "*", "/"][Math.floor(Math.random() * 4)];
  let equation = `${num1} ${operator} ${num2}`;
  if (operator === "/") {
    equation = `${num1 * num2} / ${num1}`; // Ensure the result is an integer
  }
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

generateEquation();
