import p5Types from "p5";
import SketchPage from "../../components/SketchPage";
import { Quadrants, Rect, Shape, Triangle } from "../../utils/shapes";
import { draw_polygon } from "../../utils/utils";
import { PALLATE } from "../../utils/colors";

export default function Sketch6() {
  return (
    <main>
      <SketchPage title="sketch6" setup={setup} draw={draw} />
    </main>
  )
}

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

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}


const setup = (p5: p5Types, canvasParentRef: Element) => {
  p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
}

function draw(p5: p5Types) {
  p5.background(PALLATE[0]);
  p5.noLoop();

  // So the problem here is that the shape functions I've been working with have
  // been exclusively "draw this shape" functions. But that won't work here, because what
  // I want is to start with a big shape, pass it as an argument.

  // There's one really obvious way to do "shapes as an object" and that is as a list
  // of coordinates, where each coordinate is a 2D list x,y. That's what I did back in
  // Sketch 4. So let's do that.

  p5.noFill();
  p5.stroke(31,26,14);
  const starting_shapes = split_rect_quadrants([ [50,50], [650,50], [650,650], [50,650] ]);

  const pieces = recursive_breakup(starting_shapes);

  p5.strokeWeight(.4);
  pieces.forEach(shape => {
    const color = PALLATE[getRandomInt(PALLATE.length)];
    //color = int(random * (max - min) + min)
    p5.fill(color);

    draw_polygon(p5, shape);
  });

  // draw_polygon(p5, starting_rect);
}

/**
*
* shapes: a LIST of shapes, each either 3 or 4 vertices.
* Base case: Max depth achieved.
* Idea: Add randomness to recursion eg a 33% chance of stopping at this level.
**/
function recursive_breakup(shapes: Array<Shape>, depth=0): Array<Shape> {
  if (depth >= MAX_DEPTH) {
    return shapes;
  }

  const ret_shapes = [];

  // Note: I had a problem with not putting "let" in front of my variables. Apparantly
  // then it does it by function scope, which in a recursive function seems to blend with
  // its subproblems. No good!
  for (let i = 0; i < shapes.length; i++) {
    const shape = shapes[i];

    if (Math.random() < .7) {
      const broken_up = breakup_shape(shape);

      const rec_broken_up = recursive_breakup(broken_up, depth + 1);
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
function split_rect_quadrants(rect: Rect): Quadrants {
  const low_x = rect[0][0];
  const high_x = rect[1][0];
  const low_y = rect[0][1];
  const high_y = rect[2][1];

  const half_x = (high_x+low_x) / 2
  const half_y = (high_y+low_y) / 2

  // Starts at the first coord, has half the width and height
  const quad0: Rect = [ [low_x, low_y], [half_x, low_y], [half_x, half_y], [low_x, half_y] ];
  const quad1: Rect = [ [half_x, low_y], [high_x, low_y], [high_x, half_y], [half_x, half_y] ];
  const quad2: Rect = [ [half_x, half_y], [high_x, half_y], [high_x, high_y], [half_x, high_y] ];
  const quad3: Rect = [ [low_x, half_y], [half_x, half_y], [half_x, high_y], [low_x, high_y] ];

  return [quad0, quad1, quad2, quad3]

}

function split_rect_triangles(rect: Rect): Array<Triangle> {
  const low_x = rect[0][0];
  const high_x = rect[1][0];
  const low_y = rect[0][1];
  const high_y = rect[2][1];

  // let half_x = (high_x+low_x) / 2
  // let half_y = (high_y+low_y) / 2

  const triangle0: Triangle = [ [low_x, low_y], [high_x, low_y], [low_x, high_y] ];
  const triangle1: Triangle = [ [high_x, low_y], [high_x, high_y], [low_x, high_y] ];

  return [triangle0, triangle1];
}

/*
* Note that we only are going to do this with rectangles and triangles.
*/
function breakup_shape(shape: Shape): Array<Shape> {
  // Rectangle
  if (shape.length == 4) {
    // Can split a rectangle into 4 quadrants, or into 2 triangles.
    if (Math.random() < .5) {
      return split_rect_quadrants(shape);
    } else {
      return split_rect_triangles(shape);
    }
  }
  return [shape]
}

