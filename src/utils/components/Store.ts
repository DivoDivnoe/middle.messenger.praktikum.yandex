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
export type ChatStateProps = StateCoreType<number | null>;

export type StateProps = {
  user: UserStateProps;
  users: UsersStateProps;
  chats: ChatsStateProps;
  // currentChat: ChatStateProps;
  currentChat: ChatStateProps;
};

const withCoreStateData = <T>(data: T): StateCoreType<T> => {
  return { error: null, loading: false, data };
};

// const mockChats: (ChatType & { created_by: number })[] = [
//   {
//     id: 268,
//     title: 'Vadim',
//     avatar: null,
//     created_by: 2312,
//     unread_count: 10,
//     last_message: {
//       user: {
//         first_name: 'Petya',
//         second_name: 'Pupkin',
//         avatar: '/path/to/avatar.jpg',
//         email: 'my@email.com',
//         login: 'userLogin',
//         phone: '8(911)-222-33-22',
//       },
//       time: '2020-01-02T14:22:22.000Z',
//       content: 'Привет! Сегодня хороший день, чтобы сгонять на пляж! Ай да со мной!',
//     },
//   },
//   {
//     id: 261,
//     title: 'sometitle',
//     avatar: null,
//     created_by: 2312,
//     unread_count: 0,
//     last_message: null,
//   },
// ];

const initialState: StateProps = {
  user: { current: null, ...withCoreStateData<User | null>(null) },
  users: withCoreStateData<User[]>([]),
  chats: withCoreStateData<ChatType[]>([]),
  currentChat: withCoreStateData<number | null>(null),
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
