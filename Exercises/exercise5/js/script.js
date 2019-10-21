// Exercise 5
// by Nancy Savoie
//
// Predators and prey (of different sizes and speeds)
// The predators chase the prey using differe t keys and consumes them.
// The predator loses health over time, so must keep eating to survive.
//
// Images from freepik.com and vecteezy.com

// Our predators
let tiger;
let lion;
let wolf;

// The three prey
let antelope;
let zebra;
let bee;

// Display the images
let backgroundJungle;
let tigerImage;
let lionImage;
let wolfImage;

function preload () {
  backgroundJungle = loadImage('./assets/images/backgroundJungle.png');
  lionImage = loadImage('./assets/images/lionImage.png');
  tigerImage = loadImage('./assets/images/tigerImage.png');
  wolfImage = loadImage('./assets/images/wolfImage.png');
}
// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(960, 720);
  tiger = new Predator(100, 100, 5, 40, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 32, tigerImage);
  lion = new Predator(200, 200, 5, 40, 87, 83, 65, 68, 16, lionImage);
  wolf = new Predator(50, 200, 5, 40, 104, 98, 100, 102, 18, wolfImage);
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  image (backgroundJungle, 0, 0);

    //Display the amount of preys eaten by the tiger
    textFont("Impact");
    textAlign(LEFT, TOP);
    textSize(20);
    fill(255);
    text("Prey eaten by Tiger: " + tiger.preyEaten, 0, 0);

    //Display the amount of preys eaten by the lion
    textFont("Impact");
    textAlign(RIGHT, TOP);
    textSize(20);
    fill(255);
    text("Prey eaten by Lion: " + lion.preyEaten, 575, 0);

    //Display the amount of preys eaten by the wasp
    textFont("Impact");
    textAlign(RIGHT, TOP);
    textSize(20);
    fill(255);
    text("Prey eaten by Wolf: " + wolf.preyEaten, 950, 0);

  // Handle input for the tiger
  tiger.handleInput();
  lion.handleInput();
  wolf.handleInput();

  // Move all the "animals"
  tiger.move();
  antelope.move();
  zebra.move();
  bee.move();
  lion.move();
  wolf.move();

  // Handle the tiger eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);
  lion.handleEating(antelope);
  lion.handleEating(zebra);
  lion.handleEating(bee);
  wolf.handleEating(antelope);
  wolf.handleEating(zebra);
  wolf.handleEating(bee);

  // Display all the "animals"
  tiger.display();
  antelope.display();
  zebra.display();
  bee.display();
  lion.display();
  wolf.display();

  }
