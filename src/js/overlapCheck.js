import { camera, canvas } from "./app.js";
import { transformCoordinates3dTo2d } from "./utils.js";

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class line {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }
}

function onLine(l1, p) {
  if (
    p.x <= Math.max(l1.p1.x, l1.p2.x) &&
    p.x <= Math.min(l1.p1.x, l1.p2.x) &&
    p.y <= Math.max(l1.p1.y, l1.p2.y) &&
    p.y <= Math.min(l1.p1.y, l1.p2.y)
  )
    return true;

  return false;
}

function direction(a, b, c) {
  let val = (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);

  if (val == 0) return 0;
  else if (val < 0) return 2;

  return 1;
}

function isIntersect(l1, l2) {
  let dir1 = direction(l1.p1, l1.p2, l2.p1);
  let dir2 = direction(l1.p1, l1.p2, l2.p2);
  let dir3 = direction(l2.p1, l2.p2, l1.p1);
  let dir4 = direction(l2.p1, l2.p2, l1.p2);

  if (dir1 != dir2 && dir3 != dir4) return true;

  if (dir1 == 0 && onLine(l1, l2.p1)) return true;

  if (dir2 == 0 && onLine(l1, l2.p2)) return true;

  if (dir3 == 0 && onLine(l2, l1.p1)) return true;

  if (dir4 == 0 && onLine(l2, l1.p2)) return true;

  return false;
}

function checkInside(poly, n, p) {
  if (n < 3) return false;
  let tmp = new Point(9999, p.y);
  let exline = new line(p, tmp);
  let count = 0;
  let i = 0;
  do {
    let side = new line(poly[i], poly[(i + 1) % n]);
    if (isIntersect(side, exline)) {
      if (direction(side.p1, p, side.p2) == 0) return onLine(side, p);
      count++;
    }
    i = (i + 1) % n;
  } while (i != 0);

  return count & 1;
}

export function CheckIfPolygonsOverlapInCanvas(P, Q) {
  const pointsP = P.points.map((p) => {
    const [x, y] = transformCoordinates3dTo2d(p, camera.focalLength, canvas);
    return new Point(x, y);
  });
  const pointsQ = Q.points.map((p) => {
    const [x, y] = transformCoordinates3dTo2d(p, camera.focalLength, canvas);
    return new Point(x, y);
  });

  for (let p of pointsP) {
    let ifInside = checkInside(pointsQ, pointsQ.length, p);
    if (ifInside) {
      return true;
    }
  }
  return false;
}

function isCollide(rect1, rect2) {
  if (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.height + rect1.y > rect2.y
  ) {
    return true;
  } else {
    return false;
  }
}

export function CheckIfPolygonsOverlapInCanvas2(P, Q) {
  const pointsP = P.points.map((p) => {
    const [x, y] = transformCoordinates3dTo2d(p, camera.focalLength, canvas);
    return new Point(x, y);
  });
  let x_minP = Math.min(
    ...pointsP.map((p) => {
      return p.x;
    })
  );
  let x_maxP = Math.max(
    ...pointsP.map((p) => {
      return p.x;
    })
  );
  let y_minP = Math.min(
    ...pointsP.map((p) => {
      return p.y;
    })
  );
  let y_maxP = Math.max(
    ...pointsP.map((p) => {
      return p.y;
    })
  );

  const pointsQ = Q.points.map((p) => {
    const [x, y] = transformCoordinates3dTo2d(p, camera.focalLength, canvas);
    return new Point(x, y);
  });

  let x_minQ = Math.min(
    ...pointsQ.map((p) => {
      return p.x;
    })
  );
  let x_maxQ = Math.max(
    ...pointsQ.map((p) => {
      return p.x;
    })
  );
  let y_minQ = Math.min(
    ...pointsQ.map((p) => {
      return p.y;
    })
  );
  let y_maxQ = Math.max(
    ...pointsQ.map((p) => {
      return p.y;
    })
  );

  let a = {
    y: y_maxP,
    x: x_minP,
    height: Math.abs(y_maxP - y_minP),
    width: Math.abs(x_maxP - x_minP),
  };
  let b = {
    y: y_maxQ,
    x: x_minQ,
    height: Math.abs(y_maxQ - y_minQ),
    width: Math.abs(x_maxQ - x_minQ),
  };

  return isCollide(a, b);
}
