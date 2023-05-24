import { degrees_to_radians, multiplyMatrices } from "./utils.js";
import { lines, polygons } from "./app.js";
import { canvasHandler } from "./app.js";
import { Mode } from "./app.js";

class Camera {
  constructor(points3d, focalLength, translationStep, angle, zoom) {
    this.points3d = points3d;
    this.focalLength = focalLength;
    this.translationStep = translationStep;
    this.angle = angle;
    this.zoom = zoom;
    this.setUp();
  }

  setUp() {
    window.addEventListener("keydown", (event) => {
      if (event.defaultPrevented) {
        return;
      }
      if (event.code === "ArrowDown") {
        this.rotatePointsOX(this.angle, this.points3d);
        this.drawScene();
      } else if (event.code === "ArrowUp") {
        this.rotatePointsOX(-this.angle, this.points3d);
        this.drawScene();
      } else if (event.code === "ArrowRight") {
        this.rotatePointsOZ(this.angle, this.points3d);
        this.drawScene();
      } else if (event.code === "ArrowLeft") {
        this.rotatePointsOZ(-this.angle, this.points3d);
        this.drawScene();
      } else if (event.code === "KeyE") {
        this.translatePoints(0, 0, -this.translationStep, this.points3d);
        this.drawScene();
      } else if (event.code === "KeyA") {
        this.translatePoints(this.translationStep, 0, 0, this.points3d);
        this.drawScene();
      } else if (event.code === "KeyS") {
        this.translatePoints(0, this.translationStep, 0, this.points3d);
        this.drawScene();
      } else if (event.code === "KeyD") {
        this.translatePoints(-this.translationStep, 0, 0, this.points3d);
        this.drawScene();
      } else if (event.code === "KeyW") {
        this.translatePoints(0, -this.translationStep, 0, this.points3d);
        this.drawScene();
      } else if (event.code === "KeyR") {
        this.translatePoints(0, 0, this.translationStep, this.points3d);
        this.drawScene();
      } else if (event.code === "KeyZ") {
        this.zoomF(this.zoom, this.points3d);
        this.drawScene();
      } else if (event.code === "KeyX") {
        this.zoomF(-this.zoom, this.points3d);
        this.drawScene();
      }
      event.preventDefault();
    });
  }

  drawScene() {
    if (Mode === "Lines") {
      canvasHandler.drawLinesFromMap(lines, this.focalLength);
    } else if (Mode === "Polygons") {
      canvasHandler.drawPolygonsFromArray(polygons, this.focalLength);
    }
  }

  rotatePointsOX(angle, points3d) {
    angle = degrees_to_radians(angle);
    let rotationMatrix = [
      [1, 0, 0, 0],
      [0, Math.cos(angle), -Math.sin(angle), 0],
      [0, Math.sin(angle), Math.cos(angle), 0],
      [0, 0, 0, 1],
    ];
    points3d.forEach((point, key) => {
      const p = [[point.x], [point.y], [point.z], [point.w]];
      const result = multiplyMatrices(rotationMatrix, p);
      point.x = result[0];
      point.y = result[1];
      point.z = result[2];
      point.w = result[3];
      point.normalizePoint();
    });
  }

  rotatePointsOY(angle, points3d) {
    angle = degrees_to_radians(angle);

    let rotationMatrix = [
      [Math.cos(angle), 0, Math.sin(angle), 0],
      [0, 1, 0, 0],
      [-Math.sin(angle), 0, Math.cos(angle), 0],
      [0, 0, 0, 1],
    ];
    points3d.forEach((point, key) => {
      const p = [[point.x], [point.y], [point.z], [point.w]];
      const result = multiplyMatrices(rotationMatrix, p);
      point.x = result[0];
      point.y = result[1];
      point.z = result[2];
      point.w = result[3];
      point.normalizePoint();
    });
  }

  rotatePointsOZ(angle, points3d) {
    angle = degrees_to_radians(angle);

    let rotationMatrix = [
      [Math.cos(angle), -Math.sin(angle), 0, 0],
      [Math.sin(angle), Math.cos(angle), 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ];
    points3d.forEach((point, key) => {
      const p = [[point.x], [point.y], [point.z], [point.w]];
      const result = multiplyMatrices(rotationMatrix, p);
      point.x = result[0];
      point.y = result[1];
      point.z = result[2];
      point.w = result[3];
      point.normalizePoint();
    });
  }

  translatePoints(Tx, Ty, Tz, points3d) {
    let translationMatrix = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ];

    translationMatrix[0][3] = Tx;
    translationMatrix[1][3] = Ty;
    translationMatrix[2][3] = Tz;

    points3d.forEach((point, key) => {
      const p = [[point.x], [point.y], [point.z], [point.w]];
      const result = multiplyMatrices(translationMatrix, p);
      point.x = result[0];
      point.y = result[1];
      point.z = result[2];
      point.w = result[3];
      point.normalizePoint();
    });
  }

  zoomF(zoom) {
    this.focalLength += zoom;
  }
}

export default Camera;
