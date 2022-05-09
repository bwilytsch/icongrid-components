import { Component } from "../components/component";
import { uuid } from "../utils";

export class Node {
  public readonly id: string = uuid();
  public parent: Node | null = null;
  public children: Node[] = [];
  public isRoot(): boolean {
    return this.parent === null;
  }
  public isLeaf(): boolean {
    return this.children.length === 0;
  }
  public add(node: Node): Node {
    node.parent = this;
    this.children.push(node);
    return this;
  }
  public remove(node: Node): Node {
    this.children = this.children.filter((child) => {
      if (child !== node) {
        return child;
      }
      child.parent = null;
      return false;
    });
    return this;
  }
  public traverseAncestors(node: Node, fn: Function): void {
    if (!node.isRoot()) {
      fn(node);
    }

    if (node.parent) {
      this.traverseAncestors(node.parent, fn);
    }
  }
  public traverse(node: Node, fn: Function): void {
    if (!node.isRoot()) {
      fn(node);
    }

    node.children.forEach((child) => this.traverse(child, fn));
  }
}

export class Entity extends Node {
  protected type: string = "Entity";
  public name: string = "Entity";

  private _components: { [type: string]: Component } = {};

  constructor() {
    super();
    this._components = {};
  }

  setType(type: string): Entity {
    this.type = type;
    return this;
  }

  setName(name: string): Entity {
    this.name = name;
    return this;
  }

  getComponentByType(type: string): Component | null {
    return this._components[type];
  }
  removeComponent(component: Component): Entity {
    if (this.getComponentByType(component.type)) {
      delete this._components[component.type];
    }
    return this;
  }
  addComponent(component: Component): Entity {
    if (!this.getComponentByType(component.type)) {
      component.bind(this);
      this._components[component.type] = component;
    }
    return this;
  }

  exec(): Entity {
    Object.keys(this._components).forEach((key) => {
      // const component = this._components[key];
      // component.exec(null, this);
    });
    return this;
  }
}
