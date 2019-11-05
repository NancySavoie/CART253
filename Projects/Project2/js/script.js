// Gotta Catch 'em all!
// Project 2 - Nancy Savoie
//
// A predator and prey type game with adorable Pokémon!
// The pokeball chases the Pokémon using the arrow keys to catch them all.
// The pokeball loses energy power over time, so it must keep catching Pokémon in order to go on!
// Watch out for legendary Pokémon!
//
// Pictures from stickpng.com
// Music from https://www.youtube.com/watch?v=QaaD9CnWgig
// © Pokémon. TM, ® Nintendo


let hasGameStarted = false;
let isGameOver = false;

// let state = "START";
// let gameOver = false;

// The pokeballs (the predators)
let pokeball1;
let pokeball2;
let pokeball3;
// Arrays for the pokeballs
let pokeballs = [];

// The Pokémon (The prey)
let pikachu;
let squirtle;
let bulbasaur;
let evee;
let jigglypuff;

// Legendary Pokemon
let mew;
let mewtwo;

// Display the images
let backgroundImage;
let pokeball1Image;
let pokeball2Image;
let pokeball3Image;
let pikachuImage;
let squirtleImage;
let bulbasaurImage;
let eveeImage;
let jigglypuffImage;
let mewImage
let mewtwoImage

// Display sounds
let backgroundMusic;
let gameOverPikaSound;
let pokemonCaughtSound;
let pokeballDeadSound;
let pikachuStartSound;

// Preload functions for images and sounds
function preload() {
  // Preload for images
  backgroundImage = loadImage('./assets/images/backgroundImage.png');
  startImage = loadImage('./assets/images/startImage.jpg');
  endingImage = loadImage('./assets/images/endingImage.jpg');
  pokeball1Image = loadImage('./assets/images/pokeball1Image.png');
  pokeball2Image = loadImage('./assets/images/pokeball2Image.png');
  pokeball3Image = loadImage('./assets/images/pokeball3Image.png');
  pikachuImage = loadImage('./assets/images/pikachuImage.png');
  squirtleImage = loadImage('./assets/images/squirtleImage.png');
  bulbasaurImage = loadImage('./assets/images/bulbasaurImage.png');
  eveeImage = loadImage('./assets/images/eveeImage.png');
  jigglypuffImage = loadImage('./assets/images/jigglypuffImage.png');
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
// Creates objects for the pokeballs (predators) and the pokemons (prey)
function setup() {
  createCanvas(1400, 1024);
  pokeball1 = new Predator(100, 100, 5, 40, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 32, pokeball1Image);
  pokeball2 = new Predator(200, 200, 5, 40, 87, 83, 65, 68, 16, pokeball2Image);
  pokeball3 = new Predator(50, 200, 5, 40, 73, 75, 74, 76, 18, pokeball3Image);
  pikachu = new Prey(100, 100, 10, 50, pikachuImage);
  squirtle = new Prey(100, 100, 8, 60, squirtleImage);
  bulbasaur = new Prey(100, 100, 20, 10, bulbasaurImage);
  evee = new Prey(100, 100, 20, 10, eveeImage);
  jigglypuff = new Prey(100, 100, 20, 10, jigglypuffImage);
  // New classes

  //place pokeballs into array
  pokeballs = [pokeball1, pokeball2, pokeball3];

}

// draw()
function draw(){
  if (isGameOver === true){
    image(endingImage,0,0);

  } else if (hasGameStarted === false){
    image(startImage,0,0);

  } else {
    handlePlay();
  }
}

// Handles input, movement, catching, and displaying for the system's objects

function handlePlay(){
  // Pokémon forest as a background image
  image(backgroundImage, 0, 0);
  checkGameOver();

  //Display the amount of Pokémon caught by player 1
  textFont("Impact");
  textAlign(LEFT, TOP);
  textSize(20);
  fill(255, 20, 0);
  text("Player 1 (RED) - Pokemon caught: " + pokeball1.preyEaten, 15, 0);

  //Display the amount of Pokémon caught by player 2
  textFont("Impact");
  textAlign(RIGHT, TOP);
  textSize(20);
  fill(220, 220, 0);
  text("Player 2 (YELLOW) - Pokemon caught: " + pokeball2.preyEaten, 800, 0);

  //Display the amount of Pokémon caught by player 3
  textFont("Impact");
  textAlign(RIGHT, TOP);
  textSize(20);
  fill(0, 0, 255);
  text("Player 3 (BLUE) - Pokemon caught: " + pokeball3.preyEaten, 1375, 0);


  // Move all the pokeballs and the pokemon
  pikachu.move();
  squirtle.move();
  bulbasaur.move();
  evee.move();
  jigglypuff.move();

  // Arrays for the pokeballs' check state, handleinput, move and display
  for (let i = 0; i < pokeballs.length; i++){
    pokeballs[i].checkState();
    pokeballs[i].handleInput();
    pokeballs[i].move();
    pokeballs[i].display();
  }

  // Handle the Pokeballs catching any of the Pokémon
  pokeball1.handleEating(pikachu);
  pokeball1.handleEating(squirtle);
  pokeball1.handleEating(bulbasaur);
  pokeball1.handleEating(evee);
  pokeball1.handleEating(jigglypuff);
  pokeball2.handleEating(pikachu);
  pokeball2.handleEating(squirtle);
  pokeball2.handleEating(bulbasaur);
  pokeball2.handleEating(evee);
  pokeball2.handleEating(jigglypuff);
  pokeball3.handleEating(pikachu);
  pokeball3.handleEating(squirtle);
  pokeball3.handleEating(bulbasaur);
  pokeball3.handleEating(evee);
  pokeball3.handleEating(jigglypuff);

  // Display all the Pokémon
  pikachu.display();
  squirtle.display();
  bulbasaur.display();
  evee.display();
  jigglypuff.display();
}

function mousePressed(){
  if (isGameOver) {
      resetGame();
    } else if (hasGameStarted === false){
    console.log("startedGame")
    hasGameStarted = true;
    pikachuStartSound.play();
    backgroundMusic.loop();
  }

}

// Game over function
function checkGameOver() {
  if (pokeball1.predatorDead && pokeball2.predatorDead && pokeball3.predatorDead){

    isGameOver = true;
    console.log("game over")
    backgroundMusic.stop();
    gameOverPikaSound.play();
}
}

// The function that resets all the variables to their original game start up.
function resetGame() {
  if (isGameOver === true)
  pikachu.reset();
  squirtle.reset();
  bulbasaur.reset();
  evee.reset();
  jigglypuff.reset();
  backgroundMusic.loop();
  pokeball1.reset();
  pokeball2.reset();
  pokeball3.reset();
  isGameOver = false;


}
