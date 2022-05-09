import {
  CircleCollider,
  // BoxCollider,
  PointCollider,
  Collider,
  Shape,
  Transform
} from "./lib/components";
import { Entity } from "./lib/core";
import { Scene, Polygon, Point, Camera, Circle } from "./lib/engine/index";
import Engine from "./lib/engine";

Engine.setSize(640, 480);
Engine.setFillColor("#FF0000");

document.body.appendChild(Engine.domElement);

const scene = new Scene();

const p0 = new Point(24, 24).addComponent(new PointCollider({ x: 24, y: 24 }));
const p1 = new Point(24, 24).addComponent(new PointCollider({ x: 24, y: 24 }));

const c0 = new Circle(12, 12, 24).addComponent(
  new CircleCollider({ x: 12, y: 12, radius: 24 })
);
const c1 = new Circle(120, 0, 24).addComponent(new CircleCollider());

scene.add(c0);
scene.add(c1);
scene.add(p0);
scene.add(p1);

const pCol0 = p0.getComponentByType("Collider") as Collider<any>;
const pCol1 = p1.getComponentByType("Collider") as Collider<any>;

const cCol0 = c0.getComponentByType("Collider") as Collider<any>;
const cCol1 = c1.getComponentByType("Collider") as Collider<any>;

// console.log(col0, col1);

const hit = pCol1.collide(pCol0);

console.log("point in point", hit);

const hit1 = pCol1.collide(cCol0);

console.log("point in circle", hit1);

// const { width, height } = Engine.domElement;

// Stress Test
// for (let i = 0; i < 10; i++) {
//   const rx = Math.random() * width;
//   const ry = Math.random() * height;

//   const rect = new Rectangle(rx, ry, 24, 24);

//   const fill = rect.getComponentByType("Fill") as Fill;
//   if (fill) {
//     fill.setColor("#00FF00");
//   }

//   const stroke = rect.getComponentByType("Stroke") as Stroke;

//   if (stroke) {
//     stroke.setColor("#0000FF");
//     stroke.setLineWidth(12);
//     stroke.setLineJoin(LineJoin.ROUND);
//     stroke.setLineCap(LineCap.BUTT);
//   }

//   scene.add(rect);
// }

const polygon = new Polygon(128, 240, [
  [0, 0],
  [88, 32],
  [120, 120]
]);

// const fill = polygon.getComponentByType("Fill") as Fill;
// const stroke = polygon.getComponentByType("Stroke") as Stroke;

// fill.setColor("#00FFFF");
// stroke.setLineWidth(4);
// stroke.setLineJoin(LineJoin.ROUND);

// scene.add(polygon);

function update() {
  //  const transform = rect.getComponentByType("Transform") as Transform;
  //
  //  if (transform) {
  //    // transform.position[0] += 0.24;
  //  }
}

function renderAABB(entity: Entity, engine: typeof Engine): void {
  const transform = entity.getComponentByType("Transform") as Transform;
  const shape = entity.getComponentByType("Shape") as Shape;
  engine.save();
  engine.rect(
    transform.position[0],
    transform.position[1],
    shape.width,
    shape.height
  );
  engine.setStrokeColor("#00FF00");
  engine.stroke();
  engine.restore();
}

const camera = new Camera();

function render() {
  Engine.clear();
  Engine.render(camera, scene);

  // Do Something here :)

  // renderAABB(rect, Engine);
  // renderAABB(polygon, Engine);
  // renderAABB(line, Engine);
  // renderAABB(circle, Engine);
}

const loop = () => {
  update();
  render();
  requestAnimationFrame(loop);
};

// loop();

render();
