import { Entity } from "../core";
import { Vector2 } from "../math";
import {
  Shape,
  Transform,
  Fill,
  Stroke,
  calculateDimensionsFromVertices
} from "../components";

export class Point extends Entity {
  constructor(x: number, y: number, pointSize: number = 1) {
    super();

    this.addComponent(new Transform().setPosition([x, y]))
      .addComponent(
        new Shape({ shapeType: "Point" }).setSize(pointSize, pointSize)
      )
      .addComponent(new Fill({ color: "#000000" }))
      .setType("Shape")
      .setName("Point");
  }
}

export class Circle extends Entity {
  constructor(x: number, y: number, radius: number) {
    super();

    this.addComponent(new Transform().setPosition([x, y]))
      .addComponent(
        new Shape({ shapeType: "Circle" }).setSize(radius * 2, radius * 2)
      )
      .addComponent(new Stroke())
      .addComponent(new Fill())
      .setType("Shape")
      .setName("Circle");
  }
}

export class Rectangle extends Entity {
  constructor(x: number, y: number, width: number, height: number) {
    super();

    this.addComponent(new Transform().setPosition([x, y]))
      .addComponent(
        new Shape({ shapeType: "Rectangle" }).setSize(width, height)
      )
      .addComponent(new Stroke())
      .addComponent(new Fill())
      .setType("Shape")
      .setName("Rectangle");
  }
}

export class Line extends Entity {
  constructor(from: Vector2, to: Vector2) {
    super();

    const [width, height] = calculateDimensionsFromVertices([from, to]);

    this.addComponent(new Transform().setPosition([...from]))
      .addComponent(new Shape({ shapeType: "Line" }).setSize(width, height))
      .addComponent(new Stroke())
      .setType("Shape")
      .setName("Line");
  }
}

export class Polygon extends Entity {
  constructor(x: number, y: number, vertices: Vector2[] = []) {
    super();

    const [width, height] = calculateDimensionsFromVertices(vertices);

    this.addComponent(new Transform().setPosition([x, y]))
      .addComponent(
        new Shape({ shapeType: "Polygon" })
          .setVertices(vertices)
          .setSize(width, height)
      )
      .addComponent(new Fill({ color: "#666666" }))
      .addComponent(new Stroke())
      .setType("Shape")
      .setName("polygon");
  }
}

let _groupCount = 0;

export class Group extends Entity {
  constructor() {
    super();

    this.addComponent(new Transform())
      .setType("Group")
      .setName(`group-${_groupCount++}`);
  }
}
