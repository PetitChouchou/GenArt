import p5Types from "p5";
import { Polygon } from "./shapes";

export function draw_polygon(p5: p5Types, polygon: Polygon) {
  p5.beginShape();
  polygon.forEach(coord => {
    p5.vertex(coord[0], coord[1]);
  });
  p5.endShape("close");
}

export function generate_regular_ngon(p5: p5Types, n: number, cx: number, cy: number, r: number): Polygon {
  let polygon: Polygon = [];
  for (let i = 0; i < n; i++) {
    let theta_i = 2 * p5.PI * (i / n);
    // Put even polygons "flat" on the bottom, and rotate odd polygons so that their
    // point goes upwards
    if (n % 2 == 1) {
      theta_i -= .5 * p5.PI;
    }
    let x_i = cx + r * p5.cos(theta_i);
    let y_i = cy + r * p5.sin(theta_i);

    polygon.push([x_i, y_i]);
  }

  return polygon;
}