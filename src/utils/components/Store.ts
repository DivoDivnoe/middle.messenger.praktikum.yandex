import { User } from '@/api/types';
import set from '../helpers/set';
import EventEmitter from './EventEmitter';

export enum StoreEvent {
  UPDATED = 'updated',
}

export type StateCoreType = {
  loading: boolean;
  error: string | null;
};

export type UserStateProps = StateCoreType & {
  data: User | null;
  current: User | null;
};

export type UsersStateProps = StateCoreType & {
  data: User[];
};

export type StateProps = {
  user: UserStateProps;
  users: UsersStateProps;
};

const initialState: StateProps = {
  user: { data: null, error: null, loading: false, current: null },
  users: { data: [], error: null, loading: false },
};

export class Store extends EventEmitter {
  private _state: StateProps = initialState;

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
