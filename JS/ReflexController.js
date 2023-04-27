var gameArea = document.getElementById('gameArea');
var canClick = false;
var badClick = false;
var isLost = false;
var isCountDown = false;
var timeOut;
var randoTimeOut;
var resultCounter = 1;
function start() {
    var i = 3;
    isCountDown = true;

    countDownInterval = setInterval(function () {
        if (i < 1) {
            isCountDown = false;
            clearInterval(countDownInterval);
            i = '<h1>wait for it</h1>';
            randoTimer();
            gameArea.innerHTML = '<h1>' + i + '<h1/>';
            return;
        }
        gameArea.innerHTML = '<h1>' + i + '<h1/>';
        i--;
    }, 1000)
}

function randoTimer() {
    console.log('timer');

    var rando = getRandomInt(0, 15);
    badClick = true;
    canClick = true;

    randoTimeOut = setTimeout(function () {
        if (isLost) {
            isLost = false;
            clearTimeout(randoTimeOut);
            return
        }

        gameArea.style.backgroundColor = 'tomato';
        badClick = false;
        //start timer
        var since = new Date();
        var timerInterval = setInterval(() => {
            now = new Date();
            var time = now.getTime() - since.getTime()
            gameArea.innerHTML = time + " ms";
            if (!canClick) {
                resetAll();
                showResult(time);
                clearInterval(timerInterval);
            }
        }, 10)

    }, (rando * 1000))
}
function resetAll(countUp) {
    gameArea.style.backgroundColor = '#302b61';
    gameArea.innerHTML = '<h1>Click me to go again</h1>';
    // countUp.remove();
}

function getRandomInt(minn, maxx) {
    return Math.random() * (maxx - minn) + minn;
}

function showResult(time) {
    var result = document.getElementById('record');
    if (resultCounter >= 11) {
        resultCounter = 1;
        result.innerText = ' '
    }
    result.innerHTML += resultCounter++ + '-try--> ' + time / 1000 + 's<br>';
}

function lost() {
    // isLost = true;
    clearTimeout(randoTimeOut);
    badClick = false;
    gameArea.innerHTML = '<h1>Too early :( try again!! :)</h1>'

    gameArea.innerHTML += "<h2>Instructions:</h2><h3>1- click to start</h3><h3>2- wait for the initial count down from 3</h3><h3>3- when the button turns red, click it as fast as you can</h3><h3>do get frustrated, it helps :P</h3>"

    var result = document.getElementById('record');
    if (resultCounter >= 10) {
        resultCounter = 1;
        result.innerText = ' '
    }
    result.innerHTML += resultCounter++ + '-try--> ' + 'FAIL <br>';
}

//right ckick
gameArea.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});
//left click
gameArea.addEventListener('click', (e) => {
    if (isCountDown) return;
    if (canClick) {
        canClick = false;
        if (badClick)
            lost();
    } else {
        start();
    }
});
// remmember whe n the guy in thr brown shirt, last time said that theres 30 mins left
