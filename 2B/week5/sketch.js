var numbers = 1;       // current dice value
var rolling = false;   // flag to track if the dice is "rolling"
var rollStartTime = 0; // time at which the dice roll started
var rollDuration = 1000; // rolling duration in milliseconds (1 second)

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(0, 0, 255);
  textAlign(CENTER, CENTER);
  textSize(72);
  fill(255); 
  // Initialize with a random dice value between 1 and 6
  numbers = int(random(1, 7));
}

function draw(){
  background(0, 0, 255);

  if (rolling) {
    // During the roll duration, flicker the dice number continuously.
    if (millis() - rollStartTime < rollDuration){
      numbers = int(random(1, 7));
    } else {
      // Roll complete: set a final random number and stop rolling.
      numbers = int(random(1, 7));
      rolling = false;
    }
  }
  
  // Display the dice number in the center of the canvas.
  text(numbers, width/2, height/2);
}

// Helper function to start the dice roll animation.
function startRoll(){
  rolling = true;
  rollStartTime = millis();
}

// Trigger a new roll with a mouse press.
function mousePressed(){
  startRoll();
}

// Also trigger a roll when the space key is pressed.
function keyPressed(){
  if(key === ' ' || keyCode === 32){
    startRoll();
  }
}
