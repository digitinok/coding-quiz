// ordered list
let highscores = document.getElementById("highscores");
// high score clear button
let clearButton = document.getElementById("clear");

//let scores = JSON.parse(localStorage.getItem("scores"));

function renderHighScores () {
    highscores.innerHTML = "";
    let scores = JSON.parse(localStorage.getItem("scores"));
    if (scores === null) {return}
    // descending order of scores
    scores.sort((a, b) => b.score - a.score);
    console.log(scores)
    for (let i=0; i<scores.length; i++) {
        let li = document.createElement("li");
        li.textContent = `\t ${scores[i].initials} \t ${scores[i].score}`;
        highscores.appendChild(li);
    }
}



// set new submission
//localStorage.setItem("scores", JSON.stringify(scores));

//localStorage.removeItem("mytime");

renderHighScores ()

clearButton.addEventListener("click", function (event) {
    event.preventDefault;
    localStorage.removeItem("scores");
    renderHighScores();
})