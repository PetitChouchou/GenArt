/**
* Sketch 4: Polygon Jut
* Inspired by Tyler Hobbs' essay "How to Hack a Painting": https://tylerxhobbs.com/essays/2020/how-to-hack-a-painting
* The goal here is to start with a regular polygon, and then jut out the edges fractally according to some
* kind of randomness.
* I did not make it to watercolor nth recursion, but I did get a decently random jutted ngon that I think can build on in the future.
*
*
*/

function setup() {
  createCanvas(800, 800);
  frameRate(1);
}

function draw() {
  background(249,248,244);

  // Our first step here is to draw a regular N-gon with a given center coordinate. That
  // might end up being real easy or real tricky.

  vertices = 7;
  cx = 150;
  cy = 150;
  r = 50;

  noStroke();
  fill(183, 112, 230);
  // draw_regular_ngon(7, 150, 250, 100);

  // Now that we have a regular N-gon what we want is to perform polygon distortion. We
  // go between each pair of vertices and add a vertex between them. The variables dictating
  // where it goes are 1. What point on the line between the two vertices to go off from.
  // 2. What angle to go up from. 3. What distance outward to go.


  // For this to happen we need polygons to be like a modifiable object. Let's start
  // by doing them as a list of vertices. So we store them ass a list of vertices, and
  // then add to the list. Then, each frame, we call a helper method to draw the list of vertices.
  polygon = generate_regular_ngon(7, 150, 250, 100);

  // draw_polygon(polygon);

  polygon = jut_deform_polygon(polygon);
  console.log(polygon);
  draw_polygon(polygon);
}

function jut_deform_polygon(polygon) {
  jut_poly = [];

  // So we distorted it by two virables: the first the distance between the first vertex and the jut, and
  // the second the angle made between that line and the next line in the triangle. this makes a mediocre jut.
  Math.random() * (max - min) + min;

  const ANGLE_MIN = 0.0;
  const ANGLE_MAX = 2 * PI;
  const DIST_MIN = 0.0;
  const DIST_MAX = 50.0;

  for (i = 0; i < polygon.length - 1; i++) {
    coord = polygon[i];
    next_coord = polygon[i+1];

    rand_angle = Math.random() * (ANGLE_MAX - ANGLE_MIN) + ANGLE_MIN;
    rand_dist = Math.random() * (DIST_MAX - DIST_MIN) + DIST_MIN;

    jut_poly.push(coord);

    jut_coordx = coord[0] + rand_dist * sin(rand_angle);
    jut_coordy = coord[1] + rand_dist * cos(rand_angle);

    jut_poly.push([jut_coordx, jut_coordy]);
  }

  return jut_poly;

}

/*
* Draws a regular ngon centered at the provided coordinates. Polygons will be drawn starting
* directly above the center point, so that they have a vertical axis of symmetry.
* n : the number of sides in the polygon
* cx: The center x coordinate
* cy: The Center's y coord
* r: The radius of the polygon, the distance from the center to a vertex.
*
*/
function draw_regular_ngon(n, cx, cy, r) {
  beginShape();
  for (i = 0; i < vertices; i++) {
    theta_i = 2 * PI * (i / vertices) - .5 * PI;
    x_i = cx + r * cos(theta_i);
    y_i = cy + r * sin(theta_i);
    vertex(x_i, y_i);
  }
  endShape(CLOSE);
}

function draw_polygon(polygon) {
  beginShape();
  polygon.forEach(coord => {
    vertex(coord[0], coord[1]);
  });
  endShape(CLOSE);
}

/*
* Does the same as draw draw_regular_ngon, except instead of drawing the n gon, it
* returns a list of the vertices.
*/
function generate_regular_ngon(n, cx, cy, r) {
  polygon = [];
  for (i = 0; i < n; i++) {
    theta_i = 2 * PI * (i / vertices) - .5 * PI;
    x_i = cx + r * cos(theta_i);
    y_i = cy + r * sin(theta_i);

    polygon.push([x_i, y_i]);
  }

  return polygon;
}
