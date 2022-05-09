import {
  dot,
  cross,
  magnitude,
  normalize,
  mul,
  div,
  distanceTo,
  angleBetween,
  add,
  sub,
  degToRad,
  radToDeg,
  Vector2
} from "../../math";

describe("Math Functions", () => {
  it("Adds two Vector2 together", () => {
    const v0: Vector2 = [5, 1];
    const v1: Vector2 = [1, 7];

    expect(add(v0, v1)).toEqual([6, 8]);
  });

  it("Subtracts two Vector2 from each other", () => {
    const v0: Vector2 = [5, 1];
    const v1: Vector2 = [1, 7];

    expect(sub(v0, v1)).toEqual([4, -6]);
  });

  it("Multiplies two Vector2", () => {
    const v0: Vector2 = [5, 0];
    const v1: Vector2 = [1, 7];

    expect(mul(v0, v1)).toEqual([5, 0]);
  });

  it("Divides two Vector2", () => {
    const v0: Vector2 = [5, 3];
    const v1: Vector2 = [1, 2];

    expect(div(v0, v1)).toEqual([5, 1.5]);
  });

  it("Calculates the magnitude of a Vector2", () => {
    const v0: Vector2 = [5, 0];

    expect(magnitude(v0)).toBe(5);
  });

  it("Normalizes a Vector2", () => {
    const v0: Vector2 = [5, 5];

    expect(normalize(v0)).toEqual([0.7071067811865475, 0.7071067811865475]);
  });

  it("It doesnt divide by zero", () => {
    const v0: Vector2 = [5, 3];
    const v1: Vector2 = [0, 0];

    expect(div(v0, v1)).toEqual([0, 0]);
  });

  it("Calculates the cross product of two Vector2", () => {
    const v0: Vector2 = [5, 3];
    const v1: Vector2 = [3, 4];

    expect(cross(v0, v1)).toEqual(3);
  });

  it("Calculates the dot product", () => {
    const v0: Vector2 = [1, 0];
    const v1: Vector2 = [0, 1];

    expect(dot(v0, v1)).toEqual(0);

    const v2: Vector2 = [1, 0];
    const v3: Vector2 = [1, 0];

    expect(dot(v2, v3)).toEqual(1);
  });

  it("Distance between two Vector2", () => {
    const v0: Vector2 = [1, 0];
    const v1: Vector2 = [-1, 0];

    expect(distanceTo(v0, v1)).toEqual(2);
  });

  it("Calculates radians from degrees", () => {
    expect(degToRad(90)).toBe(Math.PI / 2);
  });

  it("Calculates degree from radians", () => {
    expect(radToDeg(Math.PI)).toBe(180);
  });

  it("Angle between two Vector2", () => {
    const v0: Vector2 = [1, 0];
    const v1: Vector2 = [0, 1];

    expect(angleBetween(v0, v1)).toEqual(degToRad(90));
  });
});
