// A class that represents the student class controlled by the arrow keys. It can move around
// the screen and can consume focus & distraction objects.

class Student {

  // constructor
  //
  // Sets the initial values for the student's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius, upKey, downKey, leftKey, rightKey, sprintKey, fillColor) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.healthLossPerMove = 0.03;
    this.healthGainPerEat = 1;
    // Display properties
    this.fillColor = fillColor;
    this.alpha = 255;
    this.radius = this.health; // Radius is defined in terms of health
    // Input properties
    // Input properties
    this.upKey = upKey;
    this.downKey = downKey;
    this.leftKey = leftKey;
    this.rightKey = rightKey;
    this.sprintKey = sprintKey; // Sprinting key
    this.focusEaten = 0;
    this.studentDead = false; // The status of students
  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the student's
  // velocity appropriately.
  handleInput() {
    // Horizontal movement
    if (keyIsDown(this.leftKey)) {
      this.vx = -this.speed;
    }
    else if (keyIsDown(this.rightKey)) {
      this.vx = this.speed;
    }
    else {
      this.vx = 0;
    }
    // Vertical movement
    if (keyIsDown(this.upKey)) {
      this.vy = -this.speed;
    }
    else if (keyIsDown(this.downKey)) {
      this.vy = this.speed;
    }
    else {
      this.vy = 0;
    }
    // Predator sprints when designatd key is pressed
      if (keyIsDown(this.sprintKey)) {
        this.vx *= 2;
        this.vy *= 2;
      }
    }

  // move
  //
  // Updates the position according to velocity
  // Lowers health (as a cost of living)
  // Handles wrapping
  move() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;

    // Update health
    if (this.studentDead) {
      this.health = 0;
      this.radius = 0;
    } else {
      this.health = this.health - this.healthLossPerMove;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Handle wrapping
      this.handleWrapping();
  }
}
  // handleWrapping
  //
  // Checks if the student has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    }
    else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    }
    else if (this.y > height) {
      this.y -= height;
    }
  }

  // handleEating
  //
  // Takes a focus object as an argument and checks if the student
  // overlaps it. If so, reduces the focus' health and increases
  // the student's. If the focus dies, it gets reset.
  handleEating(focus) {
    // Calculate distance from this student to the focus
    let d = dist(this.x, this.y, focus.x, focus.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + focus.radius) {
      // Increase student health and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Decrease focus health by the same amount
      focus.health -= this.healthGainPerEat;
      // Check if the focus died and reset it if so
      if (focus.health < 0) {
        focus.reset();
      }
    }
  }

  // If student is dead
    checkState() {
      if (this.health < 1) {
        this.studentDead = true;
      }
    }

  // display
  //
  // Draw the student as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
      if (!this.studentDead) {
    push();
    noStroke();
    fill(this.fillColor);
    this.radius = this.health;
    ellipse(this.x, this.y, this.radius * 4);
    pop();
  }
}
}
