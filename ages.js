const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const questionNumber = document.querySelector('.questionNumber');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');
const currentScore = document.querySelector('.currentScore')


// Make an array of objects that stores question, choices of question and answer
const quiz = [
    {
        question: "Q. John is 5 years older than Mary. If the sum of their ages is 35, how old is John?",
        choices: ["15", "20", "25", "30"],
        answer: "20"
    },
    {
        question: "Q. Ten years ago, the father's age was 3 times his son's age. If the father's age is now double his son's age, how old are they now?",
        choices: ["Father: 40, Son: 20", "Father: 30, Son: 15", "Father: 50, Son: 25", "Father: 45, Son: 15"],
        answer: "Father: 40, Son: 20"
    },
    {
        question: "Q. The ratio of the present ages of A and B is 3:4. After 5 years, the ratio of their ages will be 4:5. Find their present ages.?",
        choices: ["Father: 40, Son: 16", "Father: 42, Son: 18", "Father: 48, Son: 24", "Father: 36, Son: 12"],
        answer: "Father: 42, Son: 18"
    },
    {
        question: "Q. The sum of the ages of a father and his son is 45 years. Five years ago, the product of their ages was 144. Find their present ages.",
        choices: ["Father: 35, Son: 10", "Father: 40, Son: 5", "Father: 40, Son: 5", " Father: 50, Son: -5"],
        answer: "Father: 35, Son: 10"
    },
    {
        question: "Q. A father's age is three times his son's age. If the father is 42 years old, what is the age of his son?",
        choices: ["10", "16 ", "14 ", "12 "],
        answer: "12"
    },
    {
        question: "Q. A mother is four times as old as her daughter. In six years, the mother will be twice as old as her daughter. Find their present ages.",
        choices: ["Mother: 28, Daughter: 7", "Mother: 32, Daughter: 8", "Mother: 36, Daughter: 9", "Mother: 40, Daughter: 10"],
        answer: "Mother: 32, Daughter: 8"
    },
    {
        question: "Q. The ages of A and B are in the ratio 5:7. If the sum of their ages is 48, find their ages.",
        choices: ["20, 28", "25, 35", "30, 42", "35, 49"],
        answer: "7.5 hours"
    }, {
        question: "Q. The sum of the ages of two brothers is 24 years. Six years ago, the elder brother was three times as old as the younger one. Find their present ages.",
        choices: ["Elder: 15, Younger: 9", "Elder: 18, Younger: 6", "Elder: 20, Younger: 4", "Elder: 12, Younger: 12"],
        answer: " Elder: 18, Younger: 6"
    }, {
        question: "Q. The present ages of A, B, and C are in the ratio 5:7:9. If the difference between the present ages of A and B is 6 years, find their ages.",
        choices: ["A: 15, B: 21, C: 27", " A: 20, B: 28, C: 36", "A: 25, B: 35, C: 45", "A: 30, B: 42, C: 54"],
        answer: "A: 15, B: 21, C: 27"
    }, {
        question: "Q. The ages of Tom and Jerry are in the ratio 3:5. If the sum of their ages is 40 years, find their ages.",
        choices: ["Tom: 12, Jerry: 28", " Tom: 15, Jerry: 25", "Tom: 18, Jerry: 22", " Tom: 20, Jerry: 30"],
        answer: "Tom: 15, Jerry: 25"
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
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);
        
    // Adding event listener to each choice for selection
        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            }
            else {
                choiceDiv.classList.add('selected');
            }
        });
    }
    // Adding event listener to each choice for selection
    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
    // Displaying current score
    currentScore.textContent = `Score: ${score}`;
    choicesBox.appendChild(currentScore);
}

// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        // Increment score for correct answer
        score++;
    }
    else {
         // Deduct points for wrong answer
    }
    timeLeft = 10;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
         // If all questions are answered, stop timer and display score
        stopTimer();
        showScore();
    }
}

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
    const userName = localStorage.getItem('userName');
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
    const homeLink = document.createElement('a');
    homeLink.classList.add('linked')
    homeLink.href = 'home.html';
    homeLink.textContent = 'Home Page';
    scoreCard.appendChild(homeLink);
    
}



// Function to Start Timer
const startTimer = () => {
    startTime = Date.now(); // Recording start time
    clearInterval(timerID); // Check for any exist timers
    timer.textContent = timeLeft; // Displaying initial time

    const countDown = ()=>{
        timeLeft--;
        timer.textContent = timeLeft;
        
    // If time is up, prompt user to play again
        if(timeLeft === 0){
            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
            if(confirmUser){
                // Resetting timer for next question
                timeLeft = 10;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

// Function to Stop Timer
const stopTimer = () =>{
    endTime = Date.now();
    clearInterval(timerID);
}

// Function to shuffle question
const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// Function to Start Quiz
const startQuiz = () =>{
    timeLeft = 10;
    timer.style.display = "flex";
    questionNumber.style.display = 'block';
    shuffleQuestions();
}

// Adding Event Listener to Start Button
startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        // alert("Select your answer");
        alert('select an option');
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = ""; // Clearing score card display
        currentQuestionIndex = 0; // Resetting question index
        quizOver = false;
        score = 0;
        startQuiz();

    }
    else {
        checkAnswer();
    }
});