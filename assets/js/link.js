const canvas = document.getElementById('canvasl');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.onload = animate; // Call animate() once the image is loaded
playerImage.src = 'images/simplelink.png';

const spriteWidth = 21;
const spriteHeight = 30;
let frameX = 0;
let frameY = 0;
let gameFrame = 0;
const staggerFrames = 5;

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    
    if (gameFrame % staggerFrames == 0) {
        if (frameX < 4) frameX++;
        else frameX = 0;
    }

    gameFrame++;
    requestAnimationFrame(animate);
}
