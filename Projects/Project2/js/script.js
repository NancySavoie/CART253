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

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(100, 100, 5, color(200, 200, 0), 40);
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(0);

  // Handle input for the tiger
  tiger.handleInput();

  // Move all the "animals"
  tiger.move();
  antelope.move();
  zebra.move();
  bee.move();

  // Handle the tiger eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);

  // Display all the "animals"
  tiger.display();
  antelope.display();
  zebra.display();
  bee.display();
}
