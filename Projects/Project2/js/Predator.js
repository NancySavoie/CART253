// Predator
//
// A class that represents a simple predator (Pokeballs)
// controlled by the arrow keys. It can move around
// the screen and consume Prey objects to maintain its health.

class Predator {

  // constructor
  //
  // Sets the initial values for the Pokeball's (predator) properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius, upKey, downKey, leftKey, rightKey, sprintKey, image, alpha) {
    // Position
    this.x = random(1000,0);
    this.y = random(0,1000);
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.healthLossPerMove = 0.05;
    this.healthGainPerEat = 1;
    // Display properties
    this.radius = this.health; // Radius is defined in terms of health
    this.image = image; // Predator images
    this.alpha = 255; // The tint of the image (for the Legendary Fade)
    // Input properties
    this.upKey = upKey;
    this.downKey = downKey;
    this.leftKey = leftKey;
    this.rightKey = rightKey;
    this.sprintKey = sprintKey; // Sprinting key
    this.preyEaten = 0;
    this.predatorDead = false; // The status of Pokeballs (predators)
  }

  // handleInput
  //
  // Checks if a key is pressed and sets the Pokeball's velocity appropriately.
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
    // Pokeball speeds up when designatd key is pressed
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
  // Checks if the Pokeball has gone off the canvas and wraps it to the other side if it did.
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
  // Takes a Pokémon as an argument and checks if the Pokeball overlaps it. If so,
  // it reduces the Pokémon's health and increases the pokeball's. If a Pokémon is caught, it gets reset.
  handleEating(prey) {
    // Calculate distance from this pokeball to the Pokémon
    let d = dist(this.x, this.y, prey.x, prey.y);
    // Check if the Pokeball and the pokemon overlaps
    if (d < this.radius + prey.radius) {
      // Increase Pokeball energy and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Decrease Pokémon health by the same amount
      prey.health -= this.healthGainPerEat;
      // Check if the Pokémon was caught and reset it if so
      if (prey.health < 0) {
        this.preyEaten += 1;
        prey.reset();
        pokemonCaughtSound.play();
      }
    }
  }

  // If pokeball runs out of energy
  checkState() {
    if (this.health < 0.1 && this.health > 0) { // This prevents the sound from repeating itself every frame
      pokeballDeadSound.play(); // Sound plays when the Pokeball disapears (runs out of energy)
      console.log("checkState")
      this.predatorDead = true;
    }
  }

  // display
  //
  // Draw Pokeballs as the "predators" of the game with a radius the same size as its current health.
  display() {
    if (this.health > 0) {
      push();
      this.radius = this.health;
      tint(255, this.alpha);
      image(this.image, this.x, this.y, 2 * this.radius, 2 * this.radius);
      fill(255);
      text("Gotcha!: " + this.preyEaten, this.x, this.y + this.radius + 10);
      pop();
    }
  }

  // reset()
  //
  // Reset positions, locations and values of Pokeballs (predators)
  reset() {
    this.radius = 40;
    this.health = this.radius;
    this.x = random(0, windowWidth);
    this.y = random(0, windowHeight);
    this.predatorDead = false;
    this.preyEaten = 0;
    this.alpha = 255;
  }
}
