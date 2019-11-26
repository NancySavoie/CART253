// Dino
//
// A class that represents a Dinosaur (Stegosaurus and Triceratops)
// controlled by specific keyboard keys. It can move around
// the screen and consumes food objects to maintain its health and survival.

class Dino {

  // constructor
  //
  // Sets the initial values for the Dinosaur's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius, upKey, downKey, leftKey, rightKey, sprintKey, image, alpha) {
    // Position
    this.x = random(1000, 0);
    this.y = random(0, 1000);
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.healthLossPerMove = 0.03;
    this.healthGainPerEat = 2;
    // Display properties
    this.radius = this.health; // Radius is defined in terms of health
    this.image = image; // Dino images
    this.alpha = 255; // The tint of the image (for the Fire Catalyst)
    // Input properties
    this.upKey = upKey;
    this.downKey = downKey;
    this.leftKey = leftKey;
    this.rightKey = rightKey;
    this.sprintKey = sprintKey; // Sprinting key
    this.foodEaten = 0;
    this.dinoDead = false; // The status of dinos
  }

  // handleInput
  //
  // Checks if a key is pressed and sets the Dinosaur's velocity appropriately.
  handleInput() {
    // Horizontal movement
    if (keyIsDown(this.leftKey)) {
      this.vx = -this.speed;
    } else if (keyIsDown(this.rightKey)) {
      this.vx = this.speed;
    } else {
      this.vx = 0;
    }
    // Vertical movement
    if (keyIsDown(this.upKey)) {
      this.vy = -this.speed;
    } else if (keyIsDown(this.downKey)) {
      this.vy = this.speed;
    } else {
      this.vy = 0;
    }
    // Dinosaur speeds up when designatd key is pressed
    if (keyIsDown(this.sprintKey)) {
      this.vx *= 2;
      this.vy *= 2;
    }
  }

  // move
  //
  // Updates the position according to velocity
  // Lowers energy power
  // Handles wrapping
  move() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update health
    this.health = this.health - this.healthLossPerMove;
    this.health = constrain(this.health, 0, this.maxHealth);
    // Handle wrapping
    this.handleWrapping();
    // }
  }

  // handleWrapping
  //
  // Checks if the Dinosaur has gone off the canvas and wraps it to the other side if it did.
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    } else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    } else if (this.y > height) {
      this.y -= height;
    }
  }

  // handleEating
  //
  // Takes food as an argument and checks if the Dinosaur overlaps it. If so,
  // it reduces the food's health and increases the Dinosaur's. If food is caught, it gets reset.
  handleEating(food) {
    // Calculate distance from this Dinosaur to the food
    let d = dist(this.x, this.y, food.x, food.y);
    // Check if the Dinosaur and the food overlaps
    if (d < this.radius + food.radius) {
      // Increase Dinosaur energy and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Decrease food health by the same amount
      food.health -= this.healthGainPerEat;
      // Check if the food was caught and reset it if so
      if (food.health < 0) {
        this.foodEaten += 1;

        food.reset();
        foodEatenSound.play();
      }
    }
  }

  // If Dinosaur runs out of food
  checkState() {
    if (this.health < 0.1 && this.health > 0) { // This prevents the sound from repeating itself every frame
      dinoDeadSound.play(); // Sound plays when the Dinosaur disapears (runs out of energy)
      console.log("checkState")
      this.dinoDead = true;
    }
  }

  // display
  //
  // Draw dinos with a radius the same size as its current health.
  display() {
    if (this.health > 0) {
      push();
      this.radius = this.health;
      tint(255, this.alpha);
      image(this.image, this.x, this.y, 5 * this.radius, 3 * this.radius);
      pop();
    }
  }

  // reset()
  //
  // Reset positions, locations and values of dinos
  reset() {
    this.radius = 40;
    this.health = this.radius;
    this.x = random(0, windowWidth);
    this.y = random(0, windowHeight);
    this.dinoDead = false;
    this.FoodEaten = 0;
    this.alpha = 255;
  }
}
