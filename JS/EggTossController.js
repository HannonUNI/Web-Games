const canvas = document.getElementById('canvas');
canvas.style.border = '1px solid black'; // border around the canvas *********************************************************

canvas.width = innerWidth / 4;
canvas.height = innerHeight - 400;
canvas.style.margin = "auto";

const ctx = canvas.getContext('2d');

class Egg {
    constructor(x, y, r, velX, velY, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
    }

    draw(x, y) {
        if (x != undefined) {
            this.x = x;
        }
        if (y != undefined) {
            this.y = y;
        }
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.r, Math.PI * 2,false);
        ctx.fill();
    }
}
let player = new Egg(canvas.width / 2, canvas.height - 20, 15, 0, 0, 'red');
player.draw();

addEventListener('keydown', function (e) {
    let nplayer = new Egg(player.x, player.y, 15, 0, 0, 'red');
    
    if (e.key === 'ArrowLeft') {
        player.x -= 5;  // left arrow
        console.log('left');
    } else if (e.key === 'ArrowRight') {
        player.x += 5;  // right arrow
        console.log('right');
    } else if (e.key === 'ArrowUp') {
        player.y -= 5;  // up arrow
        console.log('up');
    } else if (e.key === 'ArrowDown') {
        player.y += 5;  // down arrow
        console.log('down');
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nplayer.draw();

})