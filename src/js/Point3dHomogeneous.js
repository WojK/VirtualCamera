class Point3dHomogeneous {
  w = 1;
  constructor(id, x, y, z) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.z = z;
  }

  normalizePoint() {
    if (this.w == 0 || this.w == 1) return;
    this.x = this.x / this.w;
    this.y = this.y / this.w;
    this.z = this.z / this.w;
    this.w = this.w / this.w;
  }
}

export default Point3dHomogeneous;
