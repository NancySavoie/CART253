// Tornado Catalyst
//
// A class that represents a challenge to the dinos (dinos), it cannot be caught!
// If a player encounters a Tornado, it will slow the dinosaur(s) down.

class CatalystTornado {

  // constructor
  //
  // Sets the initial values for the Catalyst's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius, image) {
    // Position
    this.x = random(0, windowWidth);
    this.y = random(0, windowWidth);
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.radius = radius;
    this.speed = 0;
    // To display the Catalyst image (Tornado)
    this.image = image;
  }

  // If a player touches this Catalyst, their speed will slow down.
  slow(dino) {
    let d = dist(this.x, this.y, dino.x, dino.y);
    // Check if the Dinosaur and the Catalyst overlap
    if (d < this.radius + dino.radius) {
      dino.speed = dino.speed - 0.1; // Makes the Dinosaur gradually slow down
      if (dino.speed < 2) {
        dino.speed = 2;
      }
    }
  }

  // move

  move() {
    // Set velocity,
    this.vx = 15
    this.vy = 0
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the Catalyst has gone off the canvas and wraps it to the other side if it did.
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
  // Catalyst image (water for the Tornado)
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
