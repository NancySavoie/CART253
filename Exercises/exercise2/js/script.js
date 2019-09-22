/******************************************************

Exercise 2 - The Artful Dodger Plus
Nancy Savoie

******************************************************/

// The position and size of our avatar circle
  let avatarX;
  let avatarY;
  let avatarSize = 50;

// The speed and velocity of our avatar circle
  let avatarSpeed = 10;
  let avatarVX = 0;
  let avatarVY = 0;

// The position and size of the enemy square
  let enemyX;
  let enemyY;
  let enemySize = 35;

// The speed and velocity of our enemy square
  let enemySpeed = 5;
  let enemyVX = 5;

// How many dodges the player has made
  let dodges = 0;

//Added by Nancy ----------------------------------------------------------

      //The avatar image
      let avatarImage;

      //The enemy image
      let enemyImage;

      //Preload function for the avatar and enemy images (Mario and Paratroopa)
      function preload() {
        avatarImage = loadImage("assets/images/avatarImage.png");
        enemyImage = loadImage("assets/images/enemyImage.png");
        }

//------------------------------------------------------------------------

// setup()
//
// Make the canvas, position the avatar and anemy
  function setup() {
// Create our playing area
  createCanvas(500,500);

// Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

// Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

// Bold strokes to clearly outline the shapes, especially during color change
  stroke(255,255,255);
  strokeWeight(3);
  }

// Handle moving the avatar and enemy and checking for dodges and
// game over situations.

function draw() {

//Added by Nancy ----------------------------------------------------------

      //Light blue background to start
        background(23, 165, 252);

     //The background changes color at every 10th level (up to level 50).
      if (dodges > 10) {
        background (251, 255, 0)
        }
      if (dodges > 20) {
        background (81, 219, 93)
        }
      if (dodges > 30) {
        background (44, 51, 171)
        }
      if (dodges > 40) {
        background (250, 125, 7)
        }
      if (dodges > 50) {
        background (250, 7, 7)
        }

      //The score displays successful dodges
        textFont("Impact");
        textAlign(RIGHT,TOP);
        textSize(70);
        fill(252, 231, 3);
        text(dodges,width,0);

//------------------------------------------------------------------------

// Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

// Check which keys are down and set the avatar's velocity based on its
// speed appropriately

// Left and right
  if (keyIsDown(LEFT_ARROW)) {
  avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
  avatarVX = avatarSpeed;
  }

// Up and down (separate if-statements so you can move vertically and
// horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
  avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
  avatarVY = avatarSpeed;
  }

// Move the avatar according to its calculated velocity
avatarX = avatarX + avatarVX;
avatarY = avatarY + avatarVY;

// The enemy always moves at enemySpeed
enemyVX = enemySpeed;

// Update the enemy's position based on its velocity
enemyX = enemyX + enemyVX;

// Check if the enemy and avatar overlap - if they do the player loses
// We do this by checking if the distance between the centre of the enemy
// and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
// Tell the player they lost
  console.log("YOU LOSE!");
// Reset the enemy's position
  enemyX = 0;
  enemyY = random(0,height);

//Added by Nancy  --------------------------------------------------------

        //Enemy speed and size resets after the player loses.
          enemySize = 35;
          enemySpeed = 5;

//------------------------------------------------------------------------

// Reset the avatar's position
  avatarX = width/2;
  avatarY = height/2;
// Reset the dodge counter
  dodges = 0;
  }
// Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
// If they went off the screen they lose in the same way as above.
  console.log("YOU LOSE!");
  enemyX = 0;
  enemyY = random(0,height);
  avatarX = width/2;
  avatarY = height/2;
  dodges = 0;
  }
// Check if the enemy has moved all the way across the screen
  if (enemyX > width) {

//Added by Nancy  ---------------------------------------------------------

        //The enemy increases in size & speed each time there's a successful dodge
          enemySize = enemySize + 1;
          enemySpeed = enemySpeed + 0.25;

//------------------------------------------------------------------------

// This means the player dodged so update its dodge statistic
  dodges = dodges + 1;
// Tell them how many dodges they have made
  console.log(dodges + " DODGES!");
// Reset the enemy's position to the left at a random height
  enemyX = 0;
  enemyY = random(0,height);
  }

// Display the number of successful dodges in the console
  console.log(dodges);

//Added by Nancy  -----------------------------------------------------------

        //Draw the avatar image (Mario)
        image(avatarImage, avatarX, avatarY, avatarSize, avatarSize);

        //Draw the enemy image (Paratroopa)
        image(enemyImage, enemyX, enemyY, enemySize, enemySize);
        }

//------------------------------------------------------------------------
// Mario and Paratroopa © Nintendo
// Images from freepngimg.com
