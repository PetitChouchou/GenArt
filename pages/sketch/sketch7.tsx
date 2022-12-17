import p5Types from "p5";
import SketchPage from "../../components/SketchPage";
import { Coord, Polygon, Quadrants, Rect, Shape, Triangle } from "../../utils/shapes";
import { draw_polygon, generate_regular_ngon } from "../../utils/utils";

export default function Sketch7() {
  return (
    <main>
      <SketchPage title="sketch7" setup={setup} draw={draw} />
    </main>
  )
}

/**
* Sketch 7: Polygon Blob Transformations
* I guess the goal here is to cmobine sketches 4 and 6, the first the polgyon jut and the
* second the recursion.
*
* This program makes a polygon blob that looks kind of like a watercolor. Maybe in the future
* I'll play with blending to make it actually look like a watercolor.
*
* PALLATE: https://www.color-hex.com/color-palette/68787
**/

var PALLATE = [
  "rgb(167,186,66)",
  "rgb(149,204,186)",
  "rgb(255,222,222)",
  "rgb(255,240,203)",
  "rgb(242,204,132)",
  ];

// PARAMETER TUNING

// The number of sides in the polygon we start with.
const POLYGON_SIDES = 7;

// Higher means more recursions means more details. Set it to zero to just get a polygon.
const MAX_DEPTH = 8;

// The ratio of mean to standard deviation for our program. This is kept consistent for
// all Gaussian distributions in the program. This is a divisor, so set it larger for
// less variance, and lower for more variance. Setting this low makes the blob
// much less symmetric. Set to an extremely large number to get perfect symmetry / no randomness.
const COEFFICIENT_OF_VARIATION = 20;

// The jut length's mean and standard deviation are calculated as a factor
// of the length of the segment that it juts from. this is the denominator, so set
// it higher to make the blob small.
const JUT_FACTOR = 5;

const setup = (p5: p5Types, canvasParentRef: Element) => {
  p5.createCanvas(p5.displayWidth, p5.displayHeight).parent(canvasParentRef);
}

function draw(p5: p5Types) {
  p5.noLoop();
  p5.background(PALLATE[3]);

  p5.noFill();
  const poly = generate_regular_ngon(p5, POLYGON_SIDES, 350, 350, 100);


  const jutted_polygon = recursive_jut(p5, poly);
  console.log(jutted_polygon);

  p5.noStroke();
  p5.fill(PALLATE[0]);
  draw_polygon(p5, jutted_polygon);

  // draw_polygon(poly);
}

function recursive_jut(p5: p5Types, polygon: Polygon, depth = 0): Polygon {
  if (depth >= MAX_DEPTH) {
    return polygon;
  }

  const jutted_polygon = jut_polygon(p5, polygon);
  return recursive_jut(p5, jutted_polygon, depth + 1);
}

function jut_polygon(p5: p5Types, polygon: Polygon): Polygon {
  let jutted_polygon: Polygon = [];
  for (let i = 0; i < polygon.length; i++) {
    let v0 = polygon[i];

    if (i == (polygon.length - 1)) {
      let v1 = polygon[0];
      // We have to slice off the end to avoid double pushing our start of our polygon.
      let result = split_line(p5, [v0, v1]).slice(0, -1);

      jutted_polygon.push(...result);
    } else {
      let v1 = polygon[i + 1];

      jutted_polygon.push(...split_line(p5, [v0, v1]));

    }

  }

  return jutted_polygon
}

/*
* Given two vertices, this function will return a list of three vertices, where
* the first and the last are the two passed vertices, and the middle one is a new
* point that goes outward between the points.
*/
function split_line(p5: p5Types, line_points: [Coord, Coord]): Polygon {
  let [x1, y1] = line_points[0];
  let [x2, y2] = line_points[1];

  let slope = (y2 - y1) / (x2 - x1);
  let intercept = y2 - slope * x2;

  let max_x = p5.max(x1, x2);
  let min_x = p5.min(x1, x2);

  // Select a random point along the segment. TODO: Change this to Gaussian.
  let midpoint_x = (x2 + x1) / 2;
  let var_x = midpoint_x / COEFFICIENT_OF_VARIATION;
  let rand_x = randomGaussianFloorCeiling(p5, midpoint_x, var_x, min_x, max_x);
  let rand_y = slope * rand_x + intercept;

  // Select a random angle.
  // tan(angle) is the slope. So how do we only select an angle that's going to go
  // out? The naive solution is four if blocks. If x1 < x2 and y1 > y2, then the..
  // Wait I thought of a better one. Find the angle that corresponds to the slope of this
  // line. Get the perpendicular slope (opposite reciprocal). Get the angle that corresponds to
  // that as arctan. Then our range of acceptable angles goes from -PI/2 to +PI/2 range from that angle.

  // Center our angle jut around perpendicular. We also don't want variations (outliers okay) greater
  // than 90 degrees, so use the floor ceiling function.
  const ANGLE_MEAN_PERP = p5.atan(-1 * 1/slope );
  const ANGLE_STD = p5.abs(ANGLE_MEAN_PERP) / COEFFICIENT_OF_VARIATION;

  let random_angle = randomGaussianFloorCeiling(p5, ANGLE_MEAN_PERP, ANGLE_STD, ANGLE_MEAN_PERP - p5.PI / 2, ANGLE_MEAN_PERP + p5.PI/2);

  if (y1 > y2) {
    random_angle -= p5.PI;
  }


  const segment_length = p5.sqrt((x2 - x1)**2 + (y2 - y1)**2);
  // Select a distance out to go. This should be based on our line segments length.
  const DIST_MEAN = segment_length / JUT_FACTOR;
  const DIST_STD = DIST_MEAN / COEFFICIENT_OF_VARIATION;

  let distance = randomGaussianFloorCeiling(p5, DIST_MEAN, DIST_STD, 0);

  let jut_x = rand_x + distance * p5.cos(random_angle);
  let jut_y = rand_y + distance * p5.sin(random_angle);

  return [ [x1, y1], [jut_x, jut_y], [x2, y2] ];
}

/*
* Returns a random Gaussian according to the usual mean and standard deviation, but
* also allows optional floor and ceiling arguments. If the generated value is greater
* than ceiling, or less than floor, it replaces it with those respective values. Just
* a useful function to have.
*
* This is in Camel Case cause it's kinda like a library function. I might even go through
* and collect these.
*/
function randomGaussianFloorCeiling(p5: p5Types, mean: number, std: number, floor?: number, ceil?: number) {
  const val = p5.randomGaussian(mean, std);

  if (floor && val < floor) {
    return floor;
  }

  if (ceil && val > ceil) {
    return ceil
  }

  return val
}
