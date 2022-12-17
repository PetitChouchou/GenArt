import p5Types from "p5";
import SketchPage from "../../components/SketchPage";
import { PALLATE } from "../../utils/colors";

export default function Sketch8() {
  return (
    <main>
      <SketchPage title="sketch8" setup={setup} draw={draw} />
    </main>
  )
}

/**
* Sketch 8: Follow the Mouse.
*
* I'm pretty dry on ideas, so what I think I'm gonna do is just have a rectangle that follows
* the mouse around. Should be pretty simple, and I can also have the colors/size
* of that rectangle depend on its x/y position.
* Pretty boring but simple enough, and it's good to go.
*
*/
const CANVAS_SIZE = 720;

const setup = (p5: p5Types, canvasParentRef: Element) => {
  p5.createCanvas(p5.displayWidth, p5.displayHeight).parent(canvasParentRef);
  p5.colorMode("HSB", 360, 100, 100);
  p5.background(PALLATE[0]);
}

function draw(p5: p5Types) {
  p5.noCursor();

  const RECT_SIZE_MAX = 200;
  const RECT_SIZE_MIN = 20;

  const rect_size = RECT_SIZE_MIN + (RECT_SIZE_MAX - RECT_SIZE_MIN) * (p5.mouseY / CANVAS_SIZE);
  const prect_size = RECT_SIZE_MIN + (RECT_SIZE_MAX - RECT_SIZE_MIN) * (p5.pmouseY / CANVAS_SIZE);

  // let hue = floor(mousex / 2);

  // console.log(mouseX);
  p5.noStroke();
  p5.fill(PALLATE[0]);
  p5.rect(p5.pmouseX - prect_size / 2 - 1, p5.mouseY - prect_size / 2 - 1, prect_size + 2, prect_size + 2);
  p5.fill(p5.mouseX / 2, 100, 100);
  p5.rect(p5.mouseX - rect_size / 2, p5.mouseY - rect_size / 2, rect_size, rect_size);
}
