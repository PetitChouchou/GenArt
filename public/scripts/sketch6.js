/** Sketch 6: Polygon Splitting.
*
* The plan here is to make an algorithm/system that splits up a rectangle into two smaller rectangles,
* or into two triangles, or a triangle into two triangles. I'll start by splitting them in half, then add some
* randomness. Then the idea is that you can apply this recursively.
*
* Color pallate: http://wesandersonpalettes.tumblr.com/post/109980167015/peter-fuck-the-itinerary
*  217,227,217,  124.154.166  245,225,175  176,99,49  138,131,121
**/

const MAX_DEPTH = 3;
var PALLATE = [
  "rgb(217,227,217)",
  "rgb(124,154,166)",
  "rgb(245,225,175)",
  "rgb(176,99,49)",
  "rgb(138,131,121)",
  ];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


function setup() {
  createCanvas(700, 700);
}

function draw() {
  background(PALLATE[2]);
  noLoop();

  // So the problem here is that the shape functions I've been working with have
  // been exclusively "draw this shape" functions. But that won't work here, because what
  // I want is to start with a big shape, pass it as an argument.

  // There's one really obvious way to do "shapes as an object" and that is as a list
  // of coordinates, where each coordinate is a 2D list x,y. That's what I did back in
  // Sketch 4. So let's do that.

  noFill();
  stroke(31,26,14);
  starting_shapes = split_rect_quadrants([ [50,50], [650,50], [650,650], [50,650] ]);

  pieces = recursive_breakup(starting_shapes);

  strokeWeight(.4);
  pieces.forEach(shape => {
    color = PALLATE[getRandomInt(PALLATE.length)];
    //color = int(random * (max - min) + min)
    fill(color);

    draw_polygon(shape);
  });

  // draw_polygon(starting_rect);
}

/**
*
* shapes: a LIST of shapes, each either 3 or 4 vertices.
* Base case: Max depth achieved.
* Idea: Add randomness to recursion eg a 33% chance of stopping at this level.
**/
function recursive_breakup(shapes, depth=0) {
  if (depth >= MAX_DEPTH) {
    return shapes;
  }

  let ret_shapes = [];

  // Note: I had a problem with not putting "let" in front of my variables. Apparantly
  // then it does it by function scope, which in a recursive function seems to blend with
  // its subproblems. No good!
  for (let i = 0; i < shapes.length; i++) {
    let shape = shapes[i];

    if (random() < .7) {
      let broken_up = breakup_shape(shape);

      let rec_broken_up = recursive_breakup(broken_up, depth + 1);
      ret_shapes.push(...rec_broken_up);
    } else {
      ret_shapes.push(shape);
    }
  }

  return ret_shapes;

}

/**
* IMPORTANT: RECTANGLES MUST GO FROM UPPER LEFT TO UPPER RIGHT TO LOWER RIGHT TO LOWER LEFT.
* THIS IS CLOCKWISE ORDER.
* Todo: Fix the above.
* Returns: A list of 4 Polygons, each of them rectangles.
**/
function split_rect_quadrants(rect) {
  let low_x = rect[0][0];
  let high_x = rect[1][0];
  let low_y = rect[0][1];
  let high_y = rect[2][1];

  let half_x = (high_x+low_x) / 2
  let half_y = (high_y+low_y) / 2

  // Starts at the first coord, has half the width and height
  let quad0 = [ [low_x, low_y], [half_x, low_y], [half_x, half_y], [low_x, half_y] ];
  let quad1 = [ [half_x, low_y], [high_x, low_y], [high_x, half_y], [half_x, half_y] ];
  let quad2 = [ [half_x, half_y], [high_x, half_y], [high_x, high_y], [half_x, high_y] ];
  let quad3 = [ [low_x, half_y], [half_x, half_y], [half_x, high_y], [low_x, high_y] ];

  return [quad0, quad1, quad2, quad3]

}

function split_rect_triangles(rect) {
  low_x = rect[0][0];
  high_x = rect[1][0];
  low_y = rect[0][1];
  high_y = rect[2][1];

  let half_x = (high_x+low_x) / 2
  let half_y = (high_y+low_y) / 2

  triangle0 = [ [low_x, low_y], [high_x, low_y], [low_x, high_y] ];
  triangle1 = [ [high_x, low_y], [high_x, high_y], [low_x, high_y] ];

  return [triangle0, triangle1];
}

/*
* Note that we only are going to do this with rectangles and triangles.
*/
function breakup_shape(shape) {
  if (shape.length < 3 || shape.length > 4) {
    return "BAD ERROR DO NOT DO!";
  }
  // Rectangle
  if (shape.length == 4) {
    // Can split a rectangle into 4 quadrants, or into 2 triangles.
    if (random() < .5) {
      return split_rect_quadrants(shape);
    } else {
      return split_rect_triangles(shape);
    }
  }
  if (shape.length == 3) {
    return [shape]
  }
}

function draw_polygon(polygon) {
  beginShape();
  polygon.forEach(coord => {
    vertex(coord[0], coord[1]);
  });
  endShape(CLOSE);
}
