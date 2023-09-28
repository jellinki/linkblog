// Get a reference to the image element
const animatedImage = new Image();
animatedImage.src = "/assets/images/clearheartlink.png"; // Specify the relative path
document.body.appendChild(animatedImage);

// Set initial position and variables
let positionX = 0;
const speed = 2;

// Function to update the image's position
function animateImage() {
    positionX += speed;
    animatedImage.style.position = "absolute";
    animatedImage.style.left = positionX + "px";

    // Reset the position when the image goes off-screen
    if (positionX < window.innerWidth) {
        requestAnimationFrame(animateImage);
    }
}

// Start the animation when the page loads
window.addEventListener("load", () => {
    animateImage();
});