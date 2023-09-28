const walker = document.createElement('div');
walker.classList.add('walker');
document.body.appendChild(walker);

// Set up the initial position of the walker
let position = 0;

// Define the sprite sheet width, height, and number of frames
const spriteWidth = 64; // Width of a single frame in the sprite sheet
const spriteHeight = 64; // Height of a single frame in the sprite sheet
const numFrames = 4; // Number of frames in the sprite sheet

walker.style.width = `${spriteWidth}px`;
walker.style.height = `${spriteHeight}px`;
walker.style.background = `url('https://i.pinimg.com/736x/4a/6c/06/4a6c064c30d2346481000e1cf07ce952--sprites-zelda.jpg') no-repeat`;
walker.style.position = 'absolute';
walker.style.top = '50%';
walker.style.left = '50%';
walker.style.transform = 'translate(-50%, -50%)';

// Create and start the animation
function animate() {
    position = (position + spriteWidth) % (spriteWidth * numFrames);
    walker.style.backgroundPosition = `-${position}px 0`;

    requestAnimationFrame(animate);
}

animate();
