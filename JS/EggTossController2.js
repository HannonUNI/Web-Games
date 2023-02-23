var currentNest
var nextNest
var globalProbability = 7
var difficulty
var jungle = document.getElementById("jungle")
var leftBorder = jungle.offsetLeft
var rightBorder = jungle.offsetLeft + jungle.offsetWidth
var activeNests = []

class Difficulty {
    constructor(diff) {
        if (diff == 1) {
            this.difficulty = 1
            this.probability = 7
            this.minSpeed = 3
            this.maxSpeed = 5
        } else if (diff == 2) {
            this.difficulty = 2
            this.probability = 5
            this.minSpeed = 5
            this.maxSpeed = 7
        } else if (diff == 3) {
            this.difficulty = 3
            this.probability = 3
            this.minSpeed = 6
            this.maxSpeed = 9
        }
    }
}

class Nest {
    constructor(x, y, isMove, speed) {
        this.x = x
        this.y = y
        this.isMove = isMove
        this.speed = speed
        this.isGoingRight = true
        this.interval = null
        this.element = document.createElement("img")
        this.element.src = "../media/nest.svg"
        this.element.className = "nest"
    }
}

class Egg {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

function init() {
    resetJungle()
    var d = document.getElementById("difficulty").value
    difficulty = new Difficulty(d)
    currentNest = new Nest(0, 0, false, 0)
    currentNest.element.setAttribute("id", "currentNest")
    activeNests.push(currentNest)
    jungle.appendChild(currentNest.element)

    nextNest = new Nest(0, 5, false, 0)
    nextNest.element.setAttribute("id", "nextNest")
    activeNests.push(nextNest)
    jungle.appendChild(nextNest.element)
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function createNest(currentNest) {
    var rando = getRandomInt(0, 9)
    speed = getRandomInt(difficulty.minSpeed, difficulty.maxSpeed)
    speed = (speed == currentNest.speed) ? speed - 1 : speed

    x = getRandomInt(0, jungle.offsetWidth - 110)
    y = 1
    if (rando <= difficulty.probability) { // the lower the probability, the more likely it is to create an easy nest
        if (!currentNest.isMove) {
            speed = (difficulty != 1) ? speed : speed - 1 // if the difficulty is ez, dont make slower nest, else make it slower (ezier)
            return new Nest(x, y, true, speed) // ezier nest
        }
        else {
            rando = getRandomInt(0, 9)
            if (rando <= difficulty.probability)
                return new Nest(x, y, false, 0)
            else
                return new Nest(x, y, true, speed)
        }
    } else {
        speed = (difficulty != 1) ? speed : speed - 1 // if the difficulty is ez, dont make slower nest, else make it slower (ezier)
        return new Nest(x, y, true, speed)
    }
}

function deployNest() {
    document.getElementById("currentNest").remove()
    activeNests.shift()

    var nextNestElement = document.getElementById('nextNest')
    nextNestElement.setAttribute('id', 'currentNest')
    nextNestElement.src = "../media/eggNest.svg"
    
    activeNests[0].y = 403
    // console.log(activeNests[0].element.offsetHeight);
    // console.log(activeNests[0].y);
    // console.log(jungle.offsetHeight);
    
    

    let nest = createNest(activeNests[0])
    nest.element.setAttribute("id", "nextNest")
    nest.element.style.left = nest.x + "px"
    nest.element.style.top = nest.y + "px"
    jungle.appendChild(nest.element)
    activeNests.push(nest)

    moveNestY(activeNests[0])

    if (nest.isMove) {
        moveNestX(nest)
    }
}

function moveNestY(nest) {
    tempSpeed = nest.speed
    nest.speed = 0
    z = setInterval(() => {
        if (nest.y < jungle.offsetHeight - nest.element.offsetHeight - 10) {
            nest.y++
            nest.element.style.top = nest.y + "px"
        } else {
            clearInterval(z)
        }
    }, 50)
    nest.speed = tempSpeed

}

function moveNestX(nest) {
    nest.interval = setInterval(() => {
        if (nest.x + leftBorder + 110 >= rightBorder || nest.x + leftBorder <= leftBorder) {
            nest.isGoingRight = !nest.isGoingRight
            nest.speed = -nest.speed
        }
        nest.x += nest.speed
        nest.element.style.left = nest.x + "px"

    }, 50)
}


function resetJungle() {
    if (activeNests.length > 0) {
        jungle.removeChild(document.getElementById("currentNest"))
        jungle.removeChild(document.getElementById("nextNest"))
        activeNests = []
    }
}

addEventListener("keydown", (event) => {
    console.log(event.key)

    if (event.key == " ") {
        deployNest()
    }
})
// for (var i = 0; i < activeNests.length; i++) {
//     if (activeNests[i].isGoingRight) {
//         activeNests[i].x += activeNests[i].speed
//         if (activeNests[i].x >= rightBorder) {
//             activeNests[i].isGoingRight = false
//             activeNests[i].speed = -activeNests[i].speed
//         }
//     } else {
//         activeNests[i].x -= activeNests[i].speed
//         if (activeNests[i].x <= leftBorder) {
//             activeNests[i].isGoingRight = true
//             activeNests[i].speed = -activeNests[i].speed
//         }
//     }
//     activeNests[i].element.style.left = activeNests[i].x + "px"
// }



/* 
var nest = document.getElementById("nest")
var i = 0
var isGoingRight = true
var x = setInterval(() => {
    nest.style.left = (i) + 'px'
    if (i == -1) {
        clearInterval(x)
    }
    if (i + leftBorder + nest.offsetWidth >= rightBorder)
        isGoingRight = false
    if (i + leftBorder <= leftBorder)
        isGoingRight = true

    if (isGoingRight)
        i += 9
    else
        i -= 9
}, 50)
 */