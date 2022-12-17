import p5Types from "p5";
import SketchPage from "../../components/SketchPage";
import { Coord, Polygon } from "../../utils/shapes";
import { draw_polygon } from "../../utils/utils";

export default function Sketch4() {
  return (
    <main>
      <SketchPage title="sketch4" setup={setup} draw={draw} />
    </main>
  )
}

/**
* Sketch 4: Polygon Jut
* Inspired by Tyler Hobbs' essay "How to Hack a Painting": https://tylerxhobbs.com/essays/2020/how-to-hack-a-painting
* The goal here is to start with a regular polygon, and then jut out the edges fractally according to some
* kind of randomness.
* I did not make it to watercolor nth recursion, but I did get a decently random jutted ngon that I think can build on in the future.
*
*
*/

const setup = (p5: p5Types, canvasParentRef: Element) => {
  p5.createCanvas(p5.displayWidth, p5.displayHeight).parent(canvasParentRef);
  p5.frameRate(1);
}

const VERTICES = 7;

function draw(p5: p5Types) {
  p5.background(249,248,244);

  // Our first step here is to draw a regular N-gon with a given center coordinate. That
  // might end up being real easy or real tricky.

  let cx = 150;
  let cy = 150;
  let r = 50;

  p5.noStroke();
  p5.fill(183, 112, 230);
  // draw_regular_ngon(7, 150, 250, 100);

  // Now that we have a regular N-gon what we want is to perform polygon distortion. We
  // go between each pair of vertices and add a vertex between them. The variables dictating
  // where it goes are 1. What point on the line between the two vertices to go off from.
  // 2. What angle to go up from. 3. What distance outward to go.


  // For this to happen we need polygons to be like a modifiable object. Let's start
  // by doing them as a list of vertices. So we store them ass a list of vertices, and
  // then add to the list. Then, each frame, we call a helper method to draw the list of vertices.
  let polygon = generate_regular_ngon(p5, 7, 150, 250, 100);

  // draw_polygon(polygon);

  polygon = jut_deform_polygon(p5, polygon);
  console.log(polygon);
  draw_polygon(p5, polygon);
}

function jut_deform_polygon(p5: p5Types, polygon: Polygon): Polygon {
  let jut_poly: Polygon = [];

  // So we distorted it by two virables: the first the distance between the first vertex and the jut, and
  // the second the angle made between that line and the next line in the triangle. this makes a mediocre jut.
  // Math.random() * (max - min) + min;

  const ANGLE_MIN = 0.0;
  const ANGLE_MAX = 2 * p5.PI;
  const DIST_MIN = 0.0;
  const DIST_MAX = 50.0;

  for (let i = 0; i < polygon.length - 1; i++) {
    const coord = polygon[i];
    const next_coord = polygon[i+1];

    const rand_angle = Math.random() * (ANGLE_MAX - ANGLE_MIN) + ANGLE_MIN;
    const rand_dist = Math.random() * (DIST_MAX - DIST_MIN) + DIST_MIN;

    jut_poly.push(coord);

    const jut_coordx = coord[0] + rand_dist * p5.sin(rand_angle);
    const jut_coordy = coord[1] + rand_dist * p5.cos(rand_angle);

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
function draw_regular_ngon(p5: p5Types, n: number, cx: number, cy: number, r: number) {
  p5.beginShape();
  for (let i = 0; i < VERTICES; i++) {
    const theta_i = 2 * p5.PI * (i / VERTICES) - .5 * p5.PI;
    const x_i = cx + r * cos(theta_i);
    const y_i = cy + r * sin(theta_i);
    p5.vertex(x_i, y_i);
  }
  p5.endShape("close");
}

/*
* Does the same as draw draw_regular_ngon, except instead of drawing the n gon, it
* returns a list of the vertices.
*/
function generate_regular_ngon(p5: p5Types, n: number, cx: number, cy: number, r: number): Polygon {
  let polygon: Array<Coord> = []
  for (let i = 0; i < n; i++) {
    const theta_i = 2 * p5.PI * (i / VERTICES) - .5 * p5.PI;
    const x_i = cx + r * p5.cos(theta_i);
    const y_i = cy + r * p5.sin(theta_i);

    polygon.push([x_i, y_i]);
  }

  return polygon;
}
