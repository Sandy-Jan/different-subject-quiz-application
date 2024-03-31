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
      "Q. If a standard deck of playing cards is shuffled thoroughly and one card is drawn at random, what is the probability of drawing a red card?",
    choices: ["1/2", "1/4", "1/3", "1/1"],
    answer: "1/2",
  },
  {
    question:
      "Q. A bag contains 3 red balls, 2 blue balls, and 5 green balls. If one ball is drawn at random from the bag, what is the probability of selecting a blue ball?",
    choices: ["1/4", "2/10", "2/5", "1/3"],
    answer: "2/10",
  },
  {
    question:
      "Q. In a class of 30 students, 18 study Mathematics, 12 study Physics, and 6 study both Mathematics and Physics. What is the probability that a student selected at random studies either Mathematics or Physics?",
    choices: ["3/10", "1/2", "2/5", "3/5"],
    answer: "3/5",
  },
  {
    question:
      "Q. A bag contains 6 black marbles, 4 white marbles, and 2 red marbles. If one marble is drawn at random from the bag, what is the probability of selecting a black or white marble?",
    choices: ["1/3", "2/3", "5/12", "3/12"],
    answer: "2/3",
  },
  {
    question:
      "Q. A standard deck of playing cards contains 52 cards. What is the probability of drawing a face card (Jack, Queen, or King) from a well-shuffled deck?",
    choices: ["1/4", "3/13", "1/13", "1/3"],
    answer: "3/13",
  },
  {
    question:
      "Q. In a game, a fair six-sided die is rolled once. What is the probability of rolling a prime number?",
    choices: ["1/6", "1/2", "1/3", "1/4"],
    answer: "1/2",
  },
  {
    question:
      "Q. A jar contains 5 red balls, 3 blue balls, and 2 green balls. If two balls are drawn at random without replacement, what is the probability that both balls are red?",
    choices: ["5/10", "5/9", "10/20", "1/5"],
    answer: "5/9",
  },
  {
    question:
      "Q. A box contains 8 red balls, 5 blue balls, and 3 green balls. If one ball is drawn at random from the box, what is the probability of selecting a blue or green ball?",
    choices: ["4/16", "5/16", "3/16", "8/16"],
    answer: "8/16",
  },
  {
    question:
      "Q. If two coins are flipped simultaneously, what is the probability of getting at least one head?",
    choices: ["1/4", "1/2", "3/4", "1/3"],
    answer: "3/4",
  },
  {
    question:
      "Q. A bag contains 4 black balls, 3 white balls, and 2 red balls. If one ball is drawn at random from the bag, what is the probability of selecting a black or red ball?",
    choices: ["1/4", "1/2", "2/3", "2/9"],
    answer: "2/9",
  },
];

// Making Variables
// Index of the current question being displayed
let currentQuestionIndex = 0;
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
