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
const MAX_DEPTH = 25;

// The ratio of mean to standard deviation for our program. This is kept consistent for
// all Gaussian distributions in the program. This is a divisor, so set it larger for
// less variance, and lower for more variance. Setting this low makes the blob much bigger and
// much less symmetric.
const COEFFICIENT_OF_VARIATION = 5;

// The jut length's mean and standard deviation are calculated as a factor
// of the length of the segment that it juts from. this is the denominator, so set
// it higher to make the blob small.
const JUT_FACTOR = 2;

function setup() {
  createCanvas(700, 700);
}

function draw() {
  noLoop();
  background(PALLATE[3]);

  noFill();
  poly = generate_regular_ngon(POLYGON_SIDES, 350, 350, 100);


  jutted_polygon = recursive_jut(poly);
  console.log(jutted_polygon);

  noStroke();
  fill(PALLATE[0]);
  draw_polygon(jutted_polygon);

  // draw_polygon(poly);
}

function recursive_jut(polygon, depth = 0) {
  if (depth >= MAX_DEPTH) {
    return polygon;
  }

  jutted_polygon = jut_polygon(polygon);
  return recursive_jut(jutted_polygon, depth + 1);
}

function jut_polygon(polygon) {
  let jutted_polygon = [];
  for (let i = 0; i < polygon.length; i+=2) {
    let v0 = polygon[i];

    if (i == (polygon.length - 1)) {
      let v1 = polygon[0];
      // We have to slice off the end to avoid double pushing our start of our polygon.
      let result = split_line([v0, v1]).slice(0, -1);

      jutted_polygon.push(...result);
    } else {
      let v1 = polygon[i + 1];

      jutted_polygon.push(...split_line([v0, v1]));

    }

  }

  return jutted_polygon
}

/*
* Given two vertices, this function will return a list of three vertices, where
* the first and the last are the two passed vertices, and the middle one is a new
* point that goes outward between the points.
*/
function split_line(line_points) {
  let [x1, y1] = line_points[0];
  let [x2, y2] = line_points[1];

  let slope = (y2 - y1) / (x2 - x1);
  let intercept = y2 - slope * x2;

  let max_x = max(x1, x2);
  let min_x = min(x1, x2);

  // Select a random point along the segment. TODO: Change this to Gaussian.
  let midpoint_x = (x2 + x1) / 2;
  // let rand_x = randomGaussian(midpoint_x, midpoint_x / (COEFFICIENT_OF_VARIATION / 10));
  let rand_x = random() * (max_x - min_x) + min_x;
  let rand_y = slope * rand_x + intercept;

  // Select a random angle.
  // tan(angle) is the slope. So how do we only select an angle that's going to go
  // out? The naive solution is four if blocks. If x1 < x2 and y1 > y2, then the..
  // Wait I thought of a better one. Find the angle that corresponds to the slope of this
  // line. Get the perpendicular slope (opposite reciprocal). Get the angle that corresponds to
  // that as arctan. Then our range of acceptable angles goes from -PI/2 to +PI/2 range from that angle.

  // Center our angle jut around perpendicular. We also don't want variations (outliers okay) greater
  // than 90 degrees, so our std deviation should at most be PI/6
  const ANGLE_MEAN_PERP = atan(-1 * 1/slope );
  const ANGLE_STD = abs(ANGLE_MEAN_PERP) / COEFFICIENT_OF_VARIATION;

  random_angle = randomGaussian(ANGLE_MEAN_PERP, ANGLE_STD);

  if (y1 > y2) {
    random_angle -= PI;
  }


  segment_length = sqrt((x2 - x1)**2 + (y2 - y1)**2);
  // Select a distance out to go. This should be based on our line segments length.
  const DIST_MEAN = segment_length / JUT_FACTOR;
  const DIST_STD = DIST_MEAN / COEFFICIENT_OF_VARIATION;

  let distance = randomGaussian(DIST_MEAN, DIST_STD);

  let jut_x = rand_x + distance * cos(random_angle);
  let jut_y = rand_y + distance * sin(random_angle);

  return [ [x1, y1], [jut_x, jut_y], [x2, y2] ];
}

function generate_regular_ngon(n, cx, cy, r) {
  let polygon = [];
  for (let i = 0; i < n; i++) {
    let theta_i = 2 * PI * (i / n);
    // Put even polygons "flat" on the bottom, and rotate odd polygons so that their
    // point goes upwards
    if (n % 2 == 1) {
      theta_i -= .5 * PI;
    }
    let x_i = cx + r * cos(theta_i);
    let y_i = cy + r * sin(theta_i);

    polygon.push([x_i, y_i]);
  }

  return polygon;
}

function draw_polygon(polygon) {
  beginShape();
  polygon.forEach(coord => {
    vertex(coord[0], coord[1]);
  });
  endShape(CLOSE);
}
