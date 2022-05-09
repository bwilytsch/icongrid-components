import { Vector2 } from "./math";
import { Scene } from "./engine/index";
import { EventEmitter } from "./event-emitter";
import { Entity } from "./core";
import { getProperty } from "./utils";
import { Color } from "./components/style";
import { GenericObject } from "./components/component";

class Engine extends EventEmitter {
  private _domElement: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D | null;
  private _width: number = 320;
  private _height: number = 240;
  constructor() {
    super();
    this._domElement = document.createElement("canvas");
    this._context = this._domElement.getContext("2d");
  }

  get domElement(): HTMLCanvasElement {
    return this._domElement;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  setSize(width: number, height: number): Engine {
    this._width = width;
    this._height = height;

    this._domElement.width = width;
    this._domElement.height = height;

    return this;
  }

  setFillColor(color: Color): Engine {
    this.setAttribute(this._context, "fillStyle", color);
    return this;
  }

  setStrokeColor(color: Color): Engine {
    this.setAttribute(this._context, "strokeStyle", color);
    return this;
  }

  fill(): Engine {
    if (this._context !== null) {
      this._context.fill();
    }
    return this;
  }

  stroke(): Engine {
    if (this._context !== null) {
      this._context.stroke();
    }
    return this;
  }

  clear(): Engine {
    if (this._context !== null) {
      this._context.clearRect(0, 0, this.width, this.height);
    }
    return this;
  }

  save(): Engine {
    this._context?.save();
    return this;
  }

  restore(): Engine {
    this._context?.restore();
    return this;
  }

  line(from: Vector2, to: Vector2): Engine {
    if (this._context !== null) {
      const c = this._context;
      const [x, y] = from;
      const [xx, yy] = to;

      c.beginPath();

      c.moveTo(x, y);
      c.lineTo(xx + x, yy + y);
    }

    return this;
  }

  circle(x: number, y: number, width: number, height: number): Engine {
    if (this._context !== null) {
      const c = this._context;

      c.beginPath();

      const rx = width / 2;
      const ry = height / 2;

      c.ellipse(x + rx, y + ry, rx, ry, 0, 0, Math.PI * 2);
    }

    return this;
  }

  rect(x: number, y: number, width: number, height: number): Engine {
    if (this._context !== null) {
      const c = this._context;

      c.beginPath();

      c.rect(x, y, width, height);
    }
    return this;
  }

  polygon(x: number, y: number, vertices: Vector2[]): Engine {
    if (this._context !== null) {
      const c = this._context;
      const fp = vertices[0];

      // Following the TRS principle
      // c.scale(2, 2);
      // c.rotate( Math.PI / 2)
      // c.translate(x, y);

      c.beginPath();

      c.moveTo(fp[0] + x, fp[1] + y);

      for (let i = 1, len = vertices.length; i < len; i++) {
        const [vx, vy] = vertices[i];
        c.lineTo(vx + x, vy + y);
      }

      c.lineTo(fp[0] + x, fp[1] + y);

      // c.closePath();
    }

    return this;
  }

  public setAttribute(
    obj: GenericObject | null,
    key: string,
    value: any
  ): Engine {
    if (obj && obj[key]) {
      obj[key] = value;
    }
    return this;
  }

  public render(camera: any, scene: Scene): Engine {
    scene.traverse(scene, (child: Entity) => {
      const shape = child.getComponentByType("Shape");

      if (shape) {
        // Some Matrix and Vertices Calculate magic

        const shapeType = getProperty(shape, "shapeType");
        const vertices = getProperty(shape, "vertices");

        const transform = child.getComponentByType("Transform");
        const fill = child.getComponentByType("Fill");
        const stroke = child.getComponentByType("Stroke");

        this.save();

        if (transform) {
          const width = getProperty(shape, "width");
          const height = getProperty(shape, "height");
          const [x, y] = getProperty(transform, "position");

          switch (shapeType) {
            case "Rectangle":
              this.rect(x, y, width, height);
              break;
            case "Line":
              this.line([x, y], [x + width, y + height]);
              break;
            case "Point":
            case "Circle":
              this.circle(x, y, width, height);

              break;
            case "Polygon":
              this.polygon(x, y, vertices);
          }
        }

        if (fill) {
          this.setAttribute(
            this._context,
            "fillStyle",
            getProperty(fill, "color")
          );
          this.fill();
        }

        if (stroke) {
          this.setAttribute(
            this._context,
            "strokeStyle",
            getProperty(stroke, "color")
          );
          this.setAttribute(
            this._context,
            "lineWidth",
            getProperty(stroke, "lineWidth")
          );
          this.setAttribute(
            this._context,
            "lineJoin",
            getProperty(stroke, "lineJoin")
          );
          this.setAttribute(
            this._context,
            "lineCap",
            getProperty(stroke, "lineCap")
          );

          this.stroke();
        }

        this.restore();
      }
    });

    this.emit("render", null);

    return this;
  }
}

export default new Engine();
