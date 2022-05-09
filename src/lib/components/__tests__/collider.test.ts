import {
  rectangleInRectangle,
  rectangleInPolygon,
  polygonInPolygon,
  lineThroughCircle,
  lineThroughLine,
  lineThroughRectangle,
  lineThroughPolygone,
  pointInPoint,
  pointInCircle,
  pointInRectangle,
  pointInPolygon,
  pointOnLine,
  circleInCircle,
  circleInRectangle,
  circleInPolygon
} from "../collider";

describe("Collision", () => {
  it("Detects point in point collision", () => {
    const succeed = pointInPoint(24, 24, 24, 24);

    expect(succeed.collision).toBeTruthy();

    const failed = pointInPoint(32, 24, 12, 58);

    expect(failed.collision).toBeFalsy();
  });

  it("Detects point in circle collision", () => {
    const succeed = pointInCircle(24, 24, 56, 56, 120);

    expect(succeed.collision).toBeTruthy();

    const failed = pointInCircle(24, 24, 320, 320, 120);

    expect(failed.collision).toBeFalsy();
  });

  it("Detects point in rectangle", () => {
    const succeed = pointInRectangle(80, 80, 56, 56, 120, 120);

    expect(succeed.collision).toBeTruthy();

    const failed = pointInRectangle(24, 24, 320, 320, 120, 120);

    expect(failed.collision).toBeFalsy();
  });

  it("Detects point in polygon", () => {
    const succeed = pointInPolygon(120, 120, [
      [24, 24],
      [240, 240],
      [240, 480],
      [24, 320]
    ]);
    const failed = pointInPolygon(120, 120, [
      [140, 140],
      [240, 240],
      [240, 480],
      [140, 320]
    ]);
  });

  it("Detect point on line", () => {
    const succeed = pointOnLine(24, 120, 0, 120, 240, 120);

    expect(succeed.collision).toBeTruthy();

    const failed = pointOnLine(560, 120, 0, 120, 240, 120);

    expect(failed.collision).toBeFalsy();
  });
});
