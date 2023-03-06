import BaseAPI from './BaseApi';
import Endpoint from './Endpoint';
import { ChatMainDataType, ChatToken, ChatType, User } from './types';

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

export type GetChatUsersType = {
  offset?: number;
  limit?: number;
  name?: string;
  email?: string;
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
  constructor() {
    super(Endpoint.CHATS);
  }

  public getFilteredList(data: GetChatsListType): Promise<ChatType[]> {
    return this._http.get(Path.ROOT, { data });
  }

  public override create(data: CreateChatType): Promise<CreateChatResponseType> {
    return this._http.post(Path.ROOT, { data });
  }

  public override delete(chatId: number): Promise<DeleteChatResponse> {
    return this._http.delete(Path.ROOT, { data: { chatId } });
  }

  public getNewMessagesCount(id: number): Promise<getNewMessagesCountResponseType> {
    return this._http.get(Path.NEW, { data: { id } });
  }

  public getUsers(chatId: number, data: GetChatUsersType): Promise<(User & { role: string })[]> {
    return this._http.get(`${chatId}${Path.USERS}`, { data });
  }

  public addUsers(chatId: number, users: number[]): Promise<void> {
    return this._http.put(Path.USERS, { data: { chatId, users } });
  }

  public addUser(chatId: number, user: number): Promise<void> {
    return this.addUsers(chatId, [user]);
  }

  public deleteUsers(chatId: number, users: number[]): Promise<void> {
    return this._http.delete(Path.USERS, { data: { chatId, users } });
  }

  public deleteUser(chatId: number, user: number): Promise<void> {
    return this.deleteUsers(chatId, [user]);
  }

  public async getChatToken(chatId: number): Promise<string> {
    return (await this._http.post<ChatToken>(`${Path.TOKEN}/${chatId}`)).token;
  }
}

export default ChatsApi;
