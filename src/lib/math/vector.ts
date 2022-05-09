import type { Vector3, Matrix4, Euler, Quaternion } from "./primitives";

const M_PI = Math.PI;

export function add(v0: Vector3, v1: Vector3): Vector3 {
  return { x: v0.x + v1.x, y: v0.y + v1.y, z: v0.z + v1.z };
}

export function sub(v0: Vector3, v1: Vector3): Vector3 {
  return { x: v0.x - v1.x, y: v0.y - v1.y, z: v0.z - v1.z };
}

export function divide(vec3: Vector3): Vector3 {
  return vec3;
}

export function divideScalar(vec3: Vector3, scalar: number): Vector3 {
  return vec3;
}

export function multiply(vec3: Vector3): Vector3 {
  return vec3;
}

export function multiplyScalar(vec3: Vector3, scalar: number): Vector3 {
  return vec3;
}

export function mag(vec3: Vector3) {}
export function normalize(vec3: Vector3) {}
export function dot(v0: Vector3, v1: Vector3) {}
export function cross(v0: Vector3, v1: Vector3) {}

export function applyMatrix(vec3: Vector3, mat4: Matrix4): Vector3 {
  return vec3;
}
export function applyEuler(vec3: Vector3, euler: Euler) {}
export function applyQuaternion(vec3: Vector3, quad: Quaternion) {}

export function distanceTo(v0: Vector3, v1: Vector3) {}
export function angleBetween(v0: Vector3, v1: Vector3) {}

export function radToDeg(radians: number): number {
  return (radians / M_PI) * 180;
}
export function degToRad(degree: number): number {
  return (degree / 180) * M_PI;
}
