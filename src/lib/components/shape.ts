import { Component } from "./component";
import { Vector2 } from "../math";
import Engine from "../engine";
import { getProperty, setProperty } from "../utils";

export type ShapeType = "Rectangle" | "Circle" | "Point" | "Line" | "Polygon";

export interface ShapeProperties {
  shapeType: ShapeType;
  width: number;
  height: number;
  vertices: Vector2[];
  visible: boolean;
}

export const calculateDimensionsFromVertices = (
  vertices: Vector2[]
): [number, number] => {
  const _min = [Infinity, Infinity];
  const _max = [-Infinity, -Infinity];

  vertices.forEach((v) => {
    if (_min[0] > v[0]) {
      _min[0] = v[0];
    }
    if (_min[1] > v[1]) {
      _min[1] = v[1];
    }
    if (_max[0] < v[0]) {
      _max[0] = v[0];
    }
    if (_max[1] < v[1]) {
      _max[1] = v[1];
    }
  });

  return [Math.abs(_max[0] - _min[0]), Math.abs(_max[1] - _min[1])];
};

export class Shape extends Component<ShapeProperties> {
  constructor(properties?: Partial<ShapeProperties>) {
    super();
    this.setType("Shape");

    this.setProperties(
      Object.assign(
        {},
        { visible: true, width: 0, height: 0, vertices: [], shapeType: "" },
        properties
      )
    );
  }

  get width(): number {
    return getProperty(this, "width");
  }

  get height(): number {
    return getProperty(this, "height");
  }

  public setSize = (width: number, height: number): Shape => {
    setProperty(this, "width", width);
    setProperty(this, "height", height);
    return this;
  };
  setVertices(vertices: Vector2[]): Shape {
    setProperty(this, "vertices", vertices);
    return this;
  }
  public setShapeType = (type: ShapeType): Shape => {
    this.properties.shapeType = type;
    return this;
  };
  public exec = (_: any, context: { [key: string]: any }): Shape => {
    const props = this.properties as ShapeProperties;

    if (props.visible) {
      const { position } = context.getComponentByName("Transform").properties;

      // Style
      const fill = context.getComponentByName("Fill");
      const stroke = context.getComponentByName("Stroke");

      Engine.save();

      switch (props.shapeType) {
        case "Rectangle":
          Engine.rect(position[0], position[1], props.width, props.height);
          break;
        case "Point":
        case "Circle":
          Engine.circle(position[0], position[1], props.width, props.height);
          break;
        case "Line":
          const [x, y] = position;
          const { width, height } = props;
          Engine.line([x, y], [x + width, y + height]);
          break;
        case "Polygon":
          break;
      }

      if (fill) {
        Engine.setFillColor(getProperty(fill, "color"));
        Engine.fill();
      }

      if (stroke) {
        Engine.setStrokeColor(getProperty(stroke, "color"));
        Engine.stroke();
      }

      Engine.restore();
    }

    return this;
  };
}
