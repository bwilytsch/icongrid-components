import { Component } from "./component";
import { setProperty } from "../utils";

export type Color = string | null;

export type FillProperties = { color: Color };

export class Fill extends Component {
  constructor(properties?: Partial<FillProperties>) {
    super();
    this.setType("Fill");
    this.setProperties(Object.assign({}, { color: "#CCC" }, properties));
  }
  get color() {
    return this.properties.color;
  }

  setColor(color: string): Component {
    this.properties.color = color;
    return this;
  }
}

export enum LineJoin {
  MITER = "miter",
  ROUND = "round",
  BEVEL = "bevel"
}

export enum LineCap {
  BUTT = "butt",
  ROUND = "round",
  SQUARE = "square"
}

export type StrokeProperties = {
  color: Color;
  lineWidth: number;
  lineJoin: LineJoin;
  lineCap: LineCap;
};

export class Stroke extends Component {
  constructor(properties?: Partial<StrokeProperties>) {
    super();
    this.setType("Stroke");
    this.setProperties(
      Object.assign({}, { color: "#000000", lineWidth: 1 }, properties)
    );
  }
  setColor(color: string): Component {
    setProperty(this, "color", color);
    return this;
  }
  setLineWidth(width: number): Component {
    setProperty(this, "lineWidth", width);
    return this;
  }
  setLineJoin(lineJoin: LineJoin): Component {
    setProperty(this, "lineJoin", lineJoin);
    return this;
  }
  setLineCap(lineCap: LineCap): Component {
    setProperty(this, "lineCap", lineCap);
    return this;
  }
}
