// Exercise 7: Project 3 Prototype v1 - Nancy Savoie
// This prototype is based on the Predator-prey Simulation by Pippin Barr.
// The whole of the Final Project will be an amalgamation of this semester's exercises as well as Project 1 and Project 2.
// No sounds, official images or finer details are present yet as this is only a basic foundation to build on.

// The students
let student1;
let student2;

// The focus items
let coffee;
let laptop;
let books;

// The distraction items
    //let beer;

// Display the images
let backgroundImage;
let student1Image;
let student2Image;
let coffeeImage;
let laptopImage;
let booksImage;
    //let beerImage;

// Preload functions for images
function preload() {
  backgroundImage = loadImage('./assets/images/backgroundImage.jpg');
  student1Image = loadImage('./assets/images/student1Image.png');
  student2Image = loadImage('./assets/images/student2Image.png');
  coffeeImage = loadImage('./assets/images/coffeeImage.png');
  laptopImage = loadImage('./assets/images/laptopImage.png');
  booksImage = loadImage('./assets/images/booksImage.png');
    //beerImage = loadImage('./assets/images/beerImage.png');
}
// setup()
//
// Sets up a canvas
// Creates objects for the students, the focus and the distraction objects
function setup() {
  createCanvas(1500, 900);
  student1 = new Student(100, 100, 5, 40, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 32, student1Image, 40);
  student2 = new Student(200, 200, 5, 40, 87, 83, 65, 68, 16, student2Image, 40);
  // The focus class
  coffee = new Focus(100, 100, 10, coffeeImage, 50);
  laptop = new Focus(100, 100, 8, laptopImage, 50);
  books = new Focus(100, 100, 20, booksImage, 50);
    // Distraction classes
    // beer = new DistractionFade(100, 100, 20, beerImage);

  // Place students into array
students = [student1, student2];
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Background image
  image(backgroundImage, 0, 0);

  // Move all objects

  coffee.move();
  laptop.move();
  books.move();
    //beer.move();

  for (let i = 0; i < students.length; i++) {
    students[i].checkState();
    //beer.fade(students[i]);
    students[i].handleInput();
    students[i].move();
    students[i].display();

  // Handle eating any of the focus and distraction objects
  student1.handleEating(coffee);
  student1.handleEating(laptop);
  student1.handleEating(books);
    //student1.handleEating(beer);
  student2.handleEating(coffee);
  student2.handleEating(laptop);
  student2.handleEating(books);
    //student2.handleEating(beer);

  // Display all objects
  coffee.display();
  laptop.display();
  books.display();
    //beer.display();
}
}
