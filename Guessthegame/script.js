const questions = [
    {hint: "I keep time and can be worn on the wrist.", answer: "watch"},
    {hint: "I have keys but no locks, I have space but no room.", answer: "keyboard"},
    {hint: "You use me to write on paper, I am not a pencil.", answer: "pen"},
    {hint: "I can be cracked, made, told, and played.", answer: "joke"},
    {hint: "I light up a room but I am not the sun.", answer: "bulb"}
];

let players = [];
let scores = [];
let currentQuestionIndex = 0;
let currentPlayerIndex = 0;
let questionCount = 0;

function setupPlayers() {
    const count = document.getElementById("player-count").value;
    const container = document.getElementById("player-names");
    container.innerHTML = "";

    if (count < 1 || count > 4) {
        alert("Please enter a number between 1 and 4");
        return;
    }

    for (let i = 0; i < count; i++) {
        container.innerHTML += `<p>Player ${i+1} Name: <input type='text' id='player${i}'></p>`;
    }
    container.innerHTML += `<button class='vibrant' onclick='startGame(${count})'>Start Game</button>`;
}

function startGame(count) {
    for (let i = 0; i < count; i++) {
        const name = document.getElementById(`player${i}`).value.trim();
        if (!name) {
            alert("Please enter all player names");
            return;
        }
        players.push(name);
        scores.push(0);
    }
    document.getElementById("player-setup").style.display = "none";
    document.getElementById("game-area").style.display = "block";
    loadQuestion();
}

function loadQuestion() {
    const q = questions[currentQuestionIndex % questions.length];
    document.getElementById("hint").innerText = `Hint: ${q.hint}`;
    document.getElementById("answer-input").value = "";
    document.getElementById("current-player").innerText = `Current Player: ${players[currentPlayerIndex]}`;
}

function submitAnswer() {
    const answer = document.getElementById("answer-input").value.trim().toLowerCase();
    const correctAnswer = questions[currentQuestionIndex % questions.length].answer;
    if (answer === correctAnswer) {
        alert("Correct!");
        scores[currentPlayerIndex] += 1;
    } else {
        alert(`Wrong! The correct answer was ${correctAnswer}`);
    }

    currentQuestionIndex++;
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    questionCount++;

    if (questionCount % (players.length * 2) === 0) {
        showScores();
    }

    loadQuestion();
}

function showScores() {
    const scoreboard = document.getElementById("scoreboard");
    const scoreList = document.getElementById("score-list");
    scoreList.innerHTML = "";
    players.forEach((player, index) => {
        scoreList.innerHTML += `<li>${player}: ${scores[index]}</li>`;
    });
    scoreboard.style.display = "block";
}
