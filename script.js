let moles = document.querySelectorAll(".mole");
let holes = document.querySelectorAll(".hole");
let score_board = document.querySelector(".game_score-number");
let btn = document.querySelectorAll(".textToGo");
let modal = document.querySelector('.modal');
let body = document.querySelector("body");
let levelType = document.querySelector('.game_level-type');
let score,
    lastHole,
    timeIsUp,
    level,
    countMole,
    timerId;
let levelId = 0;
let win = false;
let gameTime = 0;
let preparedTime = 1500;

function getRandom(holes) {
    let id = Math.floor(Math.random() * holes.length);
    let hole = holes[id];
    if (lastHole === hole) {
        return getRandom(holes);
    }
    else {
        lastHole = hole;
        return hole;
    }
};

function getRandomTime(min, max) {
    return Math.floor(Math.random() * (max - min) + min);

};
function showMole() {
    let hole = getRandom(holes);
    const time = getRandomTime(level.min, level.max);
    console.log(time);
    hole.classList.add('up');
    countMole++;
    setTimeout(
        function () {
            hole.classList.remove('up');
            if (!timeIsUp) showMole();
        }, time);
};

function start() {
    level = levelData[levelId];
    levelType.textContent = level.titleLevel;
    score = 0;
    countMole = 0;
    body.classList.add('start');
    setTimeout(function () {
        timeIsUp = false;
        showMole();
        setTimeout(function () {
            timeIsUp = true;
            if (isWin() && createLevel()) {
                start();
            }
            else {
                gameOver();
            }

        }, level.timeLimit);
    }, preparedTime)
};

function catchUp() {
    score++;
    score_board.textContent = ++score_board.textContent;
    this.parentNode.classList.remove('up');
};

for (let i = 0; moles.length > i; i++) {
    moles[i].addEventListener("click", catchUp);
}
;

btn[0].addEventListener('click', start);
btn[0].addEventListener('click', startTimeGame);
btn[1].addEventListener('click', function () {
    modal.classList.remove('active');
    body.classList.remove('start');
    Reset();
});

function startTimeGame() {
    timerId = setInterval(function () {
        gameTime += 1000;
    }, 1000);
}
function stopTime() {
    clearInterval(timerId);
}


function createLevel() {
    if (levelData.length - 1 == levelId) {
        win = true;
        gameOver();
        return;
    }
    levelId++;
    return true;
};

function isWin() {
    return score / countMole >= levelData[levelId].mustScore;

};

function gameOver() {
    Render();
    stopTime();
};

function Reset() {
    score_board.textContent = 0;
    levelId = 0;
    gameTime = 0;
    win = false;
}

function Render() {
    let texts = ['You lose', 'You won'];
    let text = document.querySelector('.result_text');
    let score = document.querySelector('.result_score');
    let time = document.querySelector('.result_time');
    if (win) {
        text.textContent = texts[1];
    }
    else {
        text.textContent = texts[0];
    }
    modal.classList.add('active');
    score.textContent = score_board.textContent;
    time.textContent = getTime(gameTime);

};

function getTime(gameTime) {
    let time = new Date(gameTime);
    let sec = time.getSeconds();
    let min = time.getMinutes();
    let template;
    if (sec < 10) {
        sec = 0 + sec;
    }
    if (min < 10)
        min = 0 + min;
    return template = min + ":" + sec;
}

levelData = [
    {
        titleLevel: 'junior',
        min: 800,
        max: 1000,
        mustScore: 0.5,
        timeLimit: 10000

    },
    {
        titleLevel: 'middle',
        min: 600,
        max: 1000,
        mustScore: 0.6,
        timeLimit: 12000
    },
    {
        titleLevel: 'senior',
        min: 500,
        max: 1000,
        mustScore: 0.7,
        timeLimit: 15000
    }
];

