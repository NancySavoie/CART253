// Exercise 1 - Movement
// Nancy Savoie
//
// Starter code for exercise 1.

    //New added shape, a rectangle.
    let rectY = 310;
    let rectX = 0;
    let rectSize = 50;

    //New added shape, an ovale.
    let ovaleY = 0;
    let ovaleX = 310;
    let ovaleSize = 50;

    // The mouse shape.
    let cursorX;
    let cursorY;
    let cursorSize = 25;

// The current position and size of the circle
let circleX;
let circleY;
let circleSize = 100;

// The current position and size of the square
let squareX;
let squareY;
let squareSize = 100;



// preload()

function preload() {
}

// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  // Start the circle off screen to the bottom left
  // We divide the size by two because we're drawing from the center
  circleX = -circleSize/2;
  circleY = height + circleSize/2;

  // Start the square off screen to the bottom right
  // We divide the size by two because we're drawing from the center
  squareX = width + squareSize/2;
  squareY = height + squareSize/2;

  // We'll draw rectangles from the center

  // We won't have a stroke in this
  noStroke();
}

function draw() {
  // No BG

     // The shape that follows the mouse, looks like bubbles!
      cursorX = mouseX;
      cursorY = mouseY;
      fill(255,150,0,10); //A nice orange color.
      ellipse (cursorX,cursorY,cursorSize,cursorSize);

      //A rectangular shape
      fill(0,255,10,10); //A different color to contrast the red and the blue
      rectX = rectX + 1; //It moves from left to right.
      rect (rectX,rectY,rectSize,rectSize);

      //A circular shape
      fill(255,255,10,10); //Another primary color to clash.
      ovaleY = ovaleY + 1; //It moves from the top to the bottom.
      ellipse (ovaleX,ovaleY,ovaleSize,ovaleSize);

  // Move circle up and to the right
  circleX += 1;
  circleY -= 1;
  // Make the circle transparent red
  fill(255,0,0,10);
  // Display the circle
  ellipse(circleX,circleY,circleSize,circleSize);

  // Move square up and to the left
  squareX -= 1;
  squareY -= 1;
  // Make the square transparent blue
  fill(0,0,255,10);
  // Display the square
  rect(squareX,squareY,squareSize,squareSize);

}
