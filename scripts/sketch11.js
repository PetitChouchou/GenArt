/*
* Sketch 11: Catmull-Rom Splines
*
*
* It's been awhile since I made one of these, so I'm just going to throw something at it.
* The first thought that came to my head is "sirals", akin to those you'd make if you
* were doodling on a piece of paper as a kid and you fill the page with spirals.
*
* Now that it's done, it seems that I got wrapped up in the world of splines. I didn't make
* a bunch of them as a kind of spiral like a doodle, as was originally planned. I went instead
* for the kind of "make it as a tool to see how this particular thing works", which seems to work
* well as a first step before making something a bunch of times. I think a good idea for a future
* day would be to combine these splines with the parametric functions in the previous sketch. In general
* that seems a good paradigm: find a mathematical representation of some graphics concept, here a
* Catmull-Rom Spline, and make a sketch that lets me draw around the parameters using xy mouse coordinates.
* Then, make another sketch that "automates" that drawing around using different parametric functions.
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

let button;
let pen_toggled = false;

// We want to be able to click to select either of these circles.
let point1 = [50, 500];
let point4 = [550, 500];
let select_point1 = false;
let select_point4 = false;

let point2 = [200, 300];
let point3 = [400, 300];

let select_point2 = true;

const HITBOX_SIZE = 20;


function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  background(PALLATE[0]);

  button = createButton("Pen Tool");
  button.position(0, CANVAS_SIZE + 60);
  button.mouseReleased(toggle_pen);

}

// Ran an experiment to make sure the order of this function and the global mousePressed
// happens correctly. mousePressed should run BEFORE toggle_pen, because otherwise the
// boolean will be set to true and it will be as if you clicked on the xy coordinates of the
// button to move the point there. No good. That's why this toggle function runs on
// release, while the global event happens on mouse press.
function toggle_pen() {
  pen_toggled = !pen_toggled;
  if (pen_toggled) {
    button.style('background-color', 'gray');
    cursor('grab');
  } else {
    button.style('background-color', 'white');
    cursor('auto');
  }
}

// Global event created any time there is a mouse press.
function mousePressed(event) {
  // Pen mode should move the circles. Otherwise we are drawing the spline points.
  if (pen_toggled) {
    // A circle is selected and highlighted. Clicking should deselect.
    if (select_point1 || select_point4) {
      if (select_point1) {
        select_point1 = false;
        point1 = [mouseX, mouseY];
      } else if (select_point4) {
        select_point4 = false;
        point4 = [mouseX, mouseY];
      }

    } else {
      // No circles are selected and highlighted. Clicking should select only if
      // done within the circle.
      if (click_within_hitbox(point1)) {
        select_point1 = true;
      } else if(click_within_hitbox(point4)) {
        select_point4 = true;
      }
    }

  } else {
    // Alternate clicks between points 2 and 3. Do not draw if the click is outside the
    // canvas.
    if (mouseX > CANVAS_SIZE || mouseX < 0 || mouseY > CANVAS_SIZE || mouseY < 0) {
      return;
    }

    if (select_point2) {
      point2 = [mouseX, mouseY];
    } else {
      point3 = [mouseX, mouseY];
    }
    select_point2 = !select_point2;
  }

}

// Checks if mouseX, mouseY are within a rectangular hitbox of size HITBOX_SIZE centered around
// point. Hitbox is rectangular rather than circular because the math is way easier.
function click_within_hitbox(point) {
  if (mouseX < point[0] - HITBOX_SIZE || mouseX > point[0] + HITBOX_SIZE) {
    return false;
  }
  if (mouseY < point[1] - HITBOX_SIZE || mouseY > point[1] + HITBOX_SIZE) {
    return false;
  }

  return true;
}

function draw() {
    background(PALLATE[0]);

    noStroke();

    fill(PALLATE[2]);
    if (select_point1) {
      fill(PALLATE[4]);
      point1 = [mouseX, mouseY];
    }
    circle(point1[0], point1[1], HITBOX_SIZE);

    fill(PALLATE[2]);
    if (select_point4) {
      fill(PALLATE[4]);
      point4 = [mouseX, mouseY];
    }
    circle(point4[0], point4[1], HITBOX_SIZE);

    fill(PALLATE[1]);

    stroke('black');
    strokeWeight(2);
    noFill();
    beginShape();
    curveVertex(point1[0], point1[1]);
    curveVertex(point2[0], point2[1]);
    curveVertex(point3[0], point3[1]);
    curveVertex(point4[0], point4[1]);
    endShape();

}
