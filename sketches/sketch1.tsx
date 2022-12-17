import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";


export default function Sketch1 () {
  // A demo that creates a canvas and follows the demo on https://p5js.org/get-started/.
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(800, 800).parent(canvasParentRef);
  }

  const draw = (p5: p5Types) => {
    if (p5.mouseIsPressed) {
      p5.fill(0);
    } else {
      p5.fill(255);
    }
    p5.ellipse(p5.mouseX, p5.mouseY, 80, 80)
  }

  return <Sketch setup={setup} draw={draw} />;
};