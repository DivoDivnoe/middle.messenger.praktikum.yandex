import BaseAPI from './BaseApi';
import Endpoint from './Endpoint';
import { ChatMainDataType, ChatToken, ChatType } from './types';

enum Path {
  ROOT = '/',
  NEW = '/new',
  USERS = '/users',
  COMMON = '/common',
  TOKEN = '/token',
}

export type GetChatsListType = {
  offset?: number;
  limit?: number;
  title?: string;
};

export type CreateChatType = { title: string };
type CreateChatResponseType = { id: number };

type DeleteChatResponse = {
  userId: number;
  result: ChatMainDataType;
};

type getNewMessagesCountResponseType = {
  unread_count: string;
};

class ChatsApi extends BaseAPI {
  read = undefined;
  update = undefined;

  constructor() {
    super(Endpoint.CHATS);
  }

  public getFilteredList(data: GetChatsListType): Promise<ChatType[]> {
    return this._http.get(Path.ROOT, { data });
  }

  public create(data: CreateChatType): Promise<CreateChatResponseType> {
    return this._http.post(Path.ROOT, { data });
  }

  public delete(chatId: number): Promise<DeleteChatResponse> {
    return this._http.delete(Path.ROOT, { data: { chatId } });
  }

  public getNewMessagesCount(id: number): Promise<getNewMessagesCountResponseType> {
    return this._http.get(Path.NEW, { data: { id } });
  }

  public addUsers(chatId: number, users: number[]): Promise<void> {
    return this._http.put(Path.USERS, { data: { chatId, users } });
  }

  public deleteUsers(chatId: number, users: number[]): Promise<void> {
    return this._http.delete(Path.USERS, { data: { chatId, users } });
  }

  public getChatToken(chatId: number): Promise<ChatToken[]> {
    return this._http.post(`${Path.TOKEN}/${chatId}`);
  }
}

export default ChatsApi;
