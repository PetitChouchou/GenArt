import p5Types from "p5";
import dynamic from 'next/dynamic'
import SketchPage from "../../components/SketchPage";

const Sketch = dynamic(() => import('react-p5'), { ssr: false });

export default function Sketch1 () {
  // A demo that creates a canvas and follows the demo on https://p5js.org/get-started/.
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.displayWidth, p5.displayHeight).parent(canvasParentRef);
  }

  const draw = (p5: p5Types) => {
    if (p5.mouseIsPressed) {
      p5.fill(0);
    } else {
      p5.fill(255);
    }
    p5.ellipse(p5.mouseX, p5.mouseY, 80, 80)
  }

  return (
  <main>
    <div>sketch1 baby</div>
    <SketchPage setup={setup} draw={draw} />
  </main>
  )
};
