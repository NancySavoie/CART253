"use strict";

/******************************************************************************
Where's Sausage Dog? PLUS!!!
Exercise 3 - Nancy Savoie

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
https://www.thesprucepets.com/thmb/uCeQRz8Vj8sXHaBGU6rFy4ws9Zs=/2010x1450/filters:no_upscale():max_bytes(150000):strip_icc()/Dachshundpuppy-GettyImages-1083781624-8ff91e2790e84035bd99abfdec48d41a.jpg
******************************************************************************/

// Position and image of the sausage dog we're searching for
let targetX;
let targetY;
let targetImage;

//Defines moving speed of target after game over
let targetspeed=5;
let targetVX=5;

// The ten decoy images
let decoyImage1;
let decoyImage2;
let decoyImage3;
let decoyImage4;
let decoyImage5;
let decoyImage6;
let decoyImage7;
let decoyImage8;
let decoyImage9;
let decoyImage10;

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
let numDecoys = 500;

// Keep track of whether they've won
let gameOver = false;

//The background image
  let backgroundImage;

// preload()
//
// Loads the target and decoy images before the program starts
function preload() {

  targetImage = loadImage("assets/images/animals-target.png");

  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");

  //Preload function for the background image once game is over
  backgroundImage = loadImage("assets/images/sausagedoggy.jpg")
}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth,windowHeight);
  background("#FFD268");
  imageMode(CENTER);
  backgroundImage=loadImage("assets/images/sausagedoggy.jpg");

  // Use a for loop to draw as many decoys as we need
  for (let i = 0; i < numDecoys; i++) {
    // Choose a random location on the canvas for this decoy
    let x = random(0,width);
    let y = random(0,height);

    //Generates random sizes for the decoy doggies
    let sizeX = random (10,200);

    // Generate a random number we can use for probability
    let r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough.
    // But basically each "if" and "else if" has a 10% chance of being true
    if (r < 0.1) {
      image(decoyImage1,x,y,sizeX,sizeX);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y,sizeX,sizeX);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y,sizeX,sizeX);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y,sizeX,sizeX);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y,sizeX,sizeX);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y,sizeX,sizeX);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y,sizeX,sizeX);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y,sizeX,sizeX);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y,sizeX,sizeX);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y,sizeX,sizeX);
    }
  }
    // Caption in top right corner for instruction
    let sausageDog = "Find the little sausage doggy!";
    textFont("Futura");
    textSize(25);
    textAlign(RIGHT,TOP);
    strokeWeight(5);
    fill("#FF8364");
    stroke(255);
    text(sausageDog, width, 10);


  // Once we've displayed all decoys, we choose a random location for the target
  targetX = random(0,width);
  targetY = random(0,height);

  // And draw it (because it's the last thing drawn, it will always be on top)
  image(targetImage,targetX,targetY);

  //Create a colorful square with the image of the missing doggy in the center
  fill("#FF8364");
  rect(width-200,50,120,100);
  image(targetImage,width-140,100,100,100);
}

// draw()
//
// Displays the game over screen if the player has won,
// otherwise nothing (all the gameplay stuff is in mousePressed())
function draw() {

  if (gameOver) {
  // Typography, new background image + target action
  textFont("Futura");
  textSize(100);
  textAlign(CENTER,CENTER);
  stroke("#669966");
  fill("#BAF98A");
  image(backgroundImage,1000,500)
  image(targetImage,targetX,targetY);

  //The target moves out of the screen to the right
  targetVX=targetspeed;
  targetX=targetX+targetVX;

  // Winning text
  text("YOU FOUND THE DOGGY!",width/2,height/2);

  // Draw a circle around the sausage dog to show where it is (even though
  // they already know because they found it!)
  noFill();
  stroke("#BAF98A");
  strokeWeight(10);
  ellipse(targetX,targetY,targetImage.width,targetImage.height);
  }
}

// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // The mouse was clicked!
  // Check if the cursor is in the x range of the target
  // (We're subtracting the image's width/2 because we're using imageMode(CENTER) -
  // the key is we want to determine the left and right edges of the image.)
  if (mouseX > targetX - targetImage.width/2 && mouseX < targetX + targetImage.width/2) {
    // Check if the cursor is also in the y range of the target
    // i.e. check if it's within the top and bottom of the image
    if (mouseY > targetY - targetImage.height/2 && mouseY < targetY + targetImage.height/2) {
      gameOver = true;
    }
  }
}
