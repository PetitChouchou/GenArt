import p5Types from "p5";
import { Polygon } from "./shapes";

export function draw_polygon(p5: p5Types, polygon: Polygon) {
  p5.beginShape();
  polygon.forEach(coord => {
    p5.vertex(coord[0], coord[1]);
  });
  p5.endShape("close");
}