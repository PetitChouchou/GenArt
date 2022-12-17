/**
* Sketch 8: Follow the Mouse.
*
* I'm pretty dry on ideas, so what I think I'm gonna do is just have a rectangle that follows
* the mouse around. Should be pretty simple, and I can also have the colors/size
* of that rectangle depend on its x/y position.
* Pretty boring but simple enough, and it's good to go.
*
*/

// PALLATE: https://www.color-hex.com/color-palette/68787
var PALLATE = [
  "rgb(255,240,203)",
  "rgb(167,186,66)",
  "rgb(149,204,186)",
  "rgb(255,222,222)",
  "rgb(242,204,132)",
  ];

const CANVAS_SIZE = 720;


function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  colorMode(HSB, 360, 100, 100);
  background(PALLATE[0]);
}

function draw() {
  noCursor();

  const RECT_SIZE_MAX = 200;
  const RECT_SIZE_MIN = 20;

  let rect_size = RECT_SIZE_MIN + (RECT_SIZE_MAX - RECT_SIZE_MIN) * (mouseY / CANVAS_SIZE);
  let prect_size = RECT_SIZE_MIN + (RECT_SIZE_MAX - RECT_SIZE_MIN) * (pmouseY / CANVAS_SIZE);

  // let hue = floor(mousex / 2);

  console.log(mouseX);
  noStroke();
  fill(PALLATE[0]);
  rect(pmouseX - prect_size / 2 - 1, pmouseY - prect_size / 2 - 1, prect_size + 2, prect_size + 2);
  fill(mouseX / 2, 100, 100);
  rect(mouseX - rect_size / 2, mouseY - rect_size / 2, rect_size, rect_size);
}
