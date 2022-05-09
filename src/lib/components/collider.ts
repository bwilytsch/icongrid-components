import type {
  ColliderHit,
  BaseColliderProperties,
  PointColliderProperties,
  CircleColliderProperties,
  BoxColliderProperties,
  LineColliderProperties,
  PolygonColliderProperties
} from "./collider.d";
import { Component } from "./component";
import { distanceTo, normalize, sub, mul, Vector2 } from "../math";
import { getProperty } from "../utils";

/**
 * Currently between between points, should this be objects or abstracted
 */

/**
 * [ ] Abstract re-usable algorithms
 * [ ] Write all algorithms
 * [ ] Write tests for all algorithms
 */
export function rectangleInRectangle() {}
export function rectangleInPolygon() {}

export function lineThroughCircle() {}
export function lineThroughLine() {}
export function lineThroughRectangle() {}
export function lineThroughPolygone() {}

export function pointInPoint(
  x0: number,
  y0: number,
  x1: number,
  y1: number
): ColliderHit {
  const hit: ColliderHit = {
    collision: false,
    intersections: []
  };

  if (x0 === x1 && y0 === y1) {
    hit.intersections.push([x0, y0]);
    hit.collision = true;
  }

  return hit;
}
export function pointInCircle(
  x1: number,
  y1: number,
  cx: number,
  cy: number,
  radius: number
): ColliderHit {
  const hit: ColliderHit = {
    collision: false,
    intersections: []
  };

  const p0: Vector2 = [cx, cy];
  const p1: Vector2 = [x1, y1];

  const dist = distanceTo(p0, p1);

  if (dist <= radius) {
    const dir = sub(p1, p0);
    const nDir = normalize(dir);

    hit.intersections.push(mul(nDir, [dist, dist]));
    hit.collision = true;
  }

  return hit;
}
export function pointInRectangle(
  x0: number,
  y0: number,
  minX: number,
  minY: number,
  maxX: number,
  maxY: number
): ColliderHit {
  const hit: ColliderHit = {
    collision: false,
    intersections: []
  };

  if (x0 > minX && y0 > minY && x0 < maxX && y0 < maxY) {
    hit.intersections.push([x0, y0]);
    hit.collision = true;
  }

  return hit;
}
export function pointInPolygon(
  x0: number,
  y0: number,
  vertices: Vector2[]
): ColliderHit {
  const hit: ColliderHit = {
    collision: false,
    intersections: []
  };

  // Detection code goes here

  return hit;
}

export function pointOnLine(
  x0: number,
  y0: number,
  startX: number,
  startY: number,
  endX: number,
  endY: number
): ColliderHit {
  const hit: ColliderHit = {
    collision: false,
    intersections: []
  };

  // Detection code goes here

  return hit;
}

export function polygonInPolygon() {}

export function circleInCircle() {}
export function circleInRectangle() {}
export function circleInPolygon() {}

interface ColliderStrategy<T> {
  collide: (c0: Collider<T>, c1: Collider<T>) => ColliderHit;
}

class PointColliderStrategy
  implements ColliderStrategy<PointColliderProperties> {
  public collide(
    c0: Collider<PointColliderProperties>,
    c1: Collider<any>
  ): ColliderHit {
    switch (getProperty(c1, "colliderType")) {
      case "PointCollider":
        return pointInPoint(
          getProperty(c0, "x"),
          getProperty(c0, "y"),
          getProperty(c1, "x"),
          getProperty(c1, "y")
        );
      case "CircleCollider":
        return pointInCircle(
          getProperty(c0, "x"),
          getProperty(c0, "y"),
          getProperty(c1, "x"),
          getProperty(c1, "y"),
          getProperty(c1, "radius")
        );
      case "BoxCollider":
        return pointInRectangle(
          getProperty(c0, "x"),
          getProperty(c0, "y"),
          getProperty(c1, "minX"),
          getProperty(c1, "minY"),
          getProperty(c1, "maxX"),
          getProperty(c1, "maxY")
        );
      case "LineCollider":
        return pointOnLine(
          getProperty(c0, "x"),
          getProperty(c0, "y"),
          getProperty(c1, "startX"),
          getProperty(c1, "startY"),
          getProperty(c1, "endX"),
          getProperty(c1, "endY")
        );
      case "PolygonCollider":
        return pointInPolygon(getProperty(c0, "x"), getProperty(c0, "y"), []);
      default:
        return { collision: false, intersections: [] };
    }
  }
}

const pointColliderDefautlProps: PointColliderProperties = {
  x: 0,
  y: 0,
  colliderType: "PointCollider"
};

export class Collider<T> extends Component<T> {
  private _strategy: ColliderStrategy<T> = {
    collide: (c0: Collider<T>, c1: Collider<T>): ColliderHit => {
      return {
        intersections: [],
        collision: false
      };
    }
  };

  constructor() {
    super();
    this.setType("Collider");
  }

  get strategy() {
    return this._strategy;
  }

  setProperties(properties?: T): Collider<T> {
    return this;
  }

  setStrategy(strategy: ColliderStrategy<T>): Collider<T> {
    this._strategy = strategy;
    return this;
  }
  public collide(col: Collider<T>): ColliderHit {
    return this.strategy.collide(this, col);
  }
}

export function ColliderFactory() {
  return {
    pointCollider(properties?: Partial<PointColliderProperties>) {
      const props: PointColliderProperties = Object.assign(
        {},
        pointColliderDefautlProps,
        properties
      );

      return new Collider<PointColliderProperties>()
        .setStrategy(new PointColliderStrategy())
        .setProperties(props);
    }
  };
}

const pcf = ColliderFactory().pointCollider();

console.log(pcf);

export class PointCollider extends Collider {
  constructor(properties?: Partial<PointColliderProperties>) {
    super();
    this.setProperties(
      Object.assign(
        {},
        { x: 0, y: 0, colliderType: "PointCollider" },
        properties
      )
    );
  }
  collide(col: Collider<any>): ColliderHit {
    switch (getProperty(col, "colliderType")) {
      case "PointCollider":
        return pointInPoint(
          getProperty(this, "x"),
          getProperty(this, "y"),
          getProperty(col, "x"),
          getProperty(col, "y")
        );
      case "CircleCollider":
        return pointInCircle(
          getProperty(this, "x"),
          getProperty(this, "y"),
          getProperty(col, "x"),
          getProperty(col, "y"),
          getProperty(col, "radius")
        );
      case "BoxCollider":
        return pointInRectangle(
          getProperty(this, "x"),
          getProperty(this, "y"),
          getProperty(col, "minX"),
          getProperty(col, "minY"),
          getProperty(col, "maxX"),
          getProperty(col, "maxY")
        );
      case "LineCollider":
        return pointOnLine(
          getProperty(this, "x"),
          getProperty(this, "y"),
          getProperty(col, "startX"),
          getProperty(col, "startY"),
          getProperty(col, "endX"),
          getProperty(col, "endY")
        );
      case "PolygonCollider":
        return pointInPolygon(
          getProperty(this, "x"),
          getProperty(this, "y"),
          []
        );
      default:
        return { collision: false, intersections: [] };
    }
  }
}

export class CircleCollider extends Collider {
  public properties: CircleColliderProperties = {
    x: 0,
    y: 0,
    radius: 1,
    colliderType: "CircleCollider"
  };
  constructor(properties?: Partial<CircleColliderProperties>) {
    super();
    this.setProperties(properties);
  }
  collide(col: Collider): ColliderHit {
    switch (getProperty(this, "colliderType")) {
      case "PointCollider":
        return pointInCircle(
          getProperty(this, "x"),
          getProperty(this, "y"),
          getProperty(col, "x"),
          getProperty(col, "y"),
          getProperty(col, "radius")
        );
      default:
        return { collision: false, intersections: [] };
    }
  }
}

export class BoxCollider extends Collider<BoxColliderProperties> {
  public properties: BoxColliderProperties = {
    minX: Infinity,
    minY: Infinity,
    maxX: -Infinity,
    maxY: -Infinity,
    colliderType: "BoxCollider"
  };
  constructor(properties?: Partial<BoxColliderProperties>) {
    super();
    this.setProperties(properties);
  }
}

export class LineCollider extends Collider {
  public properties: LineColliderProperties = {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    colliderType: "LineCollider"
  };
  constructor(properties?: LineColliderProperties) {
    super();
    this.setProperties(properties);
  }
}

export class PolygonCollider extends Collider {
  public properties: PolygonColliderProperties = {
    vertices: [],
    colliderType: "PolygonCollider"
  };
  constructor(properties?: Partial<PolygonColliderProperties>) {
    super();
    this.setProperties(properties);
  }
}
