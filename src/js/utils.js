import Line3D from "./Line3D.js";
import Point3dHomogeneous from "./Point3dHomogeneous.js";
import Polygon from "./Polygon.js";

export function transformCoordinates3dTo2d(point3d, focalLength, canvas) {
  let from_focal;
  if (point3d.y !== 0) {
    from_focal = focalLength / point3d.y;
  } else {
    from_focal = 1;
  }
  const x2d = point3d.x * from_focal + canvas.width / 2;
  const y2d = canvas.height / 2 - from_focal * point3d.z;
  return [x2d, y2d];
}

export function transform3dLineTo2dCoordinates(line3d, focalLength, canvas) {
  const [x1, y1] = transformCoordinates3dTo2d(line3d.p1, focalLength, canvas);
  const [x2, y2] = transformCoordinates3dTo2d(line3d.p2, focalLength, canvas);
  return { p1: { x1, y1 }, p2: { x2, y2 } };
}

export function multiplyMatrices(m1, m2) {
  let result = [];
  for (let i = 0; i < m1.length; i++) {
    result[i] = [];
    for (let j = 0; j < m2[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < m1[0].length; k++) {
        sum += m1[i][k] * m2[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}

export function addPoint(index, x, y, z, points) {
  let point = new Point3dHomogeneous(index, x, y, z);
  points.set(index, point);
}

export function addLine(
  pointIndex1,
  pointIndex2,
  lineIndex,
  color,
  points,
  lines
) {
  let p1 = points.get(pointIndex1);
  let p2 = points.get(pointIndex2);
  const line = new Line3D(p1, p2, color);
  lines.set(lineIndex, line);
}

export function addPolygon(pointsIndexes, color, points, polygons) {
  const polygon = new Polygon(color);
  for (let i = 0; i < pointsIndexes.length; i++) {
    let point = points.get(pointsIndexes[i]);
    polygon.addPoint(point);
  }

  polygons.push(polygon);
}

export function degrees_to_radians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

export function bblSort(arr, compare) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      if (compare(arr[j], arr[j + 1]) >= 0) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}
export function findLinePlaneIntersectionCoords(
  px,
  py,
  pz,
  qx,
  qy,
  qz,
  a,
  b,
  c,
  d
) {
  let tDenom = a * (qx - px) + b * (qy - py) + c * (qz - pz);
  if (tDenom == 0) return null;

  let t = -(a * px + b * py + c * pz + d) / tDenom;

  return {
    x: px + t * (qx - px),
    y: py + t * (qy - py),
    z: pz + t * (qz - pz),
  };
}
