import p5Types from "p5";
import SketchPage from "../../components/SketchPage";
import { PALLATE } from "../../utils/colors";
import { AnimationMode } from "../../utils/animation";

export default function Sketch9() {
  return (
    <main>
      <SketchPage title="sketch9" setup={setup} draw={draw} />
    </main>
  )
}

/**
* Sketch 9: Drawing Line Circles with Map
* The goal here is to create something like chapter 2.0 in "Generative Design".
* We branch out a number of lines radially from the center of our canvas. The number
* of lines depends on the X coordinate, and their length on the Y coordinate.
*
* Two techniques they use that I like is 1. resetting the coordinate systems center
* to the center of the image. And 2.
*/

const MAX_NUM_LINES = 25;

// Possible Animation Modes:
// HORIZONTAL
// VERTICAL
// DIAGONAL
// QUADRATIC
// CIRCLE
const MODE: AnimationMode = "Quadratic";

// Number of frames long to make an animation.
const ANIMATION_LENGTH = 200;

const setup = (p5: p5Types, canvasParentRef: Element) => {
  p5.createCanvas(p5.displayWidth, p5.displayHeight).parent(canvasParentRef);
}

function draw(p5: p5Types) {
  p5.background(PALLATE[0]);

  // Move the coordinate center from the top left to the center.
  // Note that this translates all drawn objects, but it does not
  // affect our readings of mouseX and mouseY.
  p5.translate(p5.width / 2, p5.height / 2);

  p5.strokeWeight(2);
  p5.stroke(31,26,14);

  // Instead of basing things on the actual mouse position, let's do an animation, where the
  // x and y coordinates are a function of time.
  // Taken from Sketch10.js
  let x_pos = p5.mouseX;
  let y_pos = p5.mouseY;

  const t = p5.frameCount % ANIMATION_LENGTH;
  const param_x = p5.map(t, 0, ANIMATION_LENGTH, 0, p5.width);
  const param_y = p5.map(t, 0, ANIMATION_LENGTH, 0, p5.height);


  // Linear: horizontal.
  if (MODE == "Horizontal") {
    x_pos = param_x;
    y_pos = 100;
  }
  // Linear: vertical.
  if (MODE == "Vertical") {
    x_pos = 360;
    y_pos = param_y;
  }

  const slope = .5;
  // Diagonal at a slope.
  if (MODE == "Diagonal") {
    x_pos = param_x;
    y_pos = slope * x_pos;
  }
  // Quadratic parametric
  if (MODE == "Quadratic") {
    x_pos = param_x;
    y_pos = .005 * (x_pos - p5.width / 2) ** 2;
  }
  if (MODE == "Circle") {
    const param_circle = p5.map(t, 0, ANIMATION_LENGTH, 0, 2 * p5.PI);
    x_pos = 100 * p5.cos(param_circle) + p5.width/2;
    y_pos = 100 * p5.sin(param_circle) + p5.width/2;
  }

  const num_lines = p5.map(x_pos, 0, p5.width, 1, MAX_NUM_LINES);

  const line_length = p5.map(y_pos, 0, p5.height, 20, 200);


  p5.beginShape();
  p5.fill(PALLATE[3]);
  p5.noFill();
  for (let i = 0; i <= num_lines; i++) {
    const angle = i * 2 * p5.PI / num_lines;

    p5.line(0, 0, line_length * p5.cos(angle), line_length * p5.sin(angle));
    // vertex(line_length * cos(angle), line_length * sin(angle));
  }
  p5.endShape("close");
}
