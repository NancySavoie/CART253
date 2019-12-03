// Fire Catalyst
//
// A class that represents a challenge to the Dinausaurs.
// If the player touches the fire, the dinosaur(s) will disintegrate (fade) away.

class CatalystFire {

  // constructor
  //
  // Sets the initial values for the catalyst's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius, image) {
    // Position
    this.x = random(0, width);
    this.y = random(0, height);
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = 0;
    // Display properties
    this.radius = radius;
    this.image = image; // To display the catalyst image (Fire)
  }

  // This new class makes the player fade away by reducing the dino's tint (alpha).
  fade(dino) {
    let d = dist(this.x, this.y, dino.x, dino.y);
    // Check if the dino and the catalyst overlap
    if (d < this.radius + dino.radius) {
      dino.currentAlpha = dino.fadeAlpha; // Makes the Dinosaur fade slightly.
      dino.fadeDuration = 5; // Faded for 5 seconds
    }
  }

  // move
  //
  // Sets velocity based on the noise() function and the catalyst's speed.
  // Moves based on the resulting velocity and handles wrapping.
  move() {
    // Set velocity via noise()
    this.vx = 0
    this.vy = 10
    // Update position
    this.x += this.vx;
    this.y += this.vy;
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
      this.x = random(0, height);
    }
  }

  // display
  //
  // Catalyst image
  display() {
    push();
    noStroke();
    image(this.image, this.x, this.y, 150, 100);
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
