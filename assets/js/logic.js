
// time element
let timeEl = document.getElementById("time");
let time = 60; // 60 sec time for the quiz

let score = 0;

// getting div elements from the wrapper to target what to show
let startScreen = document.getElementById("start-screen");
let questionScreen = document.getElementById("questions");
let endScreen = document.getElementById("end-screen");
let feedbackScreen = document.getElementById("feedback");

// Elements from start screen div
let startButton = document.getElementById("start");

// Elements from end screen div
let finalScore = document.getElementById("final-score");
let initials = document.getElementById("initials");
let submitButton = document.getElementById("submit");

// Elements from questions div
let questionTitle = document.getElementById("question-title");
let questionChoices = document.getElementById("choices");
// first question
let questionNumber = 0;


// start button event handler to start the quiz
startButton.addEventListener("click", function (event) {
    event.preventDefault;
    // hide start screen
    startScreen.setAttribute("class", "hide");

    // start timer
    timeEl.textContent = time;
    myTimer = setInterval(function () {
        // count down timer every second and finish when time is 0
        if (time <= 0) {
            clearInterval(myTimer);
            displayScore ();
        } else {
            time--; 
        }
        timeEl.textContent = time;
    }, 1000);

    // Display the first question
    displayQuestion (0)
    }   
)

// submitting score to high score list
submitButton.addEventListener("click", function (event) {
    event.preventDefault;
    console.log(initials.value)

    // get most recent submission
    let scores = JSON.parse(localStorage.getItem("scores"));
    console.log(scores)
    if (scores === null) {
        scores = [{initials: initials.value.trim(), score: score}]
    } else {
        scores.push({initials: initials.value.trim(),score: score})
    }
    // set new submission
    localStorage.setItem("scores", JSON.stringify(scores));

    window.location.href = "highscores.html"
})

function displayQuestion (questionNumber) {
    //display the question and answer choises

    questionTitle.textContent = questions[questionNumber].title;
    // Empty answer choices div
    questionChoices.innerHTML = ""

    for (let i = 0; i < questions[questionNumber].choices.length; i++) {

        let choiceButton = document.createElement("button")
        choiceButton.textContent = questions[questionNumber].choices[i];
        questionChoices.appendChild(choiceButton);
        choiceButton.addEventListener("click", function(event){
            event.preventDefault;
            checkAnswer (questionNumber, choiceButton.textContent)
        })
    }
    //questionChoices.textContent = questions[questionNumber].choices;
  
    questionScreen.setAttribute("class", "start")

}

function checkAnswer (questionNumber, givenAnswer) {
    // visible feedback
    feedbackScreen.setAttribute("class", "feedback")

    if (givenAnswer === questions[questionNumber].answer) {
        feedbackScreen.textContent = "Well Done!";
        let audioR = new Audio('assets/sfx/correct.wav');    
        audioR.play()
        score++;
    } else {
        feedbackScreen.textContent = "Think Again!";
        let audioW = new Audio('assets/sfx/incorrect.wav');    
        audioW.play()
        // decreasing timer
        if (time > 10) {
            time -= 10;
        } else {
            time = 0;
        }


    }

    const myTimeout = setTimeout(function () {feedbackScreen.setAttribute("class", "feedback hide")}, 2000);
    questionNumber++;
    if (questionNumber < questions.length) {
        displayQuestion (questionNumber)
    } else {
        score += time;
        clearInterval(myTimer);
        displayScore();
    }

}

function displayScore () {
    questionScreen.setAttribute("class", "hide");
    endScreen.setAttribute("class", "start");
    finalScore.textContent = score;
}