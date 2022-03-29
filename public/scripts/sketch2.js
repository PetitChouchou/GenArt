// Working With Shapes: Experimenting with different shapes.

function setup() {
  createCanvas(800, 800);
}

var x = 20;
var [x1, y1, x2, y2, x3, y3] = [200, 200, 200, 300, 250, 360];

portion = .01;

function draw() {
  gridOutput();
  background(89, 255, 188);
  fill(148, 70, 55);
  ellipse(x, 20, 40, 20);

  // Linear movement at a specified rate.
  // What other movement function could I do?
  // x += .1;

  // Exponential movement
  x =  x * 1.05;

  // DRAW A FULL CIRCLE
  noFill();
  arc(100, 100, 80, 80, 0, 2 * PI * portion);

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


  triangle(x1, y1, x2, y2, x3, y3)

  // Point 1: Linear movement horizontally
  x1 += .1;

  // Point 2: Linear movement up and to the left
  x2 -= .1;
  y2 -= .1;

  console.log(x1)

  // Point 3: Fixed


}
