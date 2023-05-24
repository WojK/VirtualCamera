import { compare } from "./Painter.js";
import {
  bblSort,
  transform3dLineTo2dCoordinates,
  transformCoordinates3dTo2d,
} from "./utils.js";

class CanvasHandler {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 1.5;
  }

  draw3dLine(line3d, focalLength) {
    const { p1, p2 } = transform3dLineTo2dCoordinates(
      line3d,
      focalLength,
      this.canvas
    );
    this.ctx.beginPath();
    this.ctx.moveTo(p1.x1, p1.y1);
    this.ctx.lineTo(p2.x2, p2.y2);
    this.ctx.stroke();
  }

  drawLinesFromMap(linesMap, focalLength) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    linesMap.forEach((line, key) => {
      this.ctx.strokeStyle = line.color;
      this.draw3dLine(line, focalLength);
    });
  }

  drawPolygon(polygon, focalLength) {
    const points = polygon.points;

    let [x, y] = transformCoordinates3dTo2d(
      points[0],
      focalLength,
      this.canvas
    );
    this.ctx.fillStyle = polygon.color;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    for (let i = 1; i < points.length; i++) {
      [x, y] = transformCoordinates3dTo2d(points[i], focalLength, this.canvas);
      this.ctx.lineTo(x, y);
    }
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill();
  }

  drawPolygonsFromArray(polygonsArr, focalLength) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    bblSort(polygonsArr, compare);
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 1;
    for (let i = 0; i < polygonsArr.length; i++) {
      this.drawPolygon(polygonsArr[i], focalLength);
    }
  }
}

export default CanvasHandler;
