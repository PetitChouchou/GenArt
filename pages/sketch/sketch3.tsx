import p5Types from "p5";
import SketchPage from "../../components/SketchPage";

export default function Sketch3() {
  return (
    <main>
      <SketchPage title="sketch3" setup={setup} draw={draw} />
    </main>
  )
}

// Sketch 3: Flowing Circles.
// Circles that flow across the screen.
// Motivating statement: My goal here is to mess around with circle drawing. I
// want to see if i can find some kind of clever way to put a draw a bunch of circles.

const setup = (p5: p5Types, canvasParentRef: Element) => {
  p5.createCanvas(800, 800).parent(canvasParentRef);
}

function draw(p5: p5Types) {
  p5.background(111, 201, 188);

  p5.noFill();

  p5.stroke(230, 25, 76);

  const offset = 5;


  for (let y_offset = -1000; y_offset <= 1000; y_offset += 75) {
    // Lets make a bunch of runners.
    for (let i = 0; i < 150; i++) {
      horizontal_runner(p5, 50, i * offset, i * offset + y_offset, 100);
    }
  }
}

/**
* Creates a horizontal runner. This consists of a circle flowing as a semicircle, and
* a trailing circle "unflowing" in a mirrored semicircle. Just see the visualization, it's
* not actually that complicated.
*
* circle_width int: number of pixels wide (2*RADIUS) to make the runner's circle parts
* x_start: x coordinate to start the runner at
* y_start: y coordinate to start at
* flow_rate: The number of frames to take for one circle to flow from nothing into a full semicircle.
*
* TODO: It seems that the X and y starts are offset. Ie when i put 0 0 it starts somewhere offset from there.
* But I'm too tired for that now.
**/
function horizontal_runner(p5: p5Types, circle_width: number, x_start: number, y_start: number, flow_rate: number) {
  // The goal here is to have the circles "flow" into one another.
  // We have frameCount constantly incrementing. What i want is to turn that into
  // a value for each of the ellipses. So what if we did: 0-> 25.

  const fragment = (p5.frameCount % flow_rate) / flow_rate;

  const arc_x = x_start + circle_width * (Math.floor(p5.frameCount / flow_rate));
  const arc_y = y_start + 50;

  // We need to alternate going over and going down. Go up on even indecies (when modulus is zero) and down on odd.
  const arc_down = Math.floor(p5.frameCount / flow_rate) % 2
  let arc_start = p5.PI;

  // If it's arc down, we need to subtract PI * fragment. If it's arc up we need to add it.
  let arc_stop = p5.PI;
  if (arc_down == 1) {
    arc_start = p5.PI - (p5.PI * fragment);
  } else {
    arc_stop = p5.PI + (p5.PI * fragment);
  }

  p5.arc(arc_x, arc_y, circle_width, circle_width, arc_start, arc_stop);

  // Do the same for the previous, "descending" arc.
  if ( Math.floor(p5.frameCount / flow_rate) >= 1) {
    const prev_arc_x = x_start + circle_width * (Math.floor(p5.frameCount / flow_rate) - 1);
    const prev_arc_y = y_start + 50;

    const prev_arc_down = (Math.floor(p5.frameCount / flow_rate)) % 2;

    let prev_arc_start = 0;
    let prev_arc_stop = 2 * p5.PI;
    if (prev_arc_down) {
      prev_arc_start = p5.PI + (p5.PI * fragment);
    } else {
      prev_arc_stop = p5.PI - (p5.PI * fragment);
    }

    p5.arc(prev_arc_x, prev_arc_y, circle_width, circle_width, prev_arc_start, prev_arc_stop);
  }

}
