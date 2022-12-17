import p5Types from "p5";
import SketchPage from "../../components/SketchPage";
import { PALLATE } from "../../utils/colors";
import { Circle } from "../../utils/shapes";

export default function Sketch12() {
  return (
    <main>
      <SketchPage title="sketch12" setup={setup} draw={draw} />
    </main>
  )
}

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

type RenderStates = "Rendering" | "Rendered" | "Not Started"
let render_state: RenderStates = "Not Started"

async function setup (p5: p5Types, canvasParentRef: Element): Promise<void> {
  p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef)
  p5.background(PALLATE[0]);
  p5.textSize(32)
  p5.fill(PALLATE[2])
  p5.text(friendly_loading_messages[friendly_loading_messages_idx], 300, 300)
  setInterval(() => {
    console.log("here we are in the interval")
    friendly_loading_messages_idx += 1
  }, 500)
}

const friendly_loading_messages = ['loading up the sketch...', 'it takes a lot of work to calculate this by hand', 'almost there i swear to you', 'its like snow white and the seven dwarves in these computer graphics mines', 'okay this is taking longer than expected', 'maybe if we keep going we\'ll strike gold', 'okay it really shouldnt be taking *this* long', 'like seriously its been more than 10 seconds now', 'somethings wrong, please contact me at: ponde.me/contact']
let friendly_loading_messages_idx = 0

function draw(p5: p5Types) {
  console.log(friendly_loading_messages.length)
  if (friendly_loading_messages_idx < friendly_loading_messages.length) {
    console.log(friendly_loading_messages[friendly_loading_messages_idx])
    const friend_y_offset = 50 * friendly_loading_messages_idx
    p5.text(friendly_loading_messages[friendly_loading_messages_idx], 300, 300 + friend_y_offset)
  }

  render_sketch(p5)
  if (render_state === "Not Started") {
    render_state = "Rendering"
    render_sketch(p5).then((res)=> {
      console.log("Finished rendering")
      render_state = "Rendered"
      p5.noLoop()
      // just in case
      friendly_loading_messages_idx = friendly_loading_messages.length
    })
  }
}


// Fits a bunch of circles.
function circle_fitter(p5: p5Types, diameter: number, circles: Array<Circle>) {

  // The routitne is as follows: put a circle in a random spot. See if it will overlap with any
  // other circle. If it doesn't, place it there. If it fails a certain number of times in a row, we give up.

  let num_fails = 0;

  while (num_fails < 2000) {
    const x = p5.random(0, p5.windowWidth);
    const y = p5.random(0, p5.windowHeight);
    let failure = false;

    for (let i = 0; i < circles.length; i++) {
      const c = circles[i];

      const x1 = c[0];
      const y1 = c[1];
      const d1 = c[2];

      // If any overlap, this is a failure.
      if (circles_overlap(p5, x1, y1, d1, x, y, diameter)) {
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

function draw_circles(p5: p5Types, circles: Array<Circle>) {
  for (let i = 0; i < circles.length; i++) {
    const c = circles[i];
    const x = c[0];
    const y = c[1];
    const d = c[2];
    dottify_circle(p5, x, y, d);
  }
}

function circles_overlap(p5: p5Types, x1: number, y1: number, d1: number, x2: number, y2: number, d2: number) {
  const dist = p5.sqrt((x2-x1)**2 + (y2-y1)**2);
  const r1 = d1 / 2;
  const r2 = d2 / 2;

  return dist <= (r1 + r2);
}

// Replace a circle as a line with a bunch of dots that take the shape of the circle. This is
// done by having
function dottify_circle(p5: p5Types, x: number, y: number, diameter: number) {
  // I like the look of 2000 dots for a diameter of 100. It should go down at a quadratic rate
  // (by area) to the ratio of 2000 dots for a 100 radius. So eg diameter 50 gives 1/4 as many dots.
  const r = diameter / 2;

  const num_circles = ((diameter / 100) ** 2) * 3000

  for (let i = 0; i < num_circles; i++) {
    const rand_x = p5.randomGaussian(x, r / 2.5);
    const rand_y = p5.randomGaussian(y, r / 2.5);
    p5.point(rand_x, rand_y);
  }
}

// NOTE: THis is extremely expensive (as in like 10 seconds load time). Don't hog the
// main thread with this otherwise it's gonna be brutal.
// Each circle is of form [x, y, d]
async function render_sketch(p5: p5Types): Promise<void> {
  return new Promise<void>(function(resolve, reject){
    let circles: Circle[] = [];
    const diameters = [500, 100, 50, 20];

    for (let i = 0; i < diameters.length; i++) {
      const d = diameters[i];
      circles = circles.concat(circle_fitter(p5, d, circles));
    }

    p5.background(PALLATE[0])
    // console.log(circles);
    draw_circles(p5, circles);

    resolve()
  })
}
