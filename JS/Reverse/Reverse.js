gameArea = document.getElementById("gameArea");

level = 1;

function init() {
    level = document.getElementById("level").value;
    // read jason file with the name of level
    // and create the game area
    file = "../JS/Reverse/levels/" + level + ".json";
    // var request = new XMLHttpRequest();
    // request.open("GET", file, false);
    // request.send(null);

    // var my_JSON_object = JSON.parse(request.responseText);
    // console.log(my_JSON_object);
    // var width = my_JSON_object.area;
    // var height = my_JSON_object.height;

    var width = 500;
    var height = 500;
    createCanvas.start(width, height);
}

var createCanvas = {
    canvas: document.createElement("canvas"),
    start: function (width, height) {
        this.canvas.width = width
        this.canvas.height = height
        this.context = this.canvas.getContext("2d")
        this.canvas.style.backgroundColor = "white";
        gameArea.appendChild(this.canvas)
        // gameInterval = this.interval = setInterval(updateGameArea, 20)
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}