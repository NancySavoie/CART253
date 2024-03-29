// Distraction Class - Fade
// (This is based off project 2, will likely change in the future)

class DistractionFade {

  // constructor
  //
  // Sets the initial values for the distractions's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius, image) {
    // Position
    this.x = random(0, windowWidth);
    this.y = random(0, windowWidth);
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Time properties for noise() function
    this.tx = random(0, 500); // To make x and y noise different
    this.ty = random(0, 500); // we use random starting values
    // Display properties
    this.radius = radius;
    this.image = image; // To display the image
  }

  // This new class makes the player fade away by reducing the student's tint (alpha).
  fade(student) {
    let d = dist(this.x, this.y, student.x, student.y);
    // Check if the Pokeball and the Pokémon overlap
    console.log(d)
    if (d < this.radius + student.radius) {
      console.log(student)
      student.alpha = student.alpha - 1;
      if (student.alpha < 0) {
        student.alpha = 0;
      }
    }
  }

  // move
  //
  // Sets velocity based on the noise() function and the Pokémon's speed.
  // Moves based on the resulting velocity and handles wrapping.
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
  // Pokémon image, Moltres, for the Legendary Fade class of the game.
  display() {
    push();
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
