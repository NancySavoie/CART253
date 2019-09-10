// Exercise 0 - Spiritual Self-Portrait
// Nancy Savoie
// 03 Sept 2019
//
// Uses p5's set of shape and colour functions to draw a head.


// setup()
//
// It doesn't really look like me but I had a fun time making it!

function setup() {

  // Turquoise canvas
  createCanvas(500,500);
  background(0,200,255);

  noStroke();
  // So pale...
  fill(255,234,214);
  ellipseMode(CENTER);

  // The head (watch out, it's a close up!)
  ellipse(250,250,325,350);

  // The ears
  fill(255,234,214)
  ellipse(100,250,100,100)
  ellipse(400,250,100,100)

  // Earrings
  fill(182,72,250)
  ellipse(75,300,25,25)
  ellipse(425,300,25,25)

  // Curly Hair
  fill(245,213,88)
  ellipse(75,175,100,100)
  ellipse(100,140,100,100)
  ellipse(400,175,100,100)
  ellipse(375,140,100,100)
  ellipse(325,110,100,100)
  ellipse(140,100,100,100)
  ellipse(180,75,100,100)
  ellipse(250,75,100,100)
  ellipse(275,50,100,100)
  ellipse(325,75,100,100)

  // Eyes
  fill(255);
  ellipse(200,225,80,60);
  ellipse(300,225,80,60);

  // Eyelids
  fill(255,234,214);
  rect(150,185,200,25)

  // Pupils
  fill(100,200,255);
  ellipse(200,225,40,30);
  ellipse(300,225,40,30);
  fill(0);
  ellipse(200,225,10,10);
  ellipse(300,225,10,10);

  // Eyebrows
  fill(245,213,88);
  rect(160,185,80,05)
  rect(260,185,80,05)

  // Nose
  fill(252,219,187);
  ellipse(240,260,35,25);
  ellipse(260,260,35,25);
  ellipse(250,250,35,25);

  // The mouth
  fill(255,150,150);
  ellipse(250,320,55,25);
  ellipse(250,335,55,25);

}

// draw()
//
// Does nothing.

function draw() {
  // Nothing here for now.
}
