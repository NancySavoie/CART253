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

      // No stroke so it looks cleaner
      noStroke();
    }

    // Handle moving the avatar and enemy and checking for dodges and
    // game over situations.

function draw() {
//The Score
    textFont("Impact");
    textAlign(LEFT,TOP);
    textSize(70);
    fill(0);
    text(dodges,width,0);

//Light blue background
  background(200,255,250);

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
        // Reset the avatar's position
        avatarX = width/2;
        avatarY = height/2;
        // Reset the dodge counter
        dodges = 0;

//Enemy get bigger and faster is the avatar doesn't dodge.
  enemySize = enemySize + 5;
  enemySpeed = enemySpeed + 0.25;
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

//The player is magenta
  fill(255,0,125);
//Draw the player as a circle
  ellipse(avatarX,avatarY,avatarSize,avatarSize);

//The enemy is dark green
  fill(0,100,100);
// Draw the enemy as a square
  rect(enemyX,enemyY,enemySize,enemySize);

    }
