import { User } from '@/api/types';
import set from '../helpers/set';
import EventEmitter from './EventEmitter';

export enum StoreEvent {
  UPDATED = 'updated',
}

export type UserStateProps = {
  data: User | null;
  error: string | null;
  isLoading: boolean;
};

export type StateProps = {
  user: UserStateProps;
};

export class Store extends EventEmitter {
  private _state: StateProps = { user: { data: null, error: null, isLoading: false } };

  public set(keyPath: string, data: unknown) {
    set(this._state, keyPath, data);
    this.emit(StoreEvent.UPDATED, this.getState());
  }

  public getState() {
    return this._state;
  }
}

const store = new Store();
export default store;
