import { ChatMessage, ChatType, User } from '@/api/types';
import set from '../utils/helpers/set';
import EventEmitter from '../utils/components/EventEmitter';

export enum StoreEvent {
  UPDATED = 'updated',
}

export type StateProps = {
  isLoading: boolean;
  user: User | null;
  users: User[];
  chats: ChatType[];
  messages: Record<number, ChatMessage[]>;
  currentChat: number | null;
  deletedChat: number | null;
  addUserToChat: boolean;
  removeUserFromChat: boolean;
  usersToAddToChat: number[];
  usersToRemoveFromChat: number[];
};

const initialState: StateProps = {
  isLoading: false,
  user: null,
  users: [],
  chats: [],
  messages: {},
  currentChat: null,
  deletedChat: null,
  addUserToChat: false,
  removeUserFromChat: false,
  usersToAddToChat: [],
  usersToRemoveFromChat: [],
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
