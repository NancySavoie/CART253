// The Last Dinosaur
// Exercise 8 / Project 3 - Nancy Savoie
//
// Based on Project 2 and 1.
// Building on these previous codes while making it different (eventually).
//
// Artwork by Nancy Savoie and creative commons
// Music from TBD

let hasGameStarted = false;
let isGameOver = false;

// The Dinosaurs (the Dinos)
let dinoStegosaurus;
let dinoTriceratops;

// Arrays for the dinos
let dinos = [];

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
let gameOverPikaSound;
let pokemonCaughtSound;
let pokeballDeadSound;
let pikachuStartSound;

// Preload functions for images and sounds
function preload() {
  // Preload for images
  backgroundImage1 = loadImage('./assets/images/backgroundImage1.png');
  backgroundImage2 = loadImage('./assets/images/backgroundImage2.png');
  backgroundImage3 = loadImage('./assets/images/backgroundImage3.png');
  backgroundImage4 = loadImage('./assets/images/backgroundImage4.png');
  backgroundImage5 = loadImage('./assets/images/backgroundImage5.png');
  startImage = loadImage('./assets/images/startImage.jpg');
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
  gameOverPikaSound = loadSound('./assets/sounds/gameOverPikaSound.mp3');
  pokemonCaughtSound = loadSound('./assets/sounds/pokemonCaughtSound.mp3');
  pokeballDeadSound = loadSound('./assets/sounds/pokeballDeadSound.mp3');
  pikachuStartSound = loadSound('./assets/sounds/pikachuStartSound.mp3');
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
  if (isGameOver === true) {
    image(endingImage, 0, 0);

  } else if (hasGameStarted === false) {
    image(startImage, 0, 0);

  } else {
    handlePlay();
  }
}

// Handles input, movement, catching, and displaying for the system's objects
function handlePlay() {
  // Pokémon forest as a background image
  image(backgroundImage1, 0, 0);
  checkGameOver();

  //Display the amount of Pokémon caught by player 1
  textFont("Courier");
  textAlign(LEFT, TOP);
  textSize(20);
  fill(255, 20, 0);
  text("Stegosaurus: " + dinoStegosaurus.foodEaten, 15, 0);

  //Display the amount of Pokémon caught by player 2
  textFont("Courier");
  textAlign(RIGHT, TOP);
  textSize(20);
  fill(220, 220, 0);
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
  if (isGameOver) {
    resetGame();
  } else if (hasGameStarted === false) {
    console.log("startedGame")
    hasGameStarted = true;
    pikachuStartSound.play();
    backgroundMusic.loop();
  }
}

// Game over function
function checkGameOver() {
  if (dinoStegosaurus.dinoDead && dinoTriceratops.dinoDead) {
    isGameOver = true;
    console.log("game over")
    backgroundMusic.stop();
    gameOverPikaSound.play();
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
  pikachuStartSound.play();
  backgroundMusic.loop();
  isGameOver = false;
}
