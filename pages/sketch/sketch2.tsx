import p5Types from "p5";
import SketchPage from "../../components/SketchPage";

let x = 20;
let [x1, x2, y2] = [200, 200, 300];
const [y1, x3, y3] = [200, 250, 360]

let portion = .01;
export default function Sketch2 () {
  return (
    <main>
      <SketchPage title="sketch2" setup={setup} draw={draw} />
    </main>
  )
}

// Working With Shapes: Experimenting with different shapes.
const setup = (p5: p5Types, canvasParentRef: Element) => {
  p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
}

const draw = (p5: p5Types) => {
  p5.gridOutput();
  p5.background(89, 255, 188);
  p5.fill(148, 70, 55);
  p5.ellipse(x, 20, 40, 20);

  // Linear movement at a specified rate.
  // What other movement function could I do?
  // x += .1;

  // Exponential movement
  x =  x * 1.05;

  // DRAW A FULL CIRCLE
  p5.noFill();
  p5.arc(100, 100, 80, 80, 0, 2 * p5.PI * portion);

  // Linear Draw vs Exponential draw
  portion += .01;
  // portion = portion * 1.05;

  /*

  Some things I notice that are wrong with the above: looping. The ellipse gets thrown offscreen
  then you never see it again. THe linear circle draw works, but portion always gets bigger (four pi, then six pi, etc).
  The lack of ceiling for the portion variable means that the exponential drawing quickly grows into a glitchy flashing rate.
  Another thing I notice is color.

  */

  // Let's try a Triangle: x1, x2, y1, y2, x3, y3.
  // Idea: Make each of the three vertices the result of a function, and draw the triangle.


  p5.triangle(x1, y1, x2, y2, x3, y3)

  // Point 1: Linear movement horizontally
  x1 += .1;

  // Point 2: Linear movement up and to the left
  x2 -= .1;
  y2 -= .1;

  console.log(x1)

  // Point 3: Fixed
}