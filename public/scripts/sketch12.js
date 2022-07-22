/*
* Sketch 12: Dots Texture.
*
* I really want to get more of the "full canvas" feel that Tyler Hobbes has. He has
* written that his starting point is always a natural texture like grass or a wall or whatever,
* and then he adds some kind of Gaussian randomization onto there. So here I just want to put a bunch of
* dots onto the screen.
*
*
* Hm. The problem seems to be that I don't know what to do from here, where to go.
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

  background(PALLATE[0]);

  // stroke(PALLATE[1]);
  // dottify_circle(300, 300, 100);
  //
  // stroke(PALLATE[2]);
  // dottify_circle(340, 340, 100);

  noFill();
  // Each circle is of form [x, y, d]
  let circles = [];
  let diameters = [500, 100, 50, 20];

  for (let i = 0; i < diameters.length; i++) {
    let d = diameters[i];
    circles = circles.concat(circle_fitter(d, circles));
  }
  console.log(circles);
  draw_circles(circles);

  strokeWeight(2);
  // for (let i = 0; i <= CANVAS_SIZE; i += 5) {
  //   for (let j = 0; j <= CANVAS_SIZE; j += 5) {
  //     point(i, j);
  //   }
  // }

}

// Fits a bunch of circles.
function circle_fitter(diameter, circles) {

  // The routitne is as follows: put a circle in a random spot. See if it will overlap with any
  // other circle. If it doesn't, place it there. If it fails a certain number of times in a row, we give up.

  let num_fails = 0;

  while (num_fails < 2000) {
    x = random(0, CANVAS_SIZE);
    y = random(0, CANVAS_SIZE);
    let failure = false;

    for (let i = 0; i < circles.length; i++) {
      let c = circles[i];

      let x1 = c[0];
      let y1 = c[1];
      let d1 = c[2];

      // If any overlap, this is a failure.
      if (circles_overlap(x1, y1, d1, x, y, diameter)) {
        failure = true;
        break;
      }
    }

    if (failure) {
      num_fails++;
    } else {
      circles.push([x, y, diameter]);
      num_fails = 0;
    }

  }

  return circles;

}

function draw_circles(circles) {
  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];
    let x = c[0];
    let y = c[1];
    let d = c[2];
    dottify_circle(x, y, d);
  }
}

function circles_overlap(x1, y1, d1, x2, y2, d2) {
  dist = sqrt((x2-x1)**2 + (y2-y1)**2);
  let r1 = d1 / 2;
  let r2 = d2 / 2;

  return dist <= (r1 + r2);
}

// Replace a circle as a line with a bunch of dots that take the shape of the circle. This is
// done by having
function dottify_circle(x, y, diameter) {
  // I like the look of 2000 dots for a diameter of 100. It should go down at a quadratic rate
  // (by area) to the ratio of 2000 dots for a 100 radius. So eg diameter 50 gives 1/4 as many dots.
  let r = diameter / 2;

  let num_circles = ((diameter / 100) ** 2) * 3000

  for (let i = 0; i < num_circles; i++) {
    rand_x = randomGaussian(x, r / 2.5);
    rand_y = randomGaussian(y, r / 2.5);
    point(rand_x, rand_y);
  }
}

function draw() {
}
