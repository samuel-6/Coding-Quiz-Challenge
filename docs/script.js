const main = document.querySelector("main");
const viewHighscoresBtn = document.getElementById("view-highscores");
const timerEl = document.getElementById("timer");

let questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
        correctAnswer: 2,
   },
    {
        title: "The condition in an if / else statement is enclosed within _____.",
        choices: ["1. Quotes", "2. Curly Brackets", "3. Parenthesis", "4. Square Brackets"],
        correctAnswer: 2,
    },
    {
        title: "Arrays in JavaScript can be used to store _____.",
        choices: ["1. Numbers and Strings", "2. Other Arrays", "3. Booleans", "4. All Of The Above"],
        correctAnswer: 3,
    },
    {
        title: "String values must be enclosed within _____ when being assigned to variables.",
        choices: ["1. Commas", "2. Curly Brackets", "3. Quotes", "4. Parenthesis"],
        correctAnswer: 2,
    },
];

let time = 60;
let timer;
let score = 0;
let questionIndex = 0;

function startTimer() {

    timer = setInterval(function () {

        time--;
        timerEl.textContent = `Time: ${time}`;

        if (time <= 0) {

            gameOver();

        }
    }, 1000);
}

function displayQuestion() {

    // Clear main content
    main.innerHTML = "";

    // Display question and choices
    let currentQuestion = questions[questionIndex];
    let questionTitle = document.createElement("h1");
    questionTitle.textContent = currentQuestion.title;
    main.appendChild(questionTitle);

    for (let i = 0; i < currentQuestion.choices.length; i++) {

        let choiceBtn = document.createElement("button");
        choiceBtn.textContent = currentQuestion.choices[i];
        choiceBtn.id = `choice-${i}`;
        choiceBtn.addEventListener("click", function(){

            checkAnswer(i);

        })
        main.appendChild(choiceBtn);
        

    }
}

function checkAnswer(choice) {

    let currentQuestion = questions[questionIndex];
    let isCorrect = choice === currentQuestion.correctAnswer;

    // Display result message.
    let resultMessage = document.createElement("div");
    resultMessage.textContent = isCorrect ? "Correct!" : "Wrong!";
    main.appendChild(resultMessage);

    // Update score or time.
    if (isCorrect) {

        score += 10;

    }
    else {

        time -=10;

    }

    // Move to the next question.
    questionIndex++;

    if (questionIndex < questions.length) {

        setTimeout(function(){

            main.removeChild(resultMessage);
            displayQuestion();

        }, 1000);

    }
    else {

        setTimeout(function(){

            main.removeChild(resultMessage);
            gameOver();

        }, 1000);

    }

}

function gameOver() {

    clearInterval(timer);
    timerEl.textContent = "Time: 60";
    main.innerHTML = "";

    let heading = document.createElement("h1");
    heading.textContent = "All done!";
    main.appendChild(heading);

    let finalScore = document.createElement("p");
    finalScore.textContent = `Your final score is ${score}.`;
    main.appendChild(finalScore);

    let initialsLabel = document.createElement("p");
    initialsLabel.textContent = "Enter initials:";
    main.appendChild(initialsLabel);

    let initialsInput = document.createElement("input");
    initialsInput.type = "text";
    initialsInput.id = "initials";
    initialsInput.maxLength = 3;
    main.appendChild(initialsInput);

    let submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";
    submitBtn.addEventListener("click", saveScore());
    main.appendChild(submitBtn);

}

function saveScore() {

    let initials = document.getElementById("initials").value;
    let highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    let newScore = { initials: initials, score: score };

    highscores.push(newScore);
    highscores.sort((a, b) => b.score - a.score);
    localStorage.setItem("highscores", JSON.stringify(highscores));

    displayHighscores();

}

function displayHighscores() {

    main.innerHTML = "";

    let heading = document.createElement("h1");
    heading.textContent = "Highscores";
    main.appendChild(heading);

    let highscoresList = document.createElement("ol");
    main.appendChild(highscoresList);

    let highscores = JSON.parse(localStorage.getItem("highscores")) || [];

    highscores.forEach((entry) => {

        let listItem = document.createElement("li");
        listItem.textContent = `${entry.initials} - ${entry.score}`;
        highscoresList.appendChild(listItem);

    });

    let goBackBtn = document.createElement("button");
    goBackBtn.textContent = "Go back";
    goBackBtn.addEventListener("click", resetGame);
    main.appendChild(goBackBtn);

    let clearHighscoresBtn = document.createElement("button");
    clearHighscoresBtn.textContent = "Clear highscores";
    clearHighscoresBtn.addEventListener("click", clearHighscores);
    main.appendChild(clearHighscoresBtn);

}

function clearHighscores() {

    localStorage.removeItem("highscores");
    displayHighscores();
    
}

function resetGame() {

    time = 60;
    score = 0;
    questionIndex = 0;
    displayStartScreen();
    
}

function startQuiz() {

    startTimer();
    displayQuestion();

}