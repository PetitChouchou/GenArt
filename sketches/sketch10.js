/**
* Sketch 10: Parametric Curves
* This started out as part of the last sketch, but I realized that I was doing two seperate things.
* The first was making a drawing that changes parameters based on an X and Y position, and the second
* was making a parametric equation to simulate moving the mouse to animate it. So I decided to break them
* off, and this page is exclusively for testing the parametric equations.
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

// Possible Animation Modes:
// HORIZONTAL
// VERTICAL
// DIAGONAL
const MODE = "QUADRATIC";

// Number of frames long to make an animation.
const ANIMATION_LENGTH = 200;


const CANVAS_SIZE = 720;

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  background(PALLATE[0]);
}

function draw() {
  strokeWeight(2);
  stroke(31,26,14);

  let x_pos = mouseX;
  let y_pos = mouseY;

  // From Wikipedia: More generally, any curve given by an explicit equation y=f(x)
  // can be (trivially) parameterized by using a free parameter t, and setting
  // x=t,y=f(t) for - infty < t < infty.
  // What we have here is a parametric drawing. Our frame count is our parameter t, with
  // range from 0 to ANIMATION_LENGTH. What we want is to "draw" specific curves in the x
  // y plane using t as our parameter. This simulates moving the mouse in a specific pattern.
  // For example moving it in a diagnola line, or drawing a circle, or a quadratic curve.
  // The trickiest thing seems to be mapping our T value into the useful part of the
  // parametric curve. For a function f(x) that's easy, we just map t to the expected bounds
  // of X aka 0 to width. Visa verse for a function f(y);
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

  point(x_pos, y_pos);

}
