/*
  A simpler version of the "glitch + random grid" effect
  using p5.js and WebGL shaders.
  Written in English, with simplified structure and new colors.
*/

// -------------------- Shader Sources --------------------
const SIMPLE_VERT = `
  precision highp float;
  attribute vec3 aPosition;
  attribute vec2 aTexCoord;
  
  varying vec2 vTexCoord;
  
  uniform mat4 uProjectionMatrix;
  uniform mat4 uModelViewMatrix;
  
  void main() {
    vTexCoord = aTexCoord;
    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
  }
`;

// This fragment shader performs a simple "three-channel offset" glitch effect
const GLITCH_FRAG = `
  precision highp float;
  varying vec2 vTexCoord;
  
  uniform sampler2D u_tex;
  uniform float u_time;

  // Random function returning a value in [-1, 1]
  float rand(vec2 co){
    return fract(sin(dot(co.xy , vec2(12.9898,78.233))) * 43758.5453) * 2.0 - 1.0;
  }

  float offset(float blockCount, vec2 uv) {
    // You can tweak these values to control glitch strength/speed
    float speedFactor = 0.0001;
    float t = u_time * speedFactor;
    // The offset depends on which row (based on y) we are in
    return rand(vec2(t, floor(uv.y * blockCount)));
  }

  void main() {
    vec2 uv = vTexCoord;
    
    // Each color channel has a different offset
    float offR = offset(60.0, uv) * 0.03;
    float offG = offset(60.0, uv) * 0.02;
    float offB = offset(40.0, uv) * 0.03;
    
    float r = texture2D(u_tex, uv + vec2(offR, 0.0)).r;
    float g = texture2D(u_tex, uv + vec2(offG, 0.0)).g;
    float b = texture2D(u_tex, uv + vec2(offB, 0.0)).b;

    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

// -------------------- Global Variables --------------------
let pg;           // Offscreen graphics for random grid
let glitchShader; // The glitch shader

function setup() {
  // Fixed 800×800 canvas, WEBGL mode
  createCanvas(800, 800, WEBGL);
  noStroke();
  
  // Create p5.Graphics (2D) for the random grid
  pg = createGraphics(width, height);
  pg.pixelDensity(1);
  drawRandomGrid(pg); // Draw a simple random grid on pg

  // Create glitch shader
  glitchShader = createShader(SIMPLE_VERT, GLITCH_FRAG);
}

function draw() {
  // Clear each frame
  clear();
  
  // Use our glitch shader
  shader(glitchShader);
  glitchShader.setUniform('u_tex', pg);
  glitchShader.setUniform('u_time', frameCount);
  
  // Draw a rectangle covering the entire canvas
  rectMode(CENTER);
  rect(0, 0, width, height);
}

/**
 * Draw a random grid on the p5.Graphics 'pg'.
 * Feel free to adjust colors, grid size, etc.
 */
function drawRandomGrid(pg) {
  pg.background('#f2f2f2'); // Background color
  pg.noStroke();
  
  let cols = 10; // Number of columns
  let rows = 10; // Number of rows
  let cw = pg.width / cols;
  let ch = pg.height / rows;

  // Example palette: black, white, brownish, purpleish
  let palette = [
    '#000000',
    '#ffffff',
    '#e5c07b',
    '#c678dd'
  ];

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = i * cw;
      let y = j * ch;
      
      // Random color from the palette
      let col = random(palette);
      pg.fill(col);

      // Draw the cell
      pg.rect(x, y, cw, ch);
    }
  }
}
