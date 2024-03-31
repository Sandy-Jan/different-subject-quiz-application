const container = document.querySelector(".container");
const questionBox = document.querySelector(".question");
const choicesBox = document.querySelector(".choices");
const nextBtn = document.querySelector(".nextBtn");
const scoreCard = document.querySelector(".scoreCard");
const questionNumber = document.querySelector(".questionNumber");
const startBtn = document.querySelector(".startBtn");
const timer = document.querySelector(".timer");
const currentScore = document.querySelector(".currentScore");

// Make an array of objects that stores question, choices of question and answer
const quiz = [
  // Quiz questions, choices, and correct answers

  {
    question:
      "Q. A shopkeeper buys a shirt for Rs20 and sells it for Rs30. What is the profit percentage?",
    choices: ["25%", "33.33%", "50%", "66.67%"],
    answer: "50%",
  },
  {
    question:
      "Q. A book is bought for Rs 80 and sold for Rs 100. What is the profit percentage?",
    choices: ["20%", "25%", "30%", "35%"],
    answer: "25%",
  },
  {
    question:
      "Q. A computer is bought for Rs 1000 and sold for Rs 800. What is the loss percentage?",
    choices: ["20%", "25%", "30%", "35%"],
    answer: "20%",
  },
  {
    question:
      "Q. A trader sells a bicycle at a loss of 20%. If the selling price is Rs 400, what is the cost price?",
    choices: ["320", "400", "500", "480"],
    answer: "500",
  },
  {
    question:
      "Q. A retailer bought a TV for Rs 500 and sold it for Rs 600. What is the profit percentage?",
    choices: ["10%", "15%", "20%", "25%"],
    answer: "20%",
  },
  {
    question:
      "Q. A fruit seller sells 25% of his stock of apples and still has 600 apples left. How many apples did he have originally?",
    choices: ["600", "800", "1000", "1200"],
    answer: "800",
  },
  {
    question:
      "Q. A trader buys 20 pens for Rs 200 and sells them at Rs 15 each. What is his profit percentage?",
    choices: ["25%", "30%", "35%", "40%"],
    answer: "25%",
  },
  {
    question:
      "Q. A shopkeeper sells a watch for Rs 1800 at a profit of 20%. What is the cost price of the watch?",
    choices: ["Rs 1200", "Rs 1500", "Rs 1600", "Rs 1700"],
    answer: "Rs 1500",
  },
  {
    question:
      "Q. If a book is sold for Rs 180, there is a loss of 10%. What is the cost price of the book?",
    choices: ["rs 200", "Rs 210", "Rs 220", "Rs 230"],
    answer: "Rs 200",
  },
  {
    question:
      "Q. A trader sells an article at a loss of 10%. If the selling price is Rs 540, what is the cost price?",
    choices: ["Rs 600", "Rs 620", "Rs 640", "Rs 660"],
    answer: "Rs 600",
  },
];

// Making Variables
// Index of the current question being displayed
let currentQuestionIndex = 0;
let score = 0; // Current score of the player

// Flag to indicate if the quiz is over
let quizOver = false;

// Initial time for each question
let timeLeft = 10;

// ID for the setInterval function used for the timer
let timerID = null;

// Arrow Function to Show Questions
const showQuestions = () => {
  const questionDetails = quiz[currentQuestionIndex];
  questionNumber.textContent = `Q${currentQuestionIndex + 1}`;
  questionBox.textContent = questionDetails.question;

  // Clearing previous answer choices
  choicesBox.textContent = "";

  // Iterating through answer choices and displaying them
  for (let i = 0; i < questionDetails.choices.length; i++) {
    const currentChoice = questionDetails.choices[i];
    const choiceDiv = document.createElement("div");
    choiceDiv.textContent = currentChoice;
    choiceDiv.classList.add("choice");
    choicesBox.appendChild(choiceDiv);

    // Adding event listener to each choice for selection
    choiceDiv.addEventListener("click", () => {
      if (choiceDiv.classList.contains("selected")) {
        choiceDiv.classList.remove("selected");
      } else {
        choiceDiv.classList.add("selected");
      }
    });
  }
  // Adding event listener to each choice for selection
  if (currentQuestionIndex < quiz.length) {
    startTimer();
  }
  // Displaying current score
  currentScore.textContent = `Score: ${score}`;
  choicesBox.appendChild(currentScore);
};

// Function to check answers
const checkAnswer = () => {
  const selectedChoice = document.querySelector(".choice.selected");
  if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
    // Increment score for correct answer
    score++;
  } else {
    // Deduct points for wrong answer
    score -= 1 / 4;
  }
  timeLeft = 10;
  currentQuestionIndex++;
  if (currentQuestionIndex < quiz.length) {
    showQuestions();
  } else {
    // If all questions are answered, stop timer and display score
    stopTimer();
    showScore();
  }
};

// Function to show score
const showScore = () => {
  // Clearing question and choices display
  questionBox.textContent = "";
  choicesBox.textContent = "";

  alert("You have completed this quiz!");
  nextBtn.textContent = "Play Again";
  quizOver = true;
  timer.style.display = "none";
  questionNumber.style.display = "none";
  const totalQuestions = quiz.length;
  const wrongAnswers = totalQuestions - score;
  const percentageCorrect = Math.round((score / totalQuestions) * 100);
  const totalTimeTaken = Math.round((endTime - startTime) / 1000);
  const questionsAttempted = currentQuestionIndex;
  const userName = localStorage.getItem("userName");

  // Displaying scorecard with statistics
  scoreCard.innerHTML = `
    <p><b>${userName}</b>, Your result is :</p> </br>
    <p>Total Question : <b>${totalQuestions}.</b></p> </br>
    <p>Answered correctly: <b>${score}.</b></p> </br> 
    <p> Wrong:<b>${wrongAnswers}.</b></p> </br>
    <p>Attempted:<b>${questionsAttempted} </b></p></br>
    <p> Percentage:<b>${percentageCorrect}%</b></p></br>
    <p>Total time taken: <b> ${totalTimeTaken} second</b></p></br>
    `;

  // Creating link to home page
  const homeLink = document.createElement("a");
  homeLink.classList.add("linked");
  homeLink.href = "home.html";
  homeLink.textContent = "Home Page";
  scoreCard.appendChild(homeLink);
};

// Function to Start Timer
const startTimer = () => {
  startTime = Date.now(); // Recording start time
  clearInterval(timerID); // Check for any exist timers
  timer.textContent = timeLeft; // Displaying initial time

  const countDown = () => {
    timeLeft--;
    timer.textContent = timeLeft;
    // If time is up, prompt user to play again
    if (timeLeft === 0) {
      const confirmUser = confirm(
        "Time Up!!! Do you want to play the quiz again"
      );
      if (confirmUser) {
        // Resetting timer for next question
        timeLeft = 10;
        startQuiz();
      } else {
        startBtn.style.display = "block";
        container.style.display = "none";
        return;
      }
    }
  };
  timerID = setInterval(countDown, 1000);
};

// Function to Stop Timer
const stopTimer = () => {
  endTime = Date.now();
  clearInterval(timerID);
};

// Function to shuffle question
const shuffleQuestions = () => {
  for (let i = quiz.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
  }
  currentQuestionIndex = 0;
  showQuestions();
};

// Function to Start Quiz
const startQuiz = () => {
  timeLeft = 10;
  timer.style.display = "flex";
  questionNumber.style.display = "block";
  shuffleQuestions();
};

// Adding Event Listener to Start Button
startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  container.style.display = "block";
  startQuiz();
});

nextBtn.addEventListener("click", () => {
  const selectedChoice = document.querySelector(".choice.selected");
  if (!selectedChoice && nextBtn.textContent === "Next") {
    alert("select an option");
    return;
  }
  if (quizOver) {
    nextBtn.textContent = "Next";
    scoreCard.textContent = ""; // Clearing score card display
    currentQuestionIndex = 0; // Resetting question index
    quizOver = false;
    score = 0;
    startQuiz();
  } else {
    checkAnswer();
  }
});
