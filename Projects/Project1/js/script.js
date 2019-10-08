"use strict";

/******************************************************

Game - Chaser
Project 1 - Nancy Savoie

A "simple" game of cat and mouse. The player is a circle and can move with keys,
if they overlap the (randomly moving) prey they "eat it" by sucking out its life
and adding it to their own. The player "dies" slowly over time so they have to keep
eating to stay alive.

Includes: Physics-based movement, keyboard controls, health/stamina,
random movement, screen wrap.

Background Image from https://steamcommunity.com/market/listings/753/428550-Sacred%20Ordalia%20Grove
Prey and Player Images by Nancy Savoie, created on https://make8bitart.com/
******************************************************/

// Track whether the game is over
let gameOver = false;

// Player position, size, velocity
let playerX;
let playerY;
let playerRadius = 50;
let playerVX = 0;
let playerVY = 0;
let playerSpeed = 3;
// Player health
let playerHealth;
let playerMaxHealth = 500;
// Player fill color
let playerFill = 50;

// Prey position, size, velocity
let preyX;
let preyY;
let preyRadius = 50;
let preyVX;
let preyVY;
let preyMaxSpeed = 5;
//Time values for the Perlin noise
let tx = 0;
let ty = 10;
// Prey health
let preyHealth;
let preyMaxHealth = 100;
// Prey fill color
let preyFill = 200;

// Amount of health obtained per frame of "eating" (overlapping) the prey
let eatHealth = 10;
// Number of prey eaten during the game (the "score")
let preyEaten = 0;

// Player and prey images
let playerImage;
let preyImage;
let backgroundImage1;
let backgroundImage2;
let backgroundImage3;
let backgroundImage4;
let backgroundImage5;

// Sound effects and music
let soundBrain;
let soundZombie;
let soundBackgroundMusic;

function preload() {
// Preload images
  playerImage = loadImage("assets/images/zombie.png")
  preyImage = loadImage("assets/images/brain.png")
  backgroundImage1 = loadImage("assets/images/bg1.png")
  backgroundImage2 = loadImage("assets/images/bg2.png")
  backgroundImage3 = loadImage("assets/images/bg3.png")
  backgroundImage4 = loadImage("assets/images/bg4.png")
  backgroundImage5 = loadImage("assets/images/bg5.png")
// Preload sounds and music
  soundBrain = loadSound('assets/sounds/soundBrain.wav');
  soundZombie = loadSound('assets/sounds/soundZombie.wav');
  soundBackgroundMusic = loadSound('assets/sounds/soundBackgroundMusic.mp3');
  }

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(700, 500);

  // We're using simple functions to separate code out
  setupPrey();
  setupPlayer();
  // setupSound();
}

// Setup the sound files
function setupSound() {
     soundBackgroundMusic.loop();
     soundBrain.play();
     soundZombie.play();
    }

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width / 5;
  preyY = height / 2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
}
// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4 * width / 5;
  playerY = height / 2;
  playerHealth = playerMaxHealth;
  preyEaten = 0;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  image(backgroundImage1, 0, 0);

//The background changes at every 10 brains eaten.
  if (preyEaten > 10) {
    image(backgroundImage2, 0, 0);
    }
  if (preyEaten > 20) {
    image(backgroundImage3, 0, 0);
    }
  if (preyEaten > 30) {
    image(backgroundImage4, 0, 0);
    }
  if (preyEaten > 40) {
    image(backgroundImage3, 0, 0);
    }

//Displays the player's health
    textFont("Impact");
    textAlign(LEFT,TOP);
    textSize(35);
    fill(255);
    text("Player Health: " + playerHealth,0,0);

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();
  }
  else {
    showGameOver();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {

  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerSpeed;
  }
  else {
    playerVX = 0;
  }

  //Sprinting option for the LEFT and RIGHT arrows.
  if (keyIsDown(SHIFT) && keyIsDown(LEFT_ARROW)){
      playerVX = -10;
    }
  else if (keyIsDown(SHIFT) && keyIsDown(RIGHT_ARROW)){
      playerVX = 10;
    }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerSpeed;
  }
  else {
    playerVY = 0;
  }

  //Sprinting option for the UP and DOWN arrows.
  if (keyIsDown(SHIFT) && keyIsDown(UP_ARROW)){
      playerVY = -10;
    }
  else if (keyIsDown(SHIFT) && keyIsDown(DOWN_ARROW)){
      playerVY = 10;
    }
  }

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX = playerX + playerVX;
  playerY = playerY + playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    // Off the left side, so add the width to reset to the right
    playerX = playerX + width;
  }
  else if (playerX > width) {
    // Off the right side, so subtract the width to reset to the left
    playerX = playerX - width;
  }

  if (playerY < 0) {
    // Off the top, so add the height to reset to the bottom
    playerY = playerY + height;
  }
  else if (playerY > height) {
    // Off the bottom, so subtract the height to reset to the top
    playerY = playerY - height;
  }
}

// updateHealth()
//
// Reduce the player's health (happens every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health
  playerHealth = playerHealth - 1;
  // Depletes the player's health faster if the SHIFT Key is down
  if (keyIsDown(SHIFT)){
  playerHealth = playerHealth - 2;
  }
  // Constrain the result to a sensible range
  playerHealth = constrain(playerHealth, 0, playerMaxHealth);
  // Check if the player is dead (0 health)
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
    // Play zombie sound effect
    soundZombie.play();
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  let d = dist(playerX, playerY, preyX, preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = playerHealth + eatHealth;
    // Constrain to the possible range
    playerHealth = constrain(playerHealth, 0, playerMaxHealth);
    // Reduce the prey health
    preyHealth = preyHealth - eatHealth;
    // Constrain to the possible range
    preyHealth = constrain(preyHealth, 0, preyMaxHealth);

    // Check if the prey died (health 0)
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0, width);
      preyY = random(0, height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten = preyEaten + 1;
      // Prey gets faster everytime it gets eaten by the player
      preyMaxSpeed = preyMaxSpeed + 1;
      // Play brain eaten sound effect
      soundBrain.play();
    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  // Change the prey's velocity at random intervals
  // random() will be < 0.05 5% of the time, so the prey
  // will change direction on 5% of frames

    // Use map() to convert from the 0-1 range of the random() function
    // to the appropriate range of velocities for the prey
    preyVX = map(noise(tx), 0, 1, -preyMaxSpeed, preyMaxSpeed);
    preyVY = map(noise(ty), 0, 1, -preyMaxSpeed, preyMaxSpeed);
    tx += 0.05;
    ty += 0.05;

  // Update prey position based on velocity
  preyX = preyX + preyVX;
  preyY = preyY + preyVY;

  // Screen wrapping
  if (preyX < 0) {
    preyX = preyX + width;
  }
  else if (preyX > width) {
    preyX = preyX - width;
  }

  if (preyY < 0) {
    preyY = preyY + height;
  }
  else if (preyY > height) {
    preyY = preyY - height;
  }
}

// drawPrey()
//
// Prey image with alpha based on health
function drawPrey() {
  fill(preyFill, preyHealth);
  image(preyImage, preyX, preyY, 80, 60);
}

// drawPlayer()
//
// Player image with alpha value based on health
function drawPlayer() {
  push();
  tint(255, playerHealth);
  image(playerImage, playerX, playerY, 100, 110);
  pop();
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  // Set up the font
  textFont("Impact")
  textSize(50);
  textAlign(CENTER, CENTER);
  fill(255);

  // Set up the text to display
  let gameOverText = "GAME OVER\n"; // \n means "new line"
  gameOverText = gameOverText + "You ate " + preyEaten + " brain(s)\n";
  gameOverText = gameOverText + "before you rotted."
  // Display it in the centre of the screen
  text(gameOverText, width / 2, height / 2);
}

function mousePressed(){
  setupSound();
}
