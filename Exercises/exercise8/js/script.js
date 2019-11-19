// Gotta Catch 'em all!
// Exercise 8 / Project 3 - Nancy Savoie
//
// Based on Project 2 and 1.
// Building on these previous codes while making it different (eventually).
//
// Dinosaur avatars by Nancy Savoie
// Music from https://www.youtube.com/watch?v=QaaD9CnWgig
// Background and additional pixel art from the Itch.o community, modified by Nancy Savoie.

let hasGameStarted = false;
let isGameOver = false;

// The Dinosaurs (the Dinos)
let dinoStegosaurus;
let dinoTriceratops;

// Arrays for the dinos
let dinos = [];

// The survival items (The food)
let pikachu;
let squirtle;
let bulbasaur;
let evee;
let jigglypuff;

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
let pikachuImage;
let squirtleImage;
let bulbasaurImage;
let eveeImage;
let jigglypuffImage;
let zapdosImage;
let articunoImage;
let moltresImage;

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
  pikachuImage = loadImage('./assets/images/pikachuImage.png');
  squirtleImage = loadImage('./assets/images/squirtleImage.png');
  bulbasaurImage = loadImage('./assets/images/bulbasaurImage.png');
  eveeImage = loadImage('./assets/images/eveeImage.png');
  jigglypuffImage = loadImage('./assets/images/jigglypuffImage.png');
  zapdosImage = loadImage('./assets/images/zapdosImage.png');
  articunoImage = loadImage('./assets/images/articunoImage.png');
  moltresImage = loadImage('./assets/images/moltresImage.png');
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
  pikachu = new Food(100, 100, 10, 25, pikachuImage);
  squirtle = new Food(100, 100, 8, 25, squirtleImage);
  bulbasaur = new Food(100, 100, 20, 25, bulbasaurImage);
  evee = new Food(100, 100, 20, 25, eveeImage);
  jigglypuff = new Food(100, 100, 20, 25, jigglypuffImage);
  // New classes - Legendary
  articuno = new CatalystFlood(100, 100, 20, 100, articunoImage);
  moltres = new CatalystFire(50, 100, 20, 100, moltresImage);
  zapdos = new CatalystMeteor(50, 100, 20, 100, zapdosImage);
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

  // Move all the dinos and the pokemon
  pikachu.move();
  squirtle.move();
  bulbasaur.move();
  evee.move();
  jigglypuff.move();
  zapdos.move();
  articuno.move();
  moltres.move();

  // Arrays for the dinos' check state, handleInput, move, display and handleEating.
  for (let i = 0; i < dinos.length; i++) {
    dinos[i].checkState();
    articuno.slow(dinos[i]);
    moltres.fade(dinos[i]);
    zapdos.teleport(dinos[i]);
    dinos[i].handleInput();
    dinos[i].move();
    dinos[i].display();
    dinos[i].handleEating(pikachu);
    dinos[i].handleEating(squirtle);
    dinos[i].handleEating(bulbasaur);
    dinos[i].handleEating(evee);
  }

  // Display all the Pokémon
  pikachu.display();
  squirtle.display();
  bulbasaur.display();
  evee.display();
  jigglypuff.display();
  zapdos.display();
  articuno.display();
  moltres.display();
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
  pikachu.reset();
  squirtle.reset();
  bulbasaur.reset();
  evee.reset();
  jigglypuff.reset();
  zapdos.reset();
  articuno.reset();
  moltres.reset();
  dinoStegosaurus.reset();
  dinoTriceratops.reset();
  pikachuStartSound.play();
  backgroundMusic.loop();
  isGameOver = false;
}
