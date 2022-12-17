import p5Types from "p5";
import SketchPage from "../../components/SketchPage";
import { PALLATE } from "../../utils/colors";
import { AnimationMode } from "../../utils/animation";

export default function Sketch10() {
  return (
    <main>
      <SketchPage title="sketch10" setup={setup} draw={draw} />
    </main>
  )
}

/**
* Sketch 10: Parametric Curves
* This started out as part of the last sketch, but I realized that I was doing two seperate things.
* The first was making a drawing that changes parameters based on an X and Y position, and the second
* was making a parametric equation to simulate moving the mouse to animate it. So I decided to break them
* off, and this page is exclusively for testing the parametric equations.
*
*/

const MODE: AnimationMode = "Quadratic";

// Number of frames long to make an animation.
const ANIMATION_LENGTH = 200;


const CANVAS_SIZE = 720;

const setup = (p5: p5Types, canvasParentRef: Element) => {
  p5.createCanvas(p5.displayWidth, p5.displayHeight).parent(canvasParentRef)
  p5.background(PALLATE[0]);
}

function draw(p5: p5Types) {
  p5.strokeWeight(2);
  p5.stroke(31,26,14);

  let x_pos = p5.mouseX;
  let y_pos = p5.mouseY;

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
  p5.strokeWeight(5)
  p5.point(x_pos, y_pos);

}
