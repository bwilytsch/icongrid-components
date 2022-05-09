// Base class for emitting events

type EventListener = (...args: Array<any>) => void;

export abstract class EventEmitter {
  private _events: Map<string, Set<EventListener>> = new Map();
  on(eventName: string, listener: EventListener): void {
    let listeners = this._events.get(eventName);

    if (listeners === undefined) {
      listeners = new Set();
      this._events.set(eventName, listeners);
    }

    listeners.add(listener);
  }
  off(eventName: string, listener: EventListener): void {
    const listeners = this._events.get(eventName);

    if (listeners === undefined) return;

    listeners.delete(listener);

    if (listeners.size === 0) {
      this._events.delete(eventName);
    }
  }
  emit(eventName: string, ...args: Array<any>): void {
    const listeners = this._events.get(eventName);

    if (listeners === undefined) return;

    listeners.forEach((ln) => {
      ln(...args);
    });
  }
}
