// Legendary Pokémon 3
//
// A class that represents a challenge to the Pokeballs (predators), it cannot be caught...
// It is bigger than a regular "prey" and if the Pokeball touches it, it teleports the player.

class LegendaryTeleport {

  // constructor
  //
  // Sets the initial values for the Pokémon's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius, image) {
    // Position
    this.x = random(0, windowWidth);
    this.y = random(0, windowWidth);
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.radius = radius;
    this.speed = speed;
    // Time properties for noise() function
    this.tx = random(0, 500); // To make x and y noise different
    this.ty = random(0, 500); // we use random starting values
    // To display the Pokemon image (Zapdos)
    this.image = image;
  }

  // If a player touches this Pokémon, they will be teleported.
  teleport(predator) {
    // Calculate distance from teleport to Pokeball
    let d = dist(this.x, this.y, predator.x, predator.y);
    // Check if the Pokeball and the Pokémon overlap
    if (d < this.radius + predator.radius) {
      // Random location for the predator when teleporting
      predator.x = random(0, width);
      predator.x = random(0, height);
      // Reset the teleport once the predator (Pokeball) touches it
      this.reset();
      }
    }

  // move
  //
  // Sets velocity based on the noise() function and the Pokémon's speed
  // Moves based on the resulting velocity and handles wrapping
  move() {
    // Set velocity via noise()
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update time properties
    this.tx += 0.01;
    this.ty += 0.01;
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the Pokémon has gone off the canvas and wraps it to the other side if it did.
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

  // display
  //
  // Pokémon image, Zaptos, for the Legendary Slow class of the game.
  display() {
    push();
    noStroke();
    image(this.image, this.x, this.y, 200, 150);
    pop();
  }

  // reset
  //
  // Set the position to a random location.
  reset() {
    // Random position
    this.x = random(0, width);
    this.y = random(0, height);
  }
}
