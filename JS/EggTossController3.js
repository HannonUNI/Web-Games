const maxRight = 400 - 80
const maxLeft = 0
const newNestStartY = -190
const nextNestMaxY = 120
const currentNestMaxY = 440
var currentNest
var nextNest
var myEgg
var first = true
var openHelpBool = false
var maxSpeed = 5
var minSpeed = 3
var probability = 0.6
var score = 0
var cheat1bool = false
var cheat2bool = false
var cheatBox = document.getElementById("cheatBox")
var keyboardEvent = document.createEvent('KeyboardEvent');
var gameInterval

function startGame() {
    // nest(width, height, x, y, isMove)
    currentNest = null
    nextNest = null
    myEgg = null

    jumpSound = document.createElement("audio");
    jumpSound.src = "../media/egg toss/jump.flac";
    jumpSound.setAttribute("preload", "auto");
    jumpSound.setAttribute("controls", "none");
    jumpSound.style.display = "none";
    document.body.appendChild(jumpSound);
    dieSound = document.createElement("audio");
    dieSound.src = "../media/egg toss/die.flac";
    dieSound.setAttribute("preload", "auto");
    dieSound.setAttribute("controls", "none");
    dieSound.style.display = "none";
    document.body.appendChild(dieSound);

    currentNest = new nest(currentNestMaxY, true)
    myEgg = new egg(currentNest.x + 10, currentNest.y - 30)
    nextNest = new nest(nextNestMaxY, true)
    myGameArea.start()
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 400
        this.canvas.height = 550
        this.context = this.canvas.getContext("2d")
        document.getElementById("jungle").appendChild(this.canvas)
        // gameInterval = this.interval = setInterval(updateGameArea, 20)
        updateGameArea()
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}


function updateGameArea() {
    myGameArea.clear()
    myEgg.update()
    currentNest.update()
    nextNest.update()
    if (cheat1bool == true)
        cheat1()
    if (cheat2bool == true)
        autoJump()
    if (myEgg.gameOver)
        return
    requestAnimationFrame(updateGameArea);

}
function cheat1() {
    if (myEgg.isAttach) {
        xDistance = nextNest.x - myEgg.x
        time = xDistance / nextNest.speed

        if (time > 40 && time < 60 || time < -50 && time > -70)
            cheatBox.innerHTML = "🥚Jump!"
        else if (nextNest.isMove == false && currentNest.isMove && myEgg.x + 22.5 >= nextNest.x + 12 + 5 && myEgg.x + 22.5 <= nextNest.x + nextNest.width - 12)
            cheatBox.innerHTML = "🥚Jump!"
        else
            cheatBox.innerHTML = ""
    }
}
function autoJump() {
    if (!myEgg.jump && myEgg.isAttach) {

        distance = nextNest.x - myEgg.x
        time = distance / nextNest.speed

        if ((!nextNest.isMoveRight && time > 40 && time < 50) || (nextNest.isMoveRight && time < -50 && time > -60))
            document.dispatchEvent(new KeyboardEvent('keydown', { 'key': ' ' }));
        else if (nextNest.isMove == false && myEgg.x + 22.5 >= nextNest.x + 15 + 5 && myEgg.x + 22.5 <= nextNest.x + nextNest.width - 15)
            document.dispatchEvent(new KeyboardEvent('keydown', { 'key': ' ' }));
        else if (nextNest.isMove == true && currentNest.isMove && nextNest.x + nextNest.width > maxRight && myEgg.x + myEgg.width > maxRight)
            document.dispatchEvent(new KeyboardEvent('keydown', { 'key': ' ' }));


    }
}
async function doGameOver() {
    dieSound.play()
    await clearInterval(gameInterval);
    myEgg.gameOver = true


    currentNest = null
    nextNest = null
    myEgg = null


    openHelpBool = false
    maxSpeed = 5
    minSpeed = 3
    probability = 0.6
    score = 0
    // cheat1bool = false
    // cheat2bool = false
    cheatBox = document.getElementById("cheatBox")
    keyboardEvent = document.createEvent('KeyboardEvent');



    overPanel = document.getElementById("gameOver")
    overPanel.style.display = "block"
    first = true
    overPanel.addEventListener("click", function (e) {
        clearInterval(gameInterval);
        first = true

        overPanel.style.display = "none"
        myGameArea.clear()
        startGame()
    })
}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
function egg(x, y) {
    this.x = x
    this.y = y
    this.width = 45
    this.height = 55
    this.image = new Image()
    this.image.src = "../media/egg toss/egg.png"
    this.isAttach = true
    this.jump = false
    this.gameOver = false
    this.yVelocity = 19

    this.update = async function () {
        ctx = myGameArea.context
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        if (this.isAttach) {
            this.y = currentNest.y - 15
            this.x = currentNest.x + 19
        }

        if (this.jump) {
            if (!this.gameOver) {
                if (this.yVelocity > 0) {
                    this.y -= this.yVelocity
                    this.yVelocity -= 0.5
                } else {
                    this.y -= this.yVelocity
                    this.yVelocity -= 0.5
                    if (this.y + 50 <= nextNest.y + nextNest.height - 5 && this.y + 50 >= nextNest.y + nextNest.height - 20 && this.x + 22.5 >= nextNest.x + 12 + 5 && this.x + 22.5 <= nextNest.x + nextNest.width - 12) {
                        this.jump = false
                        this.isAttach = true
                        currentNest = nextNest
                        nextNest = new nest(newNestStartY, true)
                        nextNest.moveDown = true
                        this.yVelocity = 19
                        currentNest.moveDown = true
                        document.getElementById("score_value").innerHTML = "Score: " + ++score

                    } else if (this.y > currentNestMaxY) {
                        this.gameOver = true
                        await doGameOver()
                    }
                }
            } else {
                // game over
            }
        }
    }
}

function nest(y, isMove) {
    this.width = 80
    this.height = 40
    this.isMoveRight = true
    this.x = randomInt(300, 5)
    this.y = y
    this.isMove = isMove
    this.image = new Image()
    this.image.src = "../media/egg toss/nest.png"
    this.moveDown = false
    this.i = 0 // i hate this variable idk what to name it and i cant think of a way to get rid of it fk u kindly 😊
    this.speed = 0
    if (!first)
        if (this.isMove == true)
            if (currentNest.isMove == true)
                this.isMove = Math.random() >= probability
    first = false
    if (this.isMove == true)
        this.speed = randomInt(maxSpeed, minSpeed) / 2
    this.update = function () {
        ctx = myGameArea.context
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        if (this.isMove == true && this.moveDown == false) {
            if (this.isMoveRight == true) {
                this.x += this.speed
                if (this.x >= maxRight)
                    this.isMoveRight = false
            }
            else {
                this.x -= this.speed
                if (this.x <= maxLeft)
                    this.isMoveRight = true
            }
        } else if (this.moveDown == true)
            if (this.i <= nextNestMaxY - newNestStartY) {
                this.y += 8
                this.i += 8
            } else {
                this.i = 0
                this.moveDown = false
            }
    }
}

document.addEventListener("keydown", function (event) {
    // how to play audio in js
    if (event.key == " " && myEgg.isAttach == true && myEgg.jump == false && myEgg.gameOver == false && currentNest.moveDown == false) {
        jumpSound.play();

        myEgg.isAttach = false
        myEgg.jump = true
        if (maxSpeed < 10)
            maxSpeed += 0.3
        if (minSpeed < 8)
            minSpeed += 0.2
        if (probability >= 0.1)
            probability -= 0.02
    }
})

document.getElementById("cheats").addEventListener("click", function () {
    if (!openHelpBool) {
        openHelpBool = !openHelpBool
        document.getElementById("cheats_menu").style.display = "block"
    } else {
        openHelpBool = !openHelpBool
        document.getElementById("cheats_menu").style.display = "none"
    }
    // when he clicks on checkbox1


})
// if i hover out of menu then close it
document.getElementById("cheats_menu").addEventListener("mouseleave", function () {

    if (document.getElementById("cheat1").checked) {
        cheat1bool = true
        document.getElementById("cheatBox").style.display = "block"
    } else {
        cheat1bool = false
        document.getElementById("cheatBox").style.display = "none"
    }

    if (document.getElementById("cheat2").checked)
        cheat2bool = true
    else
        cheat2bool = false

    openHelpBool = !openHelpBool
    document.getElementById("cheats_menu").style.display = "none"
})

// document.getElementById("help_menu").addEventListener("mouseenter", function () {

