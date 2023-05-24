import Plane from "./Plane.js";
import {
  CheckIfPolygonsOverlapInCanvas,
  CheckIfPolygonsOverlapInCanvas2,
} from "./overlapCheck.js";
import { findLinePlaneIntersectionCoords } from "./utils.js";

function CheckIfPointIsInFrontOfPlane(plane, point3d) {
  const r =
    plane.A * point3d.x + plane.B * point3d.y + plane.C * point3d.z + plane.D;

  if (r >= 0) {
    return true;
  }
  return false;
}
export function CheckIfQIsInFrontOfP(P, Q) {
  const pointsFromP = P.points;
  const plane = new Plane(pointsFromP[0], pointsFromP[1], pointsFromP[2]);
  const result = CheckIfPolygonIsInFrontOfPlane(plane, Q);
  return result;
}

function CheckIfPolygonIsInFrontOfPlane(plane, polygon) {
  for (let p of polygon.points) {
    const result = CheckIfPointIsInFrontOfPlane(plane, p);
    if (result === false) {
      return false;
    }
  }
  return true;
}

function CheckIfPointIsBehindPlane(plane, point3d) {
  let coordsIntersection = findLinePlaneIntersectionCoords(
    0,
    0,
    0,
    point3d.x,
    point3d.y,
    point3d.z,
    plane.A,
    plane.B,
    plane.C,
    plane.D
  );
  if (coordsIntersection == null || coordsIntersection.y < 0) {
    return false;
  }
  let { x, y, z } = coordsIntersection;

  const lengthToPoint3d = Math.pow(
    Math.pow(point3d.x, 2) + Math.pow(point3d.y, 2) + Math.pow(point3d.z, 2),
    0.5
  );

  const lengthToPlaneIntersection = Math.pow(
    Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2),
    0.5
  );

  let r = lengthToPoint3d - lengthToPlaneIntersection;
  r = parseFloat(r.toFixed(5));
  if (r >= 0) {
    return true;
  }
  return false;
}

function CheckIfPolygonIsBehindPlane(plane, polygon) {
  for (let p of polygon.points) {
    const result = CheckIfPointIsBehindPlane(plane, p);
    if (result === false) {
      return false;
    }
  }
  return true;
}

function CheckIfPIsBehindQ(P, Q) {
  const pointsFromQ = Q.points;
  const plane = new Plane(pointsFromQ[0], pointsFromQ[1], pointsFromQ[2]);
  const result = CheckIfPolygonIsBehindPlane(plane, P);
  return result;
}

export function compare(P, Q) {
  const ifOverlapPQ = CheckIfPolygonsOverlapInCanvas(P, Q);
  const ifOverlapQP = CheckIfPolygonsOverlapInCanvas(Q, P);
  const ifOverlap2 = CheckIfPolygonsOverlapInCanvas2(P, Q);

  if (ifOverlapPQ === false && ifOverlapQP == false && ifOverlap2 === false) {
    return 0;
  }

  const isPBehindQ = CheckIfPIsBehindQ(P, Q);

  if (isPBehindQ === true) {
    return -1;
  }
  return 1;
}
