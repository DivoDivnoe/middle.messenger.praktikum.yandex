import set from '../helpers/set';
import EventEmitter from './EventEmitter';

export enum StoreEvent {
  UPDATED = 'updated',
}

export class Store extends EventEmitter {
  private _state: Record<string, unknown> = {};

  public set(keyPath: string, data: unknown) {
    set(this._state, keyPath, data);
    // this.emit(StoreEvent.UPDATED, this.getState());
  }

  public getState() {
    return this._state;
  }
}

const store = new Store();
export default store;
