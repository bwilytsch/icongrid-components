export type Vector2 = { type: "Vector2"; x: number; y: number };
export type Vector3 = { type: "Vector3"; x: number; y: number; z: number };

export type Quaternion = {
  type: "Quaternion";
  x: number;
  y: number;
  z: number;
  w: number;
};

export type EulerOrder = "XYZ" | "YZX" | "XZY" | "XZY" | "YXZ" | "ZYX";
export type Euler = {
  type: "Euler";
  x: number;
  y: number;
  z: number;
  order: EulerOrder;
};

export type QuadraticBezierCurve = {
  type: "QuadraticBezierCurve";
  startPoint: Vector2;
  controlPointOne: Vector2;
  endPoint: Vector2;
};
export type CubicBezierCurve = {
  type: "CubicBezierCurve";
  startPoint: Vector2;
  controlPointOne: Vector2;
  controlPointTwo: Vector2;
  endPoint: Vector2;
};

export type Matrix3 = {
  type: "Matrix3";
  elements: [
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
};

export type Matrix4 = {
  type: "Matrix4";
  elements: [
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
};
