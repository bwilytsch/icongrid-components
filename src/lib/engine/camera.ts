import { Entity } from "../core";
import { Transform } from "../components";

// Facade Class
export class Camera extends Entity {
  constructor() {
    super();

    this.addComponent(new Transform());

    this.setType("Camera");
    this.setName("Camera");
  }

  get zoom() {
    const { scale } = this.getComponentByType("Transform") as Transform;
    return scale ? scale[0] : 0;
  }

  public setZoom(zoom: number): Entity {
    const transform = this.getComponentByType("Transform") as Transform;

    transform.setScale([zoom, 0]);

    return this;
  }
}
