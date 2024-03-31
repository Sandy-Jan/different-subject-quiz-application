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
      "Q. Pipe A can fill a tank in 8 hours and Pipe B can fill the same tank in 12 hours. If both pipes are opened together, how long will they take to fill the tank?",
    choices: ["4.8 hours", "7.2 hours", "5 hours", " 6 hours"],
    answer: "5 hours",
  },
  {
    question:
      "Q. Pipe P can fill a tank in 6 hours, while Pipe Q can fill the same tank in 4 hours. If both pipes are opened together, how much time will they take to fill half of the tank?",
    choices: ["1 hour", " 1.5 hours", "2 hours", "2.5 hours"],
    answer: "2 hours",
  },
  {
    question:
      "Q. Pipe X can fill a tank in 10 hours, while Pipe Y can empty the same tank in 15 hours. If both pipes are opened together, how long will it take to fill the tank?",
    choices: ["30 hours", "25 hours", "20 hours", "18 hours"],
    answer: "30 hours",
  },
  {
    question:
      "Q. Pipe A can fill a tank in 4 hours, while Pipe B can empty the same tank in 6 hours. If both pipes are opened together, how long will it take to fill the tank?",
    choices: ["3.2 hours", "3.5 hours", "4 hours", "4.8 hours"],
    answer: "4.8 hours",
  },
  {
    question:
      "Q. Pipe M can fill a tank in 10 hours, whereas Pipe N can empty the same tank in 8 hours. If both pipes are opened together, in how many hours will the tank be filled?",
    choices: ["20 hours", "16 hours", "14 hours", "12 hours"],
    answer: "16 hours",
  },
  {
    question:
      "Q. Pipe A can fill a tank in 5 hours and Pipe B can empty the same tank in 10 hours. If both pipes are opened together, how long will they take to fill the tank?",
    choices: ["7.5 hours", " 8 hours", "10 hours", "12 hours"],
    answer: "7.5 hours",
  },
  {
    question:
      "Q. Pipe A can fill a tank in 5 hours and Pipe B can empty the same tank in 10 hours. If both pipes are opened together, how long will they take to fill the tank?",
    choices: ["7.5 hours", " 8 hours", "10 hours", "12 hours"],
    answer: "7.5 hours",
  },
  {
    question:
      "Q. Pipe X can fill a tank in 8 hours, while Pipe Y can empty the same tank in 12 hours. If both pipes are opened together, how long will it take to fill the tank?",
    choices: ["9.6 hours", "10 hours", "14 hours", "12 hours"],
    answer: "9.6 hours",
  },
  {
    question:
      "Q. Pipe A can fill a tank in 3 hours, while Pipe B can empty the same tank in 6 hours. If both pipes are opened together, how long will they take to fill the tank?",
    choices: ["3.2 hours", " 4 hours", "4.8 hours", "6 hours"],
    answer: "4.8 hours",
  },
  {
    question:
      "Q. Pipe P can fill a tank in 15 hours, while Pipe Q can empty the same tank in 10 hours. If both pipes are opened together, how long will it take to fill the tank?",
    choices: ["20 hours", " 25 hours", "30 hours", "35 hours"],
    answer: " 25 hours",
  },
];

// Making Variables
// Index of the current question being displayed
let currentQuestionIndex = 0;

// Current score of the player
let score = 0;

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
  // Starting timer for the current question
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
  endTime = Date.now(); // Recording end time
  clearInterval(timerID);
};

// Function to shuffle question
const shuffleQuestions = () => {
  // Loop to shuffle questions
  for (let i = quiz.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
  }
  currentQuestionIndex = 0;
  showQuestions();
};

// Function to Start Quiz
const startQuiz = () => {
  timeLeft = 10; // Resetting timer
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
