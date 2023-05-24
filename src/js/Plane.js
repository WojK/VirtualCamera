class Plane {
  constructor(point3d1, point3d2, point3d3) {
    let x1 = point3d1.x;
    let y1 = point3d1.y;
    let z1 = point3d1.z;

    let x2 = point3d2.x;
    let y2 = point3d2.y;
    let z2 = point3d2.z;

    let x3 = point3d3.x;
    let y3 = point3d3.y;
    let z3 = point3d3.z;

    let [A, B, C, D] = this.equation_plane(x1, y1, z1, x2, y2, z2, x3, y3, z3);

    this.A = A;
    this.B = B;
    this.C = C;
    this.D = D;
  }

  equation_plane(x1, y1, z1, x2, y2, z2, x3, y3, z3) {
    let a1 = x2 - x1;
    let b1 = y2 - y1;
    let c1 = z2 - z1;
    let a2 = x3 - x1;
    let b2 = y3 - y1;
    let c2 = z3 - z1;
    let a = b1 * c2 - b2 * c1;
    let b = a2 * c1 - a1 * c2;
    let c = a1 * b2 - b1 * a2;
    let d = -a * x1 - b * y1 - c * z1;

    return [a, b, c, d];
  }
}

export default Plane;
