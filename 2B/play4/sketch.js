function setup() {
  // Create a 3D canvas
  createCanvas(windowWidth, windowHeight, WEBGL);

  // Use degrees for rotations
  angleMode(DEGREES);

  // Slightly thicker stroke, no fill
  strokeWeight(3);
  noFill();

  // Dark-ish stroke color
  stroke(30, 60, 90);

  // Include a line telling the audience to scroll
  describe(
    'Users can click and drag to orbit around a set of rotating cones forming a spiral on a pale green background. Scroll to view more of the page if needed.'
  );
}

function draw() {
  background(180, 230, 180);

  // Allow mouse/touch drag to orbit the camera
  orbitControl();

  // Create multiple layers (like "rings") of cones
  // Each layer rotates around the Z axis
  for (let zAngle = 0; zAngle < 360; zAngle += 45) {
    push();
    rotateZ(zAngle);

    // Move this layer away from the center
    translate(0, 150, 0);

    // Now draw a spiral of cones along the X axis
    for (let xPos = 0; xPos < 300; xPos += 30) {
      push();
      translate(xPos - 150, 0, 0);

      // Each cone is oriented upright (rotated -90 degrees from p5's default)
      rotateX(-90);

      cone(20, 40); // radius=20, height=40
      pop();
    }

    pop();
  }
}
