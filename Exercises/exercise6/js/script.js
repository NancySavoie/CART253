"use strict";

// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

////////////////////
// 10 ERRORS IN HERE
////////////////////

// Our predator
let tiger;

// The three prey
let antelope; // FIXED: Antelope was missing an "e" at the end
let zebra;
let bee;

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
functionsetup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(100, 100, 100, 5, color(200, 200, 0), 40); // FIXED: tiger was missing the second parameter
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60); // FIXED: Missing "y" parameter for the Zebra
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(0); //FIXED: The word background was missing the letter "d"

  // Handle input for the tiger
  tiger.handleInput(); //FIXED: The handle input was completely missing

  // Move all the "animals"
  tiger.move();
  antelope.move();
  zebra.move();
  bee.move(); // FIXED: the bee was missing from the "move all the animals"

  // Handle the tiger eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);

  // Display all the "animals"
  tiger.display();
  antelope.display(); //FIXED: Antelope was missing the letter "e" again
  zebra.display(); //FIXED: The word display was spelled disploy
  bee.display(); //FIXED: Bee was spelled "b"
}
