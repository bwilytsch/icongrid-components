import { Vector2 } from "../math";
import { setProperty } from "../utils";
import { Component } from "./component";

export interface TransformProperties {
  position: Vector2;
  rotation: Vector2;
  scale: Vector2;
  euler: Vector2;
  matrix: any;
  matrixNeedsUpdate: boolean;
  worldMatrix: any;
  worldMatrixNeedsUpdate: boolean;
}

export class Transform extends Component {
  constructor(properties?: Partial<TransformProperties>) {
    super();
    this.setType("Transform");
    this.setProperties(
      Object.assign(
        {},
        { position: [0, 0], rotation: [0, 0], scale: [1, 1] },
        properties
      )
    );
  }

  // Do I want to expose these
  get position(): Vector2 {
    return this.properties.position;
  }

  get rotation(): Vector2 {
    return this.properties.rotation;
  }

  get scale(): Vector2 {
    return this.properties.scale;
  }

  setPosition(position: Vector2): Transform {
    setProperty(this, "position", position);
    return this;
  }
  setRotation(rotation: Vector2): Transform {
    setProperty(this, "rotation", rotation);
    return this;
  }
  setScale(scale: Vector2): Transform {
    setProperty(this, "scale", scale);
    return this;
  }
}
