import { Component } from "./component";
// import { Entity } from "../entities/entity";
import { getProperty, setProperty } from "../utils";
import { add, Vector2 } from "../math";

export type RigidBodyProperties = {
  acceleration: Vector2;
  velocity: Vector2;
  heading: Vector2;
};

export class RigidBody extends Component<RigidBodyProperties> {
  constructor(properties?: Partial<RigidBodyProperties>) {
    super();
    this.setType("RigidBody");
    this.setProperties(
      Object.assign(
        {},
        { acceleration: [0, 0], velocity: [0, 0], heading: [0, 0] },
        properties
      )
    );
  }
  private calculateHeading(): RigidBody {
    return this;
  }
  public applyForce(force: Vector2): RigidBody {
    const v = getProperty(this, "velocity");
    setProperty(this, "velocity", add(v, force));
    return this;
  }
}
