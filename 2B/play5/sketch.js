// Chatgpt was used in the building of this p5 sketch. I made refinements and adjusted the code where necessary.


let currentShape;
let bg;  // 用于保存背景图像

function setup() {
  // 创建一个 800x600 的画布（2D模式）
  createCanvas(windowWidth, windowHeight);
  
  // 生成一个复杂好看的背景图像
  bg = createGraphics(width, height);
  bg.background(30);
  // 绘制许多随机颜色、随机粗细的线条
  for (let i = 0; i < 300; i++) {
    bg.stroke(random(100, 255), random(100, 255), random(100, 255), 150);
    bg.strokeWeight(random(0.5, 3));
    let x1 = random(width);
    let y1 = random(height);
    let x2 = random(width);
    let y2 = random(height);
    bg.line(x1, y1, x2, y2);
  }
  
  // 初始在画布中心生成一个随机不规则图形
  currentShape = generateRandomShape(width / 2, height / 2);
}

function draw() {
  // 将背景图像绘制到画布上
  image(bg, 0, 0);
  
  // 绘制当前的不规则图形
  push();
  translate(currentShape.x, currentShape.y);
  fill(currentShape.fillColor);
  stroke(currentShape.strokeColor);
  strokeWeight(2);
  beginShape();
  for (let v of currentShape.vertices) {
    vertex(v.x, v.y);
  }
  endShape(CLOSE);
  pop();
}

// 生成随机不规则图形（多边形）的函数
function generateRandomShape(x, y) {
  // 顶点数量随机取 5 到 12 个之间
  let numVertices = int(random(5, 12));
  let vertices = [];
  let angleStep = TWO_PI / numVertices;
  for (let i = 0; i < numVertices; i++) {
    // 计算每个顶点的角度，并在基础角度上加入少许随机扰动
    let angle = i * angleStep + random(-angleStep / 3, angleStep / 3);
    // 半径随机在 30 到 80 之间
    let r = random(30, 80);
    let vx = r * cos(angle);
    let vy = r * sin(angle);
    vertices.push(createVector(vx, vy));
  }
  // 随机填充和描边颜色（填充颜色带有一定透明度）
  let fillColor = color(random(100, 255), random(100, 255), random(100, 255), 200);
  let strokeColor = color(random(100, 255), random(100, 255), random(100, 255));
  
  return {
    x: x,
    y: y,
    vertices: vertices,
    fillColor: fillColor,
    strokeColor: strokeColor
  };
}

// 按下鼠标时，在鼠标点击的位置生成新的随机不规则图形
function mousePressed() {
  currentShape = generateRandomShape(mouseX, mouseY);
}

// 按下方向键时，根据按键产生于屏幕不同区域的图形
function keyPressed() {
  let newX, newY;
  if (keyCode === RIGHT_ARROW) {
    newX = random(width / 2, width - 50);
    newY = random(50, height - 50);
  } else if (keyCode === LEFT_ARROW) {
    newX = random(50, width / 2);
    newY = random(50, height - 50);
  } else if (keyCode === UP_ARROW) {
    newX = random(50, width - 50);
    newY = random(50, height / 2);
  } else if (keyCode === DOWN_ARROW) {
    newX = random(50, width - 50);
    newY = random(height / 2, height - 50);
  } else {
    // 其他按键不处理
    return;
  }
  currentShape = generateRandomShape(newX, newY);
}
