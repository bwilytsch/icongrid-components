export type Vector2 = [number, number];
export type Vector3 = [number, number, number];
export type Matrix4 = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];

const MPI = Math.PI;

export function add(v0: Vector2, v1: Vector2): Vector2 {
  return [v0[0] + v1[0], v0[1] + v1[1]];
}

export function sub(v0: Vector2, v1: Vector2): Vector2 {
  return [v0[0] - v1[0], v0[1] - v1[1]];
}

export function mul(v0: Vector2, v1: Vector2): Vector2 {
  return [v0[0] * v1[0], v0[1] * v1[1]];
}

export function div(v0: Vector2, v1: Vector2): Vector2 {
  const [x0, y0] = v0;
  const [x1, y1] = v1;

  const x = x1 === 0 ? 0 : x0 / x1;
  const y = y1 === 0 ? 0 : y0 / y1;

  return [x, y];
}

export function magnitude(v0: Vector2): number {
  const [x, y] = v0;
  return Math.sqrt(x * x + y * y);
}

export function normalize(v0: Vector2): Vector2 {
  const [x, y] = v0;
  const mag = magnitude(v0);

  if (mag === 0) {
    return [0, 0];
  }

  return [x / mag, y / mag];
}

/**
 * Dot product between two Vector2
 * @param v0
 * @param v1
 */
export function dot(v0: Vector2, v1: Vector2): number {
  const [x0, y0] = v0;
  const [x1, y1] = v1;

  return x0 * x1 + y0 * y1;
}

/**
 * Cross product between two Vector2
 * @param v0
 * @param v1
 */
export function cross(v0: Vector2, v1: Vector2): number {
  const [x0, y0] = v0;
  const [x1, y1] = v1;

  return x0 * y0 - x1 * y1;
}

/**
 * Calculates the distance between two Vector2
 * @param from Vector2
 * @param to Vector2
 */
export function distanceTo(from: Vector2, to: Vector2): number {
  return magnitude(sub(from, to));
}

/**
 * Calculates the angle between two Vector2 in radians
 * @param v0
 * @param v1
 */
export function angleBetween(v0: Vector2, v1: Vector2): number {
  const [x0, y0] = v0;
  const [x1, y1] = v1;
  return Math.acos(
    (x0 * x1 + y0 * y1) /
      Math.sqrt(x0 * x0 + y0 * y0) /
      Math.sqrt(x1 * x1 + y1 * y1)
  );
}

export function radToDeg(radians: number): number {
  return (radians / MPI) * 180;
}

export function degToRad(degree: number): number {
  return (degree / 180) * MPI;
}
