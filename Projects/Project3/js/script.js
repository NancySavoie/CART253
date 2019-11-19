// The Last Dinosaur
// Exercise 8 / Project 3 - Nancy Savoie
//
// Based on Project 2 and 1.
// Building on these previous codes while making it different (eventually).
//
// Artwork by Nancy Savoie and creative commons
// Music from https://www.youtube.com/watch?v=cSqdu7Qlz7k

// States
let titleScreen = false;
let instructionsScreen = false;
let playScreen = false;
let gameOverScreen = false;

// The Dinosaurs (the Dinos)
let dinoStegosaurus;
let dinoTriceratops;

// Arrays
let dinos = [];
let food = [];

// The survival items (The food)
let foodLeaves;
let foodBerries;
let foodPlant;

// The Catalysts
let zapdos;
let articuno;
let moltres;

// Display the images
let backgroundImage1;
let backgroundImage2;
let backgroundImage3;
let backgroundImage4;
let backgroundImage5;
let dinoStegosaurusImage;
let dinoTriceratopsImage;
let foodLeavesImage;
let foodBerriesImage;
let foodPlantImage;
//let zapdosImage;
//let articunoImage;
//let moltresImage;

// Display sounds
let backgroundMusic;
let gameOverSound;
let foodEatenSound;
let dinoDeadSound;
let gameStartSound;

// Preload functions for images and sounds
function preload() {
  // Preload for images
  backgroundImage1 = loadImage('./assets/images/backgroundImage1.png');
  backgroundImage2 = loadImage('./assets/images/backgroundImage2.png');
  backgroundImage3 = loadImage('./assets/images/backgroundImage3.png');
  backgroundImage4 = loadImage('./assets/images/backgroundImage4.png');
  backgroundImage5 = loadImage('./assets/images/backgroundImage5.png');
  startImage = loadImage('./assets/images/startImage.jpg');
  instructionsImage = loadImage('./assets/images/instructionsImage.jpg');
  endingImage = loadImage('./assets/images/endingImage.jpg');
  dinoStegosaurusImage = loadImage('./assets/images/dinoStegosaurusImage.png');
  dinoTriceratopsImage = loadImage('./assets/images/dinoTriceratopsImage.png');
  foodLeavesImage = loadImage('./assets/images/foodLeavesImage.png');
  foodBerriesImage = loadImage('./assets/images/foodBerriesImage.png');
  foodPlantImage = loadImage('./assets/images/foodPlantImage.png');

  //zapdosImage = loadImage('./assets/images/zapdosImage.png');
  //articunoImage = loadImage('./assets/images/articunoImage.png');
  //moltresImage = loadImage('./assets/images/moltresImage.png');

  // Preload for sounds
  backgroundMusic = loadSound('./assets/sounds/backgroundMusic.mp3');
  gameOverSound = loadSound('./assets/sounds/gameOverSound.mp3');
  foodEatenSound = loadSound('./assets/sounds/foodEatenSound.mp3');
  dinoDeadSound = loadSound('./assets/sounds/dinoDeadSound.mp3');
  gameStartSound = loadSound('./assets/sounds/gameStartSound.mp3');
}

// setup()
//
// Sets up a canvas
// Creates objects for the dinos (Dinos) and the pokemons (food)
function setup() {
  createCanvas(700, 500);
  dinoStegosaurus = new Dino(200, 200, 5, 40, 87, 83, 65, 68, 16, dinoStegosaurusImage);
  dinoTriceratops = new Dino(100, 100, 5, 40, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 32, dinoTriceratopsImage);
  foodLeaves = new Food(100, 100, 10, 25, foodLeavesImage);
  foodBerries = new Food(100, 100, 8, 25, foodBerriesImage);
  foodPlant = new Food(100, 100, 20, 25, foodPlantImage);
  // New classes - Legendary
  //  articuno = new CatalystFlood(100, 100, 20, 100, articunoImage);
  //  moltres = new CatalystFire(50, 100, 20, 100, moltresImage);
  //  zapdos = new CatalystMeteor(50, 100, 20, 100, zapdosImage);
  // Place dinos into array
  dinos = [dinoStegosaurus, dinoTriceratops];
}

// Draw()
function draw() {
  if (gameOverScreen === true) {
    image(endingImage, 0, 0);

  } else if (titleScreen === false) {
    image(startImage, 0, 0);

  } else if (instructionsScreen === false) {
    image(instructionsImage, 0, 0);

  } else {
    handlePlay();
  }
}

// Handles input, movement, eating, and displaying for the system's objects
function handlePlay() {
  if (titleScreen === true) {
    // Dinosaur jungle as a background image
    image(backgroundImage1, 0, 0);
    checkGameOver();

    //The background changes after a certain ammount of food was eaten.
    if (dinoStegosaurus.foodEaten + dinoTriceratops.foodEaten > 10) {
      image(backgroundImage2, 0, 0);
    }
    if (dinoStegosaurus.foodEaten + dinoTriceratops.foodEaten > 15) {
      image(backgroundImage3, 0, 0);
    }
    if (dinoStegosaurus.foodEaten + dinoTriceratops.foodEaten > 20) {
      image(backgroundImage4, 0, 0);
    }
    if (dinoStegosaurus.foodEaten + dinoTriceratops.foodEaten > 25) {
      image(backgroundImage5, 0, 0);
    }
  }

  //Display the amount of Pokémon caught by player 1
  textFont("Futura");
  textAlign(LEFT, TOP);
  textSize(20);
  fill(40, 115, 80);
  text("Stegosaurus: " + dinoStegosaurus.foodEaten, 15, 0);

  //Display the amount of Pokémon caught by player 2
  textFont("Futura");
  textAlign(RIGHT, TOP);
  textSize(20);
  fill(40, 115, 80);
  text("Triceratops: " + dinoTriceratops.foodEaten, 680, 0);

  // Move all the dinos and the food
  foodLeaves.move();
  foodBerries.move();
  foodPlant.move();
  //zapdos.move();
  //articuno.move();
  //  moltres.move();

  // Arrays for the dinos' check state, handleInput, move, display and handleEating.
  for (let i = 0; i < dinos.length; i++) {
    dinos[i].checkState();
    //  articuno.slow(dinos[i]);
    //  moltres.fade(dinos[i]);
    //  zapdos.teleport(dinos[i]);
    dinos[i].handleInput();
    dinos[i].move();
    dinos[i].display();
    dinos[i].handleEating(foodLeaves);
    dinos[i].handleEating(foodBerries);
    dinos[i].handleEating(foodPlant);

  }

  // Display all the Pokémon
  foodLeaves.display();
  foodBerries.display();
  foodPlant.display();
  //  zapdos.display();
  //  articuno.display();
  //  moltres.display();
}

// Mousse pressed funtion that allows the game to start and to replay after game over.
function mousePressed() {
  if (gameOverScreen) {
    resetGame();
  } else if (titleScreen === false) {
    console.log("startedGame")
    titleScreen = true;
    gameStartSound.play();
    backgroundMusic.loop();

} else if (instructionsScreen === false) {
  instructionsScreen = true;
  }
}

// Game over function
function checkGameOver() {
  if (dinoStegosaurus.dinoDead && dinoTriceratops.dinoDead) {
    gameOverScreen = true;
    console.log("game over")
    backgroundMusic.stop();
    gameOverSound.play();
  }
}

// The function that resets all the variables to their original game start up.
function resetGame() {
  foodLeaves.reset();
  foodBerries.reset();
  foodPlant.reset();
  //  zapdos.reset();
  //  articuno.reset();
  //  moltres.reset();
  dinoStegosaurus.reset();
  dinoTriceratops.reset();
  gameStartSound.play();
  backgroundMusic.loop();
  gameOverScreen = false;
}
