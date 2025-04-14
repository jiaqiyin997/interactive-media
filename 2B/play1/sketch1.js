function setup() {
    createCanvas(windowWidth, windowHeight);  
}
  
  function draw() {
    background(220);
    //Place code here
  
    // places the x and y position of the mouse on the canvas
    fill(0)
    text(`${mouseX}, ${mouseY}`, 20, 20);
  }