let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let highScore = 0;

let btns = ["red", "green", "yellow", "purple"]; 
let h2 = document.querySelector("h2");
let scoreBord = document.querySelector("#scorebord");

document.addEventListener("click", function() {
    if (started == false) {
        levelUp();
        started = true
    }
    scoreBord.innerText = `Highest Score: ${highScore}`;
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    highScore = Math.max(highScore, level);
    scoreBord.innerText = `Highest Score: ${highScore}`;
    
    // Random btn choose
    let randIdx = (Math.floor(Math.random() * 69 + 4)) % 4;
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    btnFlash(randBtn);
}

function checkAns(idx) {
    if (gameSeq[idx] === userSeq[idx]) {
        if (gameSeq.length === userSeq.length) {
            setTimeout(function() {
                levelUp();
            }, 1000);
        }
    } else {
        highScore = Math.max(highScore, level);
        scoreBord.innerText = `Highest Score: ${highScore}`;
        h2.innerHTML = `Game Over! Your score is ${level} <br> Press any key to start again`;
        reset();
    }
}

function btnPress() {
    let btn = this;
    if (started == true) {
        btnFlash(btn);
        userColor = btn.getAttribute("id");
        userSeq.push(userColor);
        checkAns(userSeq.length - 1);
    }
}
 
let allBtns = document.querySelectorAll(".btn");

for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    highScore = Math.max(highScore, level);
    level = 0;
}
