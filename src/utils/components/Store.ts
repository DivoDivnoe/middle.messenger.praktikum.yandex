import { ChatType, User } from '@/api/types';
import set from '../helpers/set';
import EventEmitter from './EventEmitter';

export enum StoreEvent {
  UPDATED = 'updated',
}

type StateCoreType<T> = {
  loading: boolean;
  error: string | null;
  data: T;
};

export type UserStateProps = StateCoreType<User | null> & { current: User | null };
export type UsersStateProps = StateCoreType<User[]>;
export type ChatsStateProps = StateCoreType<ChatType[]>;
export type ChatStateProps = StateCoreType<ChatType | null>;

export type StateProps = {
  user: UserStateProps;
  users: UsersStateProps;
  chats: ChatsStateProps;
  currentChat: ChatStateProps;
};

const initialState: StateProps = {
  user: { data: null, error: null, loading: false, current: null },
  users: { data: [], error: null, loading: false },
  chats: { data: [], error: null, loading: false },
  currentChat: { data: null, error: null, loading: false },
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
