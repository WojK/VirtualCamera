import CanvasHandler from "./CanvasHandler.js";
import Camera from "./Camera.js";
import "./reader.js";
import "./Painter.js";

export let Mode = "Lines";
const changeModeBtn = document.getElementById("change-mode-btn");
changeModeBtn.onclick = function () {
  if (Mode === "Polygons") {
    Mode = "Lines";
    canvasHandler.drawLinesFromMap(lines, camera.focalLength);
  } else if (Mode === "Lines") {
    Mode = "Polygons";
    canvasHandler.drawPolygonsFromArray(polygons, camera.focalLength);
  }
};

export const points3d = new Map();
export const lines = new Map();
export let polygons = new Array();

export const canvas = document.getElementById("canvas");
export const camera = new Camera(points3d, 200, 2, 0.5, 2);

export const canvasHandler = new CanvasHandler(canvas);
