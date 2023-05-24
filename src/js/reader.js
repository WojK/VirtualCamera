import { points3d, lines, polygons, canvasHandler, camera } from "./app.js";
import { addPoint, addLine, addPolygon } from "./utils.js";

let reader = new FileReader();

reader.onload = function (event) {
  points3d.clear();
  lines.clear();
  polygons.length = 0;

  let content = event.target.result;
  var arr = content.split("\r\n");

  for (let i = 0; i < arr.length; i++) {
    const data = arr[i].split(" ");
    if (data[0] === "#") {
      continue;
    }
    if (data[0] === "Point") {
      let index = data[1];
      let x = parseFloat(data[2]);
      let y = parseFloat(data[3]);
      let z = parseFloat(data[4]);
      addPoint(index, x, y, z, points3d);
    }

    if (data[0] === "Line") {
      const lineIndex = data[1];
      let p1Index = data[2];
      let p2Index = data[3];
      let color = data[4];
      addLine(p1Index, p2Index, lineIndex, color, points3d, lines);
    }

    if (data[0] === "Polygon") {
      const indexesOfPoints = data.slice(1, data.length - 1);
      const color = data[data.length - 1];
      addPolygon(indexesOfPoints, color, points3d, polygons);
    }
  }
  canvasHandler.drawLinesFromMap(lines, camera.focalLength);
};

function readFile() {
  let file = document.getElementById("inputFile").files[0];
  reader.readAsText(file);
}

const input = document.getElementById("inputFile");
input.onchange = readFile;
