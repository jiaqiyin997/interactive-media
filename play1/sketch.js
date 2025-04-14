let colors;
let faceFill, eyeFill, lip1, lip2, noseFill;
let dice1, dice2;

// anything in the setup function will be run once
function setup() {
  // create a canvas, where your p5 sketch will live
  createCanvas(windowWidth, windowHeight);
  // set the background colour of the canvas randomly using the randomColour function
  background(randomColour());
  // the array of random colours.
  colors = [
    randomColour(),
    randomColour(),
    randomColour(),
    randomColour(),
    randomColour(),
    randomColour(),
  ];
  faceFill = random(colors);
  eyeFill = random(colors);
  lip1 = random(colors);
  lip2 = random(colors);
  noseFill = random(colors);
  print(colors);
  // frameRate(3);
}

// anything in the draw function will be run over and over according the frame rate
function draw() {
  // generate some randomness for a rectangle on the canvas (optional)
  dice1 = random(0, 5);
  dice2 = random(0, 12);
  let rectFill = random(colors);
  let x_mapped = map(dice1, 0, 5, 0, width);
  let y_mapped = map(dice2, 0, 5, 0, height);
  
  // Optionally, you can uncomment this block to draw random rectangles
  // push();
  // noStroke();
  // fill(rectFill);
  // rect(x_mapped, y_mapped, dice2 * 10, dice1 * 3);
  // pop();
  
  // face
  fill(faceFill);
  noStroke();
  ellipse(windowWidth / 2, windowHeight / 2, 290, 353);

  // eyes as circles
  push();
  fill("white");
  stroke(0);
  strokeWeight(1);
  // left eye
  circle(windowWidth / 2 - 70, windowHeight / 2 - 60, 60);
  // right eye
  circle(windowWidth / 2 + 70, windowHeight / 2 - 60, 60);
  pop();

  // eyebrows above the eyes
  push();
  noFill();
  stroke(0);
  strokeWeight(2);
  // left eyebrow
  arc(windowWidth / 2 - 70, windowHeight / 2 - 90, 70, 20, PI, TWO_PI);
  // right eyebrow
  arc(windowWidth / 2 + 70, windowHeight / 2 - 90, 70, 20, PI, TWO_PI);
  pop();

  // nose: a small isosceles triangle
  push();
  fill(noseFill);
  strokeWeight(0.5);
  stroke(0);
  triangle(
    windowWidth / 2, windowHeight / 2 - 20,           // top vertex
    windowWidth / 2 - 15, windowHeight / 2 + 20,       // bottom left vertex
    windowWidth / 2 + 15, windowHeight / 2 + 20        // bottom right vertex
  );
  pop();
  
  // add a small mouth below the nose
  push();
  fill(lip2);
  stroke(0);
  strokeWeight(1);
  // 小嘴巴 positioned at (windowWidth/2, windowHeight/2+40)
  arc(windowWidth / 2, windowHeight / 2 + 80, 50, 40, 0, PI);
  pop();
  
  // have the eyes follow the cursor
  irisMove();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(randomColour());
}

function irisMove() {
  // adjust the iris so that they stay within the circular eyes
  let x = map(mouseX, 0, width, 0, 10);
  let y = map(mouseY, 0, height, 0, 10);
  // left iris and pupil
  fill(eyeFill);
  circle(windowWidth / 2 - 70 + x, windowHeight / 2 - 60 + y, 30);
  fill("black");
  circle(windowWidth / 2 - 70 + x, windowHeight / 2 - 60 + y, 20);
  
  // right iris and pupil
  fill(eyeFill);
  circle(windowWidth / 2 + 70 + x, windowHeight / 2 - 60 + y, 30);
  fill("black");
  circle(windowWidth / 2 + 70 + x, windowHeight / 2 - 60 + y, 20);
}

function randomColour() {
  let r = random(255);
  let g = random(255);
  let b = random(255);
  return color(r, g, b);
}
