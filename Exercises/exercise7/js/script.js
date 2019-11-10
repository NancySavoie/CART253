// Exercise 7: Project 3 Prototype v1 - Nancy Savoie
// This prototype is based on the Predator-Prey Simulation by Pippin Barr.
// The whole of the Final Project will be an amalgamation of this semester's exercises as well as Project 1 and Project 2.
// No sounds, images, arrays or finer details are present yet as this is only a basic foundation to build on for the moment.

// The students
let student1;
let student2;

// The focus items
let coffee;
let laptop;
let books;

// Display the images
let backgroundImage;

// Preload functions for images
function preload() {
  backgroundImage = loadImage('./assets/images/backgroundImage.jpg');
}
// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(1500, 900);
  student1 = new Students(100, 100, 5, 40, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 32, color(200, 200, 0), 40);
  student2 = new Students(200, 200, 5, 40, 87, 83, 65, 68, 16, color(200, 200, 0), 40);
  coffee = new Focus(100, 100, 10, color(255, 100, 10), 50);
  laptop = new Focus(100, 100, 8, color(255, 255, 255), 60);
  books = new Focus(100, 100, 20, color(255, 255, 0), 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  image(backgroundImage, 0, 0);

  // Handle input for the tiger
  student1.handleInput();
  student2.handleInput();

  // Move all the "animals"
  student1.move();
  student2.move();
  coffee.move();
  laptop.move();
  books.move();

  // Handle the tiger eating any of the prey
  student1.handleEating(coffee);
  student1.handleEating(laptop);
  student1.handleEating(books);
  student2.handleEating(coffee);
  student2.handleEating(laptop);
  student2.handleEating(books);

  // Display all the "animals"
  student1.display();
  student2.display();
  coffee.display();
  laptop.display();
  books.display();
}
