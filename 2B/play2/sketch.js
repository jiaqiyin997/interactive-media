// Chatgpt was used in the building of this p5 sketch. I made refinements and adjusted the code where necessary.

let bgColor = "#2b2a2a"; // Background color
let strokeColor = "#ffffff"; // Stroke (outline) color
let colorPalette = [
  "#e63946",
  "#f1faee",
  "#a8dadc",
  "#457b9d",
  "#1d3557"
]; // New color set

let sinScale = 0.0025; // Controls the speed of the sin() animation
let gridCols;  // Number of columns in the grid
let gridRows;  // Number of rows in the grid

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(5);  // You can tweak this for slower/faster frame rates
  strokeJoin(ROUND);

  // Randomly pick a number of columns between 3 and 6
  gridCols = floor(random(3, 7));
  let cellSize = width / gridCols;

  // Determine the number of rows based on the screen height
  gridRows = ceil(height / cellSize);
}

function draw() {
  background(bgColor);
  drawGrid(0, 0, gridCols, gridRows, width);
}

function drawGrid(startX, startY, cols, rows, totalWidth) {
  let cellSize = totalWidth / cols;
  let movementOffset = 0;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {

      // Calculate the position of each cell
      let x = startX + i * cellSize;
      let y = startY + j * cellSize;

      // Randomly choose a color from the palette
      let colorIndex = floor(random(colorPalette.length));
      fill(colorPalette[colorIndex]);

      // Draw the cell
      stroke(strokeColor);
      strokeWeight(2);
      rect(x, y, cellSize, cellSize);

      // Calculate the "movement" of the circle based on sin()
      let movement = map(
        sin(frameCount * sinScale + movementOffset),
        -1, 1,
        0, cellSize / 2
      );

      // Fill the circle with a different color (next in palette)
      fill(colorPalette[(colorIndex + 1) % colorPalette.length]);
      noStroke();
      circle(x + cellSize / 2, y + cellSize / 2, movement);

      // Increase offset to slightly shift each cell's sin() phase
      movementOffset += 0.2;
    }
  }
}
