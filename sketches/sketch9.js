/**
* Sketch 9: Drawing Line Circles with Map
* The goal here is to create something like chapter 2.0 in "Generative Design".
* We branch out a number of lines radially from the center of our canvas. The number
* of lines depends on the X coordinate, and their length on the Y coordinate.
*
* Two techniques they use that I like is 1. resetting the coordinate systems center
* to the center of the image. And 2.
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

const MAX_NUM_LINES = 25;

// Possible Animation Modes:
// HORIZONTAL
// VERTICAL
// DIAGONAL
// QUADRATIC
// CIRCLE
const MODE = "VERTICAL";

// Number of frames long to make an animation.
const ANIMATION_LENGTH = 200;

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  // background(PALLATE[0]);
}

function draw() {
  background(PALLATE[0]);

  // Move the coordinate center from the top left to the center.
  // Note that this translates all drawn objects, but it does not
  // affect our readings of mouseX and mouseY.
  translate(width / 2, height / 2);

  strokeWeight(2);
  stroke(31,26,14);

  // Instead of basing things on the actual mouse position, let's do an animation, where the
  // x and y coordinates are a function of time.
  // Taken from Sketch10.js
  let x_pos = mouseX;
  let y_pos = mouseY;

  let t = frameCount % ANIMATION_LENGTH;
  let param_x = map(t, 0, ANIMATION_LENGTH, 0, width);
  let param_y = map(t, 0, ANIMATION_LENGTH, 0, height);


  // Linear: horizontal.
  if (MODE == "HORIZONTAL") {
    x_pos = param_x;
    y_pos = 100;
  }
  // Linear: vertical.
  if (MODE == "VERTICAL") {
    x_pos = 360;
    y_pos = param_y;
  }

  let slope = .5;
  // Diagonal at a slope.
  if (MODE == "DIAGONAL") {
    x_pos = param_x;
    y_pos = slope * x_pos;
  }
  // Quadratic parametric
  if (MODE == "QUADRATIC") {
    x_pos = param_x;
    y_pos = .005 * (x_pos - width / 2) ** 2;
  }
  if (MODE == "CIRCLE") {
    param_circle = map(t, 0, ANIMATION_LENGTH, 0, 2 * PI);
    x_pos = 100 * cos(param_circle) + width/2;
    y_pos = 100 * sin(param_circle) + width/2;
  }

  let num_lines = map(x_pos, 0, width, 1, MAX_NUM_LINES);

  let line_length = map(y_pos, 0, height, 20, 200);


  beginShape();
  fill(PALLATE[3]);
  noFill();
  for (i = 0; i <= num_lines; i++) {
    let angle = i * 2 * PI / num_lines;

    line(0, 0, line_length * cos(angle), line_length * sin(angle));
    // vertex(line_length * cos(angle), line_length * sin(angle));
  }
  endShape(CLOSE);

}
