/**
* Sketch 5: Texture
* My intention with this was to make it like grass, but what I ended up with was something
* like an audio stream. Might look good as the background to a podcast.
*
**/

const SIZE = 800;

function setup() {
  createCanvas(SIZE, SIZE);
}

function draw() {

  if (frameCount > 1) {
    return;
  }
  background(249,248,244);

  // Let's add a grass like texture with a bunch of vertical lines.
  // What do we want to vary exactly? Do we want to have a set start point and vary
  // the up and down direction, or would that look too symmetric? Let's see.

  const NUM_COLS = 200;
  const NUM_ROWS = 20;


  for (i = 0; i < NUM_COLS; i++) {
    for (j = 0; j < NUM_ROWS; j++ ) {
      length = randomGaussian(20,15);
      alpha = randomGaussian(100, 15);
      stroke(31,26,14,alpha);


      top_coord = SIZE * (j / NUM_ROWS) - (length / 2);
      bottom = SIZE * (j / NUM_ROWS) + (length / 2);

      x = SIZE * (i / NUM_COLS);

      console.log(x + "," + bottom + "," + top_coord);
      line(x, bottom, x, top_coord);

    }
  }
}
