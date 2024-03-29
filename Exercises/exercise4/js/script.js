"use strict";

// Pong Plus...IN SPACE!!!
// Exercise 4 - Nancy Savoie
// Background image by https://8bitweapon.com/8-bit-weapon-bits-with-byte-background-png/
// Alien paceship made by Nancy Savoie

// Instructions:
// Up and down keys control the right hand paddle (barrier), W and S keys control
// the left hand paddle (barrier).

//---------------------------------------------------------------------------//

// Whether the game has started
let playing = false;

// BALL

// A ball object with the properties of
// position, size, velocity, and speed
let ball = {
  x: 340,
  y: 350,
  size: 50,
  vx: 0,
  vy: 0,
  speed: 5,
}

// PADDLES

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
let leftPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 0,
  speed: 5,
  upKey: 87,
  downKey: 83,
  paddleColor: 255,
}

// RIGHT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
let rightPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 0,
  speed: 5,
  upKey: 38,
  downKey: 40,
  paddleColor: 255,
}
// Variables for the paddles to keep their score
let scoreLeftPaddle = 0;
let scoreRightPaddle = 0;

// Variables for sounds
let backgroundMusic;
let shootSFX;

// Variables images
let spaceBackground;
let alienImage;

// preload()
//
// Preloads sounds and images
function preload() {
  backgroundMusic = loadSound('assets/sounds/backgroundMusic.mp3');
  shootSFX = loadSound('assets/sounds/shootSFX.wav');
  spaceBackground = loadImage('assets/images/spaceBackground.png');
  alienImage = loadImage('assets/images/alienImage.png');
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and ball positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(700, 700);
  noStroke();
  setupPaddles();
  resetBall();
}

// Setup the background music
function setupSound() {
  backgroundMusic.stop();
  backgroundMusic.loop();
}

// setupPaddles()
//
// Sets the starting positions of the two paddles
function setupPaddles() {
  // Initialise the left paddle position
  leftPaddle.x = 0 + leftPaddle.w;
  leftPaddle.y = height / 2;

  // Initialise the right paddle position
  rightPaddle.x = 640 + rightPaddle.w;
  rightPaddle.y = height / 2;
}

// draw()
//
// Calls the appropriate functions to run the game
// See how tidy it looks?!
function draw() {
  push();
  // A nice space background
  image(spaceBackground, 0, 0);

  //Display the score for the left paddle (barrier)
  textFont("Courier");
  textAlign(LEFT, TOP);
  textSize(20);
  fill(255);
  text("Left Barrier: " + scoreLeftPaddle, 0, 0);

  //Display the score for the right paddle (barrier)
  textFont("Courier");
  textAlign(RIGHT, TOP);
  textSize(20);
  fill(255);
  text("Right Barrier: " + scoreRightPaddle, 690, 0);
  pop();

  if (playing) {
    // If the game is in play, we handle input and move the elements around
    handleInput(leftPaddle);
    handleInput(rightPaddle);
    updatePaddle(leftPaddle);
    updatePaddle(rightPaddle);
    updateBall();

    checkBallWallCollision();
    checkBallPaddleCollision(leftPaddle);
    checkBallPaddleCollision(rightPaddle);

    // Check if the ball went out of bounds and respond if so
    // (Note how we can use a function that returns a truth value
    // inside a conditional!)

    if (ballIsOutOfBounds()) {

      // If it went off either side, reset it
      resetBall();
    }
  } else {
    // Otherwise we display the message to start the game
    displayStartMessage();
  }

  // We always display the paddles and ball so it looks like Pong!
  displayPaddle(leftPaddle);
  displayPaddle(rightPaddle);
  displayBall();
}

// handleInput()
//
// Checks the mouse and keyboard input to set the velocities of the
// left and right paddles respectively.
function handleInput(paddle) {
  // Move the paddle based on its up and down keys
  // If the up key is being pressed
  if (keyIsDown(paddle.upKey)) {
    // Move up
    paddle.vy = -paddle.speed;
  }
  // Otherwise if the down key is being pressed
  else if (keyIsDown(paddle.downKey)) {
    // Move down
    paddle.vy = paddle.speed;
  } else {
    // Otherwise stop moving
    paddle.vy = 0;
  }
}

// updatePositions()
//
// Sets the positions of the paddles and ball based on their velocities
function updatePaddle(paddle) {
  // Update the paddle position based on its velocity
  paddle.y += paddle.vy;
}

// updateBall()
//
// Sets the position of the ball based on its velocity
function updateBall() {
  // Update the ball's position based on velocity
  ball.x += ball.vx;
  ball.y += ball.vy;
}

// ballIsOutOfBounds()
//
// Checks if the ball has gone off the left or right
// Returns true if so, false otherwise
function ballIsOutOfBounds() {
  // Check for ball going off the sides
  // If the ball (Spaceship) goes off the side, the color changes for the winning paddle

  // Keeping the score (along with the number display) by randomly changing the color of the Right Paddle
  if (ball.x < 0) {
    scoreRightPaddle = scoreRightPaddle + 1;
    rightPaddle.paddleColor = color(random(0, 125), random(0, 125), random(0, 125));
  }
  // Keeping the score (along with the number display) by randomly changing the color of the Left Paddle
  if (ball.x > width) {
    scoreLeftPaddle = scoreLeftPaddle + 1;
    leftPaddle.paddleColor = color(random(126, 255), random(126, 255), random(126, 255));
  }
  // Check for ball going off the sides
  if (ball.x < 0 || ball.x > width) {
    return true;
  } else {
    return false;
  }
}
// checkBallWallCollision()
//
// Check if the ball has hit the top or bottom of the canvas
// Bounce off if it has by reversing velocity
// Play a sound
function checkBallWallCollision() {
  // Check for collisions with top or bottom...
  if (ball.y < 0 || ball.y > height) {
    // It hit so reverse velocity
    ball.vy = -ball.vy;
    // Play our bouncing sound effect by rewinding and then playing
    shootSFX.currentTime = 0;
    shootSFX.play();
  }
}

// checkBallPaddleCollision(paddle)
//
// Checks for collisions between the ball and the specified paddle
function checkBallPaddleCollision(paddle) {
  // VARIABLES FOR CHECKING COLLISIONS

  // We will calculate the top, bottom, left, and right of the
  // paddle and the ball to make our conditionals easier to read...
  let ballTop = ball.y - ball.size / 2;
  let ballBottom = ball.y + ball.size / 2;
  let ballLeft = ball.x - ball.size / 2;
  let ballRight = ball.x + ball.size / 2;

  let paddleTop = paddle.y - paddle.h / 2;
  let paddleBottom = paddle.y + paddle.h / 2;
  let paddleLeft = paddle.x - leftPaddle.w / 2;
  let paddleRight = paddle.x + paddle.w / 2;

  // First check the ball is in the vertical range of the paddle
  if (ballBottom > paddleTop && ballTop < paddleBottom) {
    // Then check if it is touching the paddle horizontally
    if (ballLeft < paddleRight && ballRight > paddleLeft) {
      // Then the ball is touching the paddle
      // Reverse its vx so it starts travelling in the opposite direction
      ball.vx = -ball.vx;
      // Play our bouncing sound effect by rewinding and then playing
      shootSFX.currentTime = 0;
      shootSFX.play();
    }
  }
}

// displayPaddle(paddle)
//
// Draws the specified paddle
function displayPaddle(paddle) {
  // Draw the paddles & colors
  fill(paddle.paddleColor); // This allows the paddles to change color when there is a score
  rect(paddle.x, paddle.y, paddle.w, paddle.h);
}

// displayBall()
//
// Draws the ball on screen as a square
function displayBall() {
  // Draw the spaceship image
  image(alienImage, ball.x, ball.y, ball.size, ball.size);
}

// resetBall()
//
// Sets the starting position and velocity of the ball
function resetBall() {
  // Initialise the ball's position and velocity
  // If the right paddle (barrier) scored
  if (ball.x < 0) {
    ball.x = width / 2;
    ball.y = height / 2;
    ball.vx = ball.speed;
    ball.vy = random(1, 12); //Gives the ball a random y velocity
  }
  // If the left paddle (barrier) scored
  if (ball.x > width) {
    ball.x = width / 2;
    ball.y = height / 2;
    ball.vx = -ball.speed;
    ball.vy = random(1, 12); //Gives the ball a random y velocity
  }
}

// displayStartMessage()
//
// Shows a message about how to start the game
function displayStartMessage() {
  push();
  textFont("Courier");
  textAlign(CENTER);
  textSize(25);
  text("Click to begin your intergalactic journey!", width / 2, height / 3);
  pop();
}

// mousePressed()
//
// Here to require a click to start playing the game
// Which will help us be allowed to play audio in the browser
function mousePressed() {
  playing = true;
  setupSound();
  //Resets the spaceship's position
  ball.x = width / 2;
  ball.y = height / 2;
  ball.vx = ball.speed;
  ball.vy = random(1, 12);
}
