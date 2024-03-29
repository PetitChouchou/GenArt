import p5Types from "p5";
import SketchPage from "../../components/SketchPage";

export default function Sketch1 () {
  return (
  <main>
    <div>sketch1 baby</div>
    <SketchPage title="sketch1" setup={setup} draw={draw} />
  </main>
  )
}

// A demo that creates a canvas and follows the demo on https://p5js.org/get-started/.
const setup = (p5: p5Types, canvasParentRef: Element) => {
  p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
}

const draw = (p5: p5Types) => {
  if (p5.mouseIsPressed) {
    p5.fill(0);
  } else {
    p5.fill(255);
  }
  p5.ellipse(p5.mouseX, p5.mouseY, 80, 80)
}