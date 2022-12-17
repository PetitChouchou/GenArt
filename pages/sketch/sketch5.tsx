import p5Types from "p5";
import SketchPage from "../../components/SketchPage";

export default function Sketch5() {
  return (
    <main>
      <SketchPage title="sketch5" setup={setup} draw={draw} />
    </main>
  )
}

/**
* Sketch 5: Texture
* My intention with this was to make it like grass, but what I ended up with was something
* like an audio stream. Might look good as the background to a podcast.
*
**/
const setup = (p5: p5Types, canvasParentRef: Element) => {
  p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
}

function draw(p5:p5Types) {

  if (p5.frameCount > 1) {
    return;
  }
  p5.background(249,248,244);

  // Let's add a grass like texture with a bunch of vertical lines.
  // What do we want to vary exactly? Do we want to have a set start point and vary
  // the up and down direction, or would that look too symmetric? Let's see.

  const NUM_COLS = 400;
  const NUM_ROWS = 20;


  for (let i = 0; i < NUM_COLS; i++) {
    for (let j = 0; j < NUM_ROWS; j++ ) {
      const length = p5.randomGaussian(20,15);
      const alpha = p5.randomGaussian(100, 15);
      p5.stroke(31,26,14,alpha);


      const top_coord = p5.windowHeight * (j / NUM_ROWS) - (length / 2);
      const bottom = p5.windowHeight * (j / NUM_ROWS) + (length / 2);

      const x = p5.windowWidth * (i / NUM_COLS);

      console.log(x + "," + bottom + "," + top_coord);
      p5.line(x, bottom, x, top_coord);

    }
  }
}
