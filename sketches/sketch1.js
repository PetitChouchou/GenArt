import React from "react";
import Sketch from "react-p5";

export default function Sketch1 (props) {
	return <Sketch setup={setup} draw={draw} />;
};

// A demo that creates a canvas and follows the demo on https://p5js.org/get-started/.

function setup() {
  createCanvas(800, 800);
}

function draw() {
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80)
}
