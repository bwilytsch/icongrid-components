import { Component } from "./component";
import { getProperty } from "../utils";

type EventListener = (...args: Array<any>) => void;

export type EventEmitterProperties = {
  events: Map<string, Set<EventListener>>;
};

export class EventEmitter extends Component<EventEmitterProperties> {
  public properties: EventEmitterProperties = {
    events: new Map()
  };
  constructor() {
    super();
    this.setType("EventEmitter");
  }
  on(eventName: string, listener: EventListener): void {
    const events = getProperty(this, "events");

    let listeners = events.get(eventName);

    if (listeners === undefined) {
      listeners = new Set();
      events.set(eventName, listeners);
    }

    listeners.add(listener);
  }
  off(eventName: string, listener: EventListener): void {
    const events = getProperty(this, "events");
    const listeners = events.get(eventName);

    if (listeners === undefined) return;

    listeners.delete(listener);

    if (listeners.size === 0) {
      events.delete(eventName);
    }
  }
  emit(eventName: string, ...args: Array<any>): void {
    const events = getProperty(this, "events");
    const listeners = events.get(eventName);

    if (listeners === undefined) return;

    listeners.forEach((ln) => {
      ln(...args);
    });
  }
}
