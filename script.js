let timeEl = document.getElementById("time-left");
const startButton = document.getElementById("start-btn");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
let results = document.getElementById("results");

const questions = [
  {
    question: "What are the data types supported by Javascript?",
    answers: ["Boolean", "String", "Number", "All of the above"],
    correctAnswer: "All of the above",
  },

  {
    question: "What built-in method returns the length of a string?",
    answers: ["length()", "forEach()", "pop()", "concat()"],
    correctAnswer: "length()",
  },

  {
    question: "Which of the following is an attribute?",
    answers: ["section", "div", "id", "body"],
    correctAnswer: "id",
  },

  {
    question: "Which operator is known as the strict equality operator?",
    answers: ["==", "===", "!=", "="],
    correctAnswer: "===",
  },

  {
    question: "What value is used to represent no value or no object?",
    answers: ["NaN", "None", "Null", "All of the above"],
    correctAnswer: "Null",
  },
];

let currentQuestionIndex = 0;
let timeLeft = 45;
let timeInterval = null;
let score = 0;

function startQuiz() {
  startButton.style.display = "none";
  timeInterval = setInterval(startTimer, 1000);
  showQuestionsAndAnswers();
}

function startTimer() {
  timeLeft--;
  if (timeLeft <= 0) {
    timeEl.textContent = 0;
  } else {
    timeEl.textContent = timeLeft;
  }

  if (timeLeft <= 0) {
    clearInterval(timeInterval);
    endQuiz();
  }
}

let currentQuestion = questions[currentQuestionIndex].question;
let currentAnswers = questions[currentQuestionIndex].answers;
let correctAnswerValue = questions[currentQuestionIndex].correctAnswer;

function showQuestionsAndAnswers() {
  questionEl.textContent = currentQuestion;
  answersEl.innerHTML = "";
  currentAnswers.forEach((answer) => {
    console.log(answer);
    const answerButton = document.createElement("button");
    answerButton.textContent = answer;
    answerButton.setAttribute("value", answer);
    answerButton.addEventListener("click", answerClick);
    answersEl.appendChild(answerButton);
  });
}

function answerClick(e) {
  console.log(e.target);
  console.log(correctAnswerValue);
  console.log(e.target.value);
  var userAnswer = e.target.value;
  if (correctAnswerValue === userAnswer) {
    console.log("Correct!");
    score++;
  } else {
    console.log("Wrong!");
    timeLeft -= 10;
  }
  nextQuestion();
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    currentQuestion = questions[currentQuestionIndex].question;
    currentAnswers = questions[currentQuestionIndex].answers;
    correctAnswerValue = questions[currentQuestionIndex].correctAnswer;
    showQuestionsAndAnswers();
  }
  if (currentQuestionIndex === questions.length) {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timeInterval);
  document.getElementById("question").style.display = "none";
  document.getElementById("answers").style.display = "none";
  document.getElementById("timer").style.display = "none";
  document.getElementById("results").style.display = "block";
  document.getElementById("score").style.display = "block";


  let initials = prompt("Enter your name:");
  document.getElementById("name").innerHTML = "Name: " + initials;
  document.getElementById("score").innerHTML =
    "Score: " + score + "/" + questions.length;
}

startButton.addEventListener("click", startQuiz);
