// The Last Dinosaurs
// Project 3 - Nancy Savoie
//
// This co-op survival game is based on the learnings of previous CART 253 projects.
// The last two dinosaurs must work together and eat as much as possible in order
// to get strong and survive the natural catastrophies. If one of them dies,
// the game is lost along with the dinausors' hope!
//
// Artwork by Nancy Savoie and creative commons (Freepik and Vecteezy)
// Music from https://www.youtube.com/watch?v=cSqdu7Qlz7k

// State
let titleScreen = false;
let instructionsScreen = false;
let gameOverScreen = false;
let gameWon = false;

// The Dinosaurs (the Dinos)
let dinoStegosaurus;
let dinoTriceratops;

// The survival items (The food)
let foodLeaves;
let foodBerries;
let foodPlant;

// Arrays
let dinos = [];
let food = [];
let catalysts = [];

// The Catalysts
let tornado;
let fire;
let meteor;

// Display the images
let foregroundImage1;
let foregroundImage2;
let foregroundImage3;
let foregroundImage4;
let foregroundImage5;
let backgroundImage1;
let backgroundImage2;
let backgroundImage3;
let backgroundImage4;
let backgroundImage5;
let babyStegosaurusImage;
let babyTriceratopsImage;
let childStegosaurusImage;
let childTriceratopsImage;
let dinoStegosaurusImage;
let dinoTriceratopsImage;
let foodLeavesImage;
let foodBerriesImage;
let foodPlantImage;
let catalystTornadoImagee;
let catalystFireImage;
let catalystMeteorImage;

// Display sounds
let backgroundMusic;
let gameOverSound;
let foodEatenSound;
let dinoDeadSound;
let gameStartSound;

let foodAmountCatalyst = 20;
let foodAmountBackground = 10;
let foodAmountForeground = 10;

// Preload functions for images and sounds
function preload() {
  // Preload for images
  foregroundImage1 = loadImage('./assets/images/foregroundImage1.png');
  foregroundImage2 = loadImage('./assets/images/foregroundImage2.png');
  foregroundImage3 = loadImage('./assets/images/foregroundImage3.png');
  foregroundImage4 = loadImage('./assets/images/foregroundImage4.png');
  foregroundImage5 = loadImage('./assets/images/foregroundImage5.png');
  backgroundImage1 = loadImage('./assets/images/backgroundImage1.png');
  backgroundImage2 = loadImage('./assets/images/backgroundImage2.png');
  backgroundImage3 = loadImage('./assets/images/backgroundImage3.png');
  backgroundImage4 = loadImage('./assets/images/backgroundImage4.png');
  backgroundImage5 = loadImage('./assets/images/backgroundImage5.png');
  startImage = loadImage('./assets/images/startImage.jpg');
  instructionsImage = loadImage('./assets/images/instructionsImage.jpg');
  endingImage = loadImage('./assets/images/endingImage.jpg');
  gameWonImage = loadImage('./assets/images/gameWonImage.jpg');
  babyStegosaurusImage = loadImage('./assets/images/babyStegosaurusImage.png');
  babyTriceratopsImage = loadImage('./assets/images/babyTriceratopsImage.png');
  childStegosaurusImage = loadImage('./assets/images/childStegosaurusImage.png');
  childTriceratopsImage = loadImage('./assets/images/childTriceratopsImage.png');
  dinoStegosaurusImage = loadImage('./assets/images/dinoStegosaurusImage.png');
  dinoTriceratopsImage = loadImage('./assets/images/dinoTriceratopsImage.png');
  foodLeavesImage = loadImage('./assets/images/foodLeavesImage.png');
  foodBerriesImage = loadImage('./assets/images/foodBerriesImage.png');
  foodPlantImage = loadImage('./assets/images/foodPlantImage.png');
  catalystTornadoImage = loadImage('./assets/images/catalystTornadoImage.png');
  catalystFireImage = loadImage('./assets/images/catalystFireImage.png');
  catalystMeteorImage = loadImage('./assets/images/catalystMeteorImage.png');

  // Preload for sounds
  backgroundMusic = loadSound('./assets/sounds/backgroundMusic.mp3');
  gameOverSound = loadSound('./assets/sounds/gameOverSound.mp3');
  foodEatenSound = loadSound('./assets/sounds/foodEatenSound.mp3');
  dinoDeadSound = loadSound('./assets/sounds/dinoDeadSound.mp3');
  gameStartSound = loadSound('./assets/sounds/gameStartSound.mp3');
}

// setup()
//
// Sets up a canvas and creates objects for the dinos and the food
function setup() {
  createCanvas(700, 500);
  frameRate(30);
  dinoStegosaurus = new Dino(200, 200, 5, 40, 87, 83, 65, 68, 16, [babyStegosaurusImage, childStegosaurusImage, dinoStegosaurusImage]);
  dinoTriceratops = new Dino(100, 100, 5, 40, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 32, [babyTriceratopsImage, childTriceratopsImage, dinoTriceratopsImage]);
  foodLeaves = new Food(100, 100, 10, 25, foodLeavesImage);
  foodBerries = new Food(100, 100, 8, 25, foodBerriesImage);
  foodPlant = new Food(100, 100, 20, 25, foodPlantImage);

  // Place dinos and food into array
  dinos = [dinoStegosaurus, dinoTriceratops];
  food = [foodLeaves, foodBerries, foodPlant];

  // Title screen is active at the start
  titleScreen = true;
}

// Draw()
function draw() {
  if (gameOverScreen === true) {
    image(endingImage, 0, 0);

  } else if (titleScreen === true) {
    image(startImage, 0, 0);

  } else if (instructionsScreen === true) {
    image(instructionsImage, 0, 0);

  } else if (gameWon === true) {
    image(gameWonImage, 0, 0);

  } else {
    handlePlay();
  }
}

// New classes - Catalysts
// They appear only after a certain amount of food has been eaten by the Dinos to slowly increase difficulty
function createCatalysts() {
  if (dinoStegosaurus.foodEaten + dinoTriceratops.foodEaten === foodAmountCatalyst) {

    tornado = new CatalystTornado(100, 100, 20, 100, catalystTornadoImage);
  }
  if (dinoStegosaurus.foodEaten + dinoTriceratops.foodEaten === foodAmountCatalyst+10) {
    fire = new CatalystFire(50, 100, 20, 100, catalystFireImage);
  }
  if (dinoStegosaurus.foodEaten + dinoTriceratops.foodEaten === foodAmountCatalyst+20) {
    meteor = new CatalystMeteor(50, 100, 20, 100, catalystMeteorImage);
  }
}

// Handles input, movement, eating, and displaying for the system's objects
function handlePlay() {
  checkGameOver();

  // Dinosaur jungle as a background image
  image(backgroundImage1, 0, 0);

  //The background changes after a certain ammount of food was eaten.
  if (dinoStegosaurus.foodEaten + dinoTriceratops.foodEaten > foodAmountBackground) {
    image(backgroundImage2, 0, 0);
  }
  if (dinoStegosaurus.foodEaten + dinoTriceratops.foodEaten > foodAmountBackground+9) {
    image(backgroundImage3, 0, 0);
    // Evolution of dinosaurs to children
    dinoStegosaurus.currentImage = 1;
    dinoTriceratops.currentImage = 1;
  }
  if (dinoStegosaurus.foodEaten + dinoTriceratops.foodEaten > foodAmountBackground+19) {
    image(backgroundImage4, 0, 0);
    // Evolution of dinosaurs to adults
    dinoStegosaurus.currentImage = 2;
    dinoTriceratops.currentImage = 2;
  }
  if (dinoStegosaurus.foodEaten + dinoTriceratops.foodEaten > foodAmountBackground+29) {
    image(backgroundImage5, 0, 0);
  }
  if (dinoStegosaurus.foodEaten + dinoTriceratops.foodEaten > foodAmountBackground+39) {
    gameWon = true;

    return;
  }

  //Display the amount of food eaten by the Dinausors (as a team)
  textFont("Futura");
  textAlign(LEFT, CENTER);
  textSize(20);
  fill(40, 115, 80);
  text("Survival Level: " + (dinoTriceratops.foodEaten + dinoStegosaurus.foodEaten), 250, 480);

  //Display the amount of food eaten by the Stegosaurus
  textFont("Futura");
  textAlign(LEFT, BOTTOM);
  textSize(15);
  fill(40, 115, 80);
  text("Stegosaurus: " + dinoStegosaurus.foodEaten, 15, 480);

  //Display the amount of food eaten by the Triceratops
  textFont("Futura");
  textAlign(RIGHT, BOTTOM);
  textSize(15);
  fill(40, 115, 80);
  text("Triceratops: " + dinoTriceratops.foodEaten, 675, 480);

  // Move all the dinos and the food
  //foodLeaves.move();
//  foodBerries.move();
//  foodPlant.move();

  if (dinoStegosaurus.foodEaten + dinoTriceratops.foodEaten >= 21) {
    tornado.move();
    tornado.display();
    for (let i = 0; i < dinos.length; i++) {
      tornado.slow(dinos[i]);
    }
  }
  if (dinoStegosaurus.foodEaten + dinoTriceratops.foodEaten >= 31) {
    fire.move();
    fire.display();
    for (let i = 0; i < dinos.length; i++) {
      fire.fade(dinos[i]);
    }
  }
  if (dinoStegosaurus.foodEaten + dinoTriceratops.foodEaten >= 41) {
    meteor.move();
    meteor.display();
    for (let i = 0; i < dinos.length; i++) {
      meteor.teleport(dinos[i]);
    }
  }

  // Arrays for the dinos' check state, handleInput, move, display and handleEating.
  for (let i = 0; i < dinos.length; i++) {
    console.log();
    dinos[i].checkState();
    dinos[i].handleInput();
    dinos[i].move(deltaTime);
    dinos[i].display(alpha);
    dinos[i].handleEating(foodLeaves);
    dinos[i].handleEating(foodBerries);
    dinos[i].handleEating(foodPlant);
    // Arrays for the food's move, display and handleWrapping.
    for (let j = 0; j < food.length; j++) {
      food[j].handleWrapping(dinos[i]);
    }
  }

  for (let j = 0; j < food.length; j++) {
  food[j].move();
  food[j].display();
}


  // Display all the Food
//  foodLeaves.display();
//  foodBerries.display();
//  foodPlant.display();

  // A foreground image of foliage + changes of foliage to match background
  image(foregroundImage1, 0, 0);

  if (dinoStegosaurus.foodEaten + dinoTriceratops.foodEaten > foodAmountForeground) {
    image(foregroundImage2, 0, 0);
  }
  if (dinoStegosaurus.foodEaten + dinoTriceratops.foodEaten > foodAmountForeground + 9) {
    image(foregroundImage3, 0, 0);
  }
  if (dinoStegosaurus.foodEaten + dinoTriceratops.foodEaten > foodAmountForeground + 19) {
    image(foregroundImage4, 0, 0);
  }
  if (dinoStegosaurus.foodEaten + dinoTriceratops.foodEaten > foodAmountForeground + 29) {
    image(foregroundImage5, 0, 0);
  }
}

// Mousse pressed funtion that allows the game to start and to replay after game over.
function mousePressed() {
  if (gameOverScreen) {
    resetGame();
  } else if (titleScreen === true) {
    titleScreen = false;
    instructionsScreen = true;
    backgroundMusic.play();

  } else if (instructionsScreen === true) {
    instructionsScreen = false;
    gameStartSound.play();

  } else if (gameWon === true) {
    backgroundMusic.stop();
    resetGame();
  }
}

// Game over function
function checkGameOver() {
  if (dinoStegosaurus.dinoDead || dinoTriceratops.dinoDead) {
    gameOverScreen = true;
    backgroundMusic.stop();
    gameOverSound.play();
  }
}

// The function that resets all the variables to their original game start up.
function resetGame() {
  foodLeaves.reset();
  foodBerries.reset();
  foodPlant.reset();
  if (dinoStegosaurus.foodEaten + dinoTriceratops.foodEaten >= 20) {
    tornado.reset();
  }
  if (dinoStegosaurus.foodEaten + dinoTriceratops.foodEaten >= 30) {
    fire.reset();
  }
  if (dinoStegosaurus.foodEaten + dinoTriceratops.foodEaten >= 40) {
    meteor.reset();
  }
  dinoStegosaurus.reset();
  dinoTriceratops.reset();
  gameOverScreen = false;
  titleScreen = true;
  instructionsScreen = false;
  gameWon = false;
}
