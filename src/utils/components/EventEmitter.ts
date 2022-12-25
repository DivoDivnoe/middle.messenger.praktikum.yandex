export type CallbackType = (...args: any[]) => void;

class EventEmitter {
  private _listeners: Record<string, CallbackType[]> = {};

  on(eventName: string, callback: CallbackType): void {
    if (!this._listeners[eventName]) {
      this._listeners[eventName] = [] as CallbackType[];
    }

    this._listeners[eventName]?.push(callback);
  }

  off(eventName: string, callback: CallbackType): void {
    const listeners = this._listeners[eventName];

    if (!listeners) return;

    const newListeners = listeners.filter((listener) => listener !== callback);

    if (!newListeners.length) {
      delete this._listeners[eventName];
    } else {
      this._listeners[eventName] = newListeners;
    }
  }

  emit(eventName: string, ...args: unknown[]): void {
    const listeners = this._listeners[eventName];

    if (!listeners) {
      // throw new Error(`no event ${eventName}`);
      return;
    }

    for (const listener of listeners) {
      listener(...args);
    }
  }
}

export default EventEmitter;
