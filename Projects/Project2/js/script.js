// Gotta Catch 'em all!
// Project 2 - Nancy Savoie
//
// A predator and prey type game with adorable Pokémon!
// The pokeball chases the Pokémon using the arrow keys to catch them all.
// The pokeball loses energy power over time, so it must keep catching Pokémon in order to go on.
//
// Pictures from stickpng.com
// Music from https://www.youtube.com/watch?v=QaaD9CnWgig
// © Pokémon. TM, ® Nintendo


// The pokeballs (the predators
let pokeball1;
let pokeball2;
let pokeball3;

// The Pokémon (The prey)
let pikachu;
let squirtle;
let bulbasaur;
let evee;
let jigglypuff;

// Display the images
let backgroundImage;
let pokeball1Image;
let pokeball2Image;
let pokeball3Image;
let pikachuImage;
let squirtleImage;
let bulbasaurImage;
let eveeImage;
let jigglypuffImage;

// Preload functions for images
function preload() {
  backgroundImage = loadImage('./assets/images/backgroundImage.png');
  pokeball1Image = loadImage('./assets/images/pokeball1Image.png');
  pokeball2Image = loadImage('./assets/images/pokeball2Image.png');
  pokeball3Image = loadImage('./assets/images/pokeball3Image.png');
  pikachuImage = loadImage('./assets/images/pikachuImage.png');
  squirtleImage = loadImage('./assets/images/squirtleImage.png');
  bulbasaurImage = loadImage('./assets/images/bulbasaurImage.png');
  eveeImage = loadImage('./assets/images/eveeImage.png');
  jigglypuffImage = loadImage('./assets/images/jigglypuffImage.png');
}
// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(1400, 1024);
  pokeball1 = new Predator(100, 100, 5, 40, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 32, pokeball1Image);
  pokeball2 = new Predator(200, 200, 5, 40, 87, 83, 65, 68, 16, pokeball2Image);
  pokeball3 = new Predator(50, 200, 5, 40, 73, 75, 74, 76, 18, pokeball3Image);
  pikachu = new Prey(100, 100, 10, 50, pikachuImage);
  squirtle = new Prey(100, 100, 8, 60, squirtleImage);
  bulbasaur = new Prey(100, 100, 20, 10, bulbasaurImage);
  evee = new Prey(100, 100, 20, 10, eveeImage);
  jigglypuff = new Prey(100, 100, 20, 10, jigglypuffImage);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  image(backgroundImage, 0, 0);
  gameOver();

  //Display the amount of preys eaten by the tiger
  textFont("Impact");
  textAlign(LEFT, TOP);
  textSize(20);
  fill(255);
  text("Pokemon caught: " + pokeball1.preyEaten, 15, 0);

  //Display the amount of preys eaten by the lion
  textFont("Impact");
  textAlign(RIGHT, TOP);
  textSize(20);
  fill(255);
  text("Pokemon caught: " + pokeball2.preyEaten, 800, 0);

  //Display the amount of preys eaten by the wasp
  textFont("Impact");
  textAlign(RIGHT, TOP);
  textSize(20);
  fill(255);
  text("Pokemon caught: " + pokeball3.preyEaten, 1375, 0);

  // Handle input for the tiger
  pokeball1.handleInput();
  pokeball2.handleInput();
  pokeball3.handleInput();

  // Move all the "animals"
  pokeball1.move();
  pokeball2.move();
  pokeball3.move();
  pikachu.move();
  squirtle.move();
  bulbasaur.move();
  evee.move();
  jigglypuff.move();

  // Verifying if the predators are dead
  pokeball1.checkState();
  pokeball2.checkState();
  pokeball3.checkState();

  // Handle the tiger eating any of the prey
  pokeball1.handleEating(pikachu);
  pokeball1.handleEating(squirtle);
  pokeball1.handleEating(bulbasaur);
  pokeball1.handleEating(evee);
  pokeball1.handleEating(jigglypuff);
  pokeball2.handleEating(pikachu);
  pokeball2.handleEating(squirtle);
  pokeball2.handleEating(bulbasaur);
  pokeball2.handleEating(evee);
  pokeball2.handleEating(jigglypuff);
  pokeball3.handleEating(pikachu);
  pokeball3.handleEating(squirtle);
  pokeball3.handleEating(bulbasaur);
  pokeball3.handleEating(evee);
  pokeball3.handleEating(jigglypuff);

  // Display all the "animals"
  pokeball1.display();
  pokeball2.display();
  pokeball3.display();
  pikachu.display();
  squirtle.display();
  bulbasaur.display();
  evee.display();
  jigglypuff.display();
}

// Game over function
function gameOver() {
  if (pokeball1.predatorDead && pokeball2.predatorDead && pokeball3.predatorDead)
    text("Game over!", 500, 300);
}
