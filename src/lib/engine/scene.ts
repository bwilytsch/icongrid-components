import { Entity } from "../core";

export class Scene extends Entity {
  constructor() {
    super();
    this.setType("Scene");
    this.setName("Scene");
  }
}
