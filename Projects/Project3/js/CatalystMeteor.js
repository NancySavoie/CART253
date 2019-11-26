// Meteor Catalyst
//
// A class that represents a challenge to the dinosaurs.
// If the player touches a meteor, it will catapult (teleport) the dinosaur(s) somewhere else on the canvas.

class CatalystMeteor {

  // constructor
  //
  // Sets the initial values for the catalyst's properties
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
    // To display the catalyst image (Meteor)
    this.image = image;
  }

  // If a player touches this catalyst, they will be teleported.
  teleport(dino) {
    // Calculate distance from teleport to Dinosaur
    let d = dist(this.x, this.y, dino.x, dino.y);
    // Check if the Dinosaur and the catalyst overlap
    if (d < this.radius + dino.radius) {
      // Random location for the dino when teleporting
      dino.x = random(0, width);
      dino.x = random(0, height);
      // Reset the teleport once the dino touches it
      this.reset();
    }
  }

  // move
  //
  // Sets velocity based on the noise() function and the catalyst's speed
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
  // Checks if the catalyst has gone off the canvas and wraps it to the other side if it did.
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
  // catalyst image, Zaptos, for the Legendary Slow class of the game.
  display() {
    push();
    noStroke();
    image(this.image, this.x, this.y, 250, 200);
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
