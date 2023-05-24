class Polygon {
  constructor(color) {
    this.points = new Array();
    this.color = color;
  }

  addPoint(point) {
    this.points.push(point);
  }
}

export default Polygon;
