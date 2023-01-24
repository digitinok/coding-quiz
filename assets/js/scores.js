// high score clear button
let clearButton = document.getElementById("clear");
clearButton.addEventListener("click", function (event) {
    event.preventDefault;
    localStorage.removeItem("scores");
    renderHighScores();
})

function renderHighScores () {
    // get ordered list and clear it
    let highscores = document.getElementById("highscores");
    highscores.innerHTML = "";

    // get eisting scores from local storage
    let scores = JSON.parse(localStorage.getItem("scores"));
    if (scores === null) {return} // no scores yet in local storage

    try {
        // descending order of scores displaying highest score first
        scores.sort((a, b) => b.score - a.score);
        // display scores
        for (let i = 0; i < scores.length; i++) {
            let li = document.createElement("li");
            li.textContent = `\t ${scores[i].initials} \t ${scores[i].score}`;
            highscores.appendChild(li);
        }
    } 
    catch (err) {
        alert(["I cannot display the Highscores at the moment!\nSorry, something has gone wrong:\n" + err.message]);
    }
}

renderHighScores ()
