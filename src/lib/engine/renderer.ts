import { Camera } from "./camera";
import { Scene } from "./scene";

// export interface IRenderer<T> {
//   domElement: HTMLCanvasElement | null;
//   setSize: (width: number, height: number) => T;
//   render: (camera: Camera, scene: Scene) => T;
// }

export class Renderer {
  public domElement: HTMLCanvasElement | null = null;
  protected _ctx:
    | CanvasRenderingContext2D
    | WebGL2RenderingContext
    | null = null;
  constructor() {
    this.domElement = document.createElement("canvas");
  }
  setSize(width: number, height: number): Renderer {
    return this;
  }
  render(camera: Camera, scene: Scene): Renderer {
    return this;
  }
}

export class CanvasRenderer extends Renderer {
  constructor() {
    super();
    this._ctx = this.domElement.getContext("2d");
  }
}

export class WebGLRenderer extends Renderer {
  constructor() {
    super();
    this._ctx = this.domElement.getContext("webgl2");
  }
}

// @NOTE: Doesn't fit it
export class SVGRenderer extends Renderer {
  constructor() {
    super();
    this._ctx = this.domElement.getContext("webgl2");
  }
}
