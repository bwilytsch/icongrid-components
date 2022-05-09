import type { Vector2 } from "../math/primitives";

export type ColliderType =
  | "BaseCollider"
  | "BoxCollider"
  | "PointCollider"
  | "LineCollider"
  | "CircleCollider"
  | "PolygonCollider";

export type ColliderHit = {
  collision: boolean;
  intersections: Vector2[]; // This might be only applicable for LineColliders and PointColliders, so leave this array empty
};

export type BaseColliderProperties = {
  colliderType: ColliderType;
};

export type PointColliderProperties = {
  x: number;
  y: number;
} & BaseColliderProperties;

export type CircleColliderProperties = {
  x: number;
  y: number;
  radius: number;
} & BaseColliderProperties;

export type BoxColliderProperties = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
} & BaseColliderProperties;

export type LineColliderProperties = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
} & BaseColliderProperties;

export type PolygonColliderProperties = {
  vertices: Vector2[];
} & BaseColliderProperties;
