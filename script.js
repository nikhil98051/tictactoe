let player = 'X';
let gameOver = false;

var interval;
var minute = "00";
var second = 60;
var count = 0;

//change player start
function changePlayer() {
    player = (player === 'X') ? 'O' : 'X';
}

//change Player ends

//draw start
function draw() {
    gameOver = true;
    document.querySelector("h3").innerText = "TimeOut! Match Invalid."
}
//draw end

//timer function start
function pauseTimer() {
    clearInterval(interval);
    return;
}

function startTimer() {

    second = 60;

    timer();
}

function timer() {

    second--;
    clearInterval(interval);

    document.getElementsByClassName("timer-won-draw")[0].innerText = minute + " : " + second.toString().padStart(2, '0');
    if (gameOver) {
        pauseTimer();
        return;
    }
    if (second === 0) {
        if (count == 0) {
            draw();
        } else {
            changePlayer();
            gameOver = true;
            document.querySelector("h3").innerText = "TimeOut! " + player + " Won."
        }

        pauseTimer();
        return;
    }
    interval = setInterval(timer, 1000);
}
//timer function ends


//Start button start
let start = document.querySelector(".reset");

start.addEventListener("click", () => {
    let boxes = document.getElementsByClassName("boxText");

    boxes = Array.from(boxes);

    for (var i = 0; i < boxes.length; i++) {
        box = boxes[i];
        box.innerText = "";
    }
    count = 0;

    gameOver = false;
    player = 'X';

    document.querySelector("h3").innerHTML = "Its the turn of " + player;
    console.log(document.getElementsByClassName("reset")[0].innerText);
    document.getElementsByClassName("reset")[0].innerText = "Restart";
    startTimer();
});

//stat button ends

//checkWon start
function checkWon() {
    let boxTexts = document.getElementsByClassName("boxText");

    let winPos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    winPos.forEach((ele) => {
        if (boxTexts[ele[0]].innerText === boxTexts[ele[1]].innerText && boxTexts[ele[1]].innerText === boxTexts[ele[2]].innerText && boxTexts[ele[0]].innerText !== "") {
            gameOver = true;
        }
        startTimer();
    });
}

//checkWon ends.



let boxes = document.getElementsByClassName("box");

Array.from(boxes).forEach((box) => {
    let boxText = box.getElementsByClassName("boxText")[0];

    box.addEventListener("click", () => {
        if (boxText.innerText === "" && !gameOver) {
            boxText.innerText = player;
            count++;
            checkWon();
            if (gameOver) {
                document.querySelector("h3").innerText = "Player  " + player + " won";
                return;
            }
            if (count == 9) {
                pauseTimer();
                document.querySelector("h3").innerText = "Game Draw! Please Restart ";
                return;
            }
            changePlayer();
            document.querySelector("h3").innerText = "Its the turn of " + player;

        }
    });
});