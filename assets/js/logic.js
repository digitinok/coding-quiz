

let time = document.getElementById("time");

// getting div elements from the wrapper to target what to show
let startScreen = document.getElementById("start-screen");
let questionScreen = document.getElementById("questions");
let endScreen = document.getElementById("end-screen");
let feedbackScreen = document.getElementById("feedback");

// Elements from start screen div
let startButton = document.getElementById("start");

// Elements from questions div
let questionTitle = document.getElementById("question-title");
let questionChoices = document.getElementById("choices");
// first question
let questionNumber = 0;

startButton.addEventListener("click", function (event) {
    event.preventDefault;
    // Display the first question
    displayQuestion (0)
}
)

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
    startScreen.setAttribute("class", "hide");
    questionScreen.setAttribute("class", "start")
}

function checkAnswer (questionNumber, givenAnswer) {

    if (givenAnswer === questions[questionNumber].answer) {
        console.log("right")
        feedbackScreen.setAttribute("class", "feedback")
        feedbackScreen.textContent = "Well Done!";
        let audioR = new Audio('assets/sfx/correct.wav');    
        audioR.play()
    } else {
        console.log("wrong")
        feedbackScreen.setAttribute("class", "feedback")
        feedbackScreen.textContent = "Think Again!";
        let audioW = new Audio('assets/sfx/incorrect.wav');    
        audioW.play()
    }
}

