import { Entity } from "../core";
import { uuid } from "../utils";

export type GenericObject = { [key: string]: any };

// export type ComponentProperties = {
//   entityRef: Entity | null;
// };

// export type Class = new (...args: any[]) => {};

// export function ComponentMixin<Base extends Class>(base: Base) {
//   return class extends base {
//     public readonly id: string = uuid();
//     public properties: ComponentProperties = { entityRef: null };
//     private _type: string = "";

//     get type(): string {
//       return this._type;
//     }

//     get entityRef(): Entity | null {
//       return this.getProperty("entityRef");
//     }

//     getProperty<T, K extends keyof T)>(
//       propName: K
//     ): T[K] {
//       return this.properties[propName];
//     }
//   };
// }

// const ComponentComp = ComponentMixin(
//   class {
//     x = 0;
//     y = 0;
//     constructor() {
//       // Do something
//       this.x = 1;
//       this.y = 2;
//     }
//   }
// );

// type ComposableElement = InstanceType<typeof ComponentComp>;

// const c = new ComponentComp();

// console.log(c.x);

export class Component<T extends {}> {
  public readonly id: string = uuid();
  public entityRef: Entity | null = null;
  public properties: T = {} as T;

  private _type: string = "";

  get type(): string {
    return this._type;
  }

  setType(type: string): Component<T> {
    this._type = type;
    return this;
  }
  public bind(entity: Entity): Component<T> {
    this.setEntity(entity);
    return this;
  }

  public unbind(): Component<T> {
    this.setEntity(null);
    return this;
  }

  public setEntity(entity: Entity | null): Component<T> {
    if (entity || null) {
      this.entityRef = entity;
    }
    return this;
  }
  getProperty<K extends keyof T>(propName: K): T[K] | null {
    return this.properties[propName] || null;
  }
  setProperty<K extends keyof T>(propName: K, value: T[K]): Component<T> {
    this.properties[propName] = value;
    return this;
  }
  setProperties<K extends keyof T>(props: T): Component<T> {
    if (props !== undefined) {
      Object.keys(props).forEach((propName) => {
        this.setProperty(propName as K, props[propName as K]);
      });
    }
    return this;
  }
}
