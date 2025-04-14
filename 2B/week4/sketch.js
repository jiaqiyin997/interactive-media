function setup() {
  createCanvas(windowWidth, windowHeight);
  // Lower frame rate to exaggerate each draw
  frameRate(5);
  // Start with a neutral background
  background(220);
  // Set text alignment for convenience
  textAlign(CENTER, CENTER);
}

function draw() {
  // Partially fade the background for a trailing effect
  // The last parameter (10) controls how quickly old frames fade
  background(220, 10);
  
  // Random circle size within a smaller range for variety
  let circleSize = random(50, 200);
  
  // Randomize colors
  let r = random(255);
  let g = random(255);
  let b = random(255);
  
  // Optionally add a random stroke for extra effect
  strokeWeight(random(1, 5));
  stroke(r, g, b);
  fill(r, g, b, 70); // Slightly transparent fill

  // Occasionally draw a line across the canvas
  if (random(1) > 0.7) {
    line(random(width), random(height), random(width), random(height));
  }

  // Draw a circle in the center
  circle(width / 2, height / 2, circleSize);

  // Draw a rotating square at the mouse location
  push(); // Use push/pop to isolate rotation transformations
  translate(mouseX, mouseY);
  rotate(frameCount * 0.1); // Adjust rotation speed as desired
  square(0, 0, circleSize);
  pop();

  // Randomize the text size and position to keep it interesting
  textSize(random(15, 50));
  noStroke();
  fill(r, g, b);
  
  // Draw text at a random position each frame
  text("hello world", random(width), random(height));
}
