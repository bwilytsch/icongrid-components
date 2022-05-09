import { GenericObject } from "./components/component";

export function uuid(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function setProperty(
  obj: GenericObject,
  propName: string,
  value: any
): any {
  return (obj.properties[propName] = value);
}

export function getProperty(obj: GenericObject, propName: string): any {
  return obj.properties[propName];
}
