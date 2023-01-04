import ChatsApi, { CreateChatType, GetChatsListType } from '@/api/ChatsApi';
import store from '@/utils/components/Store';

class ChatsController {
  private _api = new ChatsApi();

  public getFilteredList(data: GetChatsListType = {}): Promise<void> {
    return this._request(() => this._getFilteredList(data), 'get chats error');
  }

  public create(data: CreateChatType): Promise<void> {
    return this._request(() => this._create(data), 'create chat error');
  }

  public delete(chatId: number): Promise<void> {
    return this._request(() => this._delete(chatId), 'user delete error');
  }

  public async getNewMessagesCount(id: number): Promise<void> {
    return this._request(() => this._getNewMessagesCount(id), 'get new messages error');
  }

  public addUsers(chatId: number, users: number[]): Promise<void> {
    return this._request(() => this._addUsers(chatId, users), 'add chat users error');
  }

  public addUser(chatId: number, user: number): Promise<void> {
    return this._request(() => this._addUser(chatId, user), 'add chat user error');
  }

  public deleteUsers(chatId: number, users: number[]): Promise<void> {
    return this._request(() => this._deleteUsers(chatId, users), 'delete chat users error');
  }

  public getChatToken(chatId: number): Promise<void> {
    return this._request(() => this._getChatToken(chatId), 'cannot get chat token');
  }

  public selectChat(chatId: number | null): void {
    store.set('currentChat.data', chatId);
  }

  public selectDeletedChat(chatId: number | null): void {
    store.set('deletedChat', chatId);
  }

  private async _getFilteredList(data: GetChatsListType): Promise<void> {
    const chats = await this._api.getFilteredList(data);
    store.set('chats.data', chats);
  }

  private async _create(data: CreateChatType): Promise<void> {
    await this._api.create(data);
    await this._getFilteredList(data);
  }

  private async _delete(chatId: number): Promise<void> {
    await this._api.delete(chatId);

    store.set('deletedChat', null);

    const { data: chats } = store.getState().chats;
    const newChats = chats.filter((item) => item.id !== chatId);
    store.set('chats.data', newChats);

    if (store.getState().currentChat.data === chatId) {
      store.set('currentChat.data', null);
    }
  }

  private async _getNewMessagesCount(id: number): Promise<void> {
    const { unread_count } = await this._api.getNewMessagesCount(id);
    const index = store.getState().chats.data.findIndex((item) => item.id === id);

    if (index >= 0) {
      store.set(`chats.${index}.unread_count`, unread_count);
    }
  }

  private async _addUsers(chatId: number, users: number[]): Promise<void> {
    await this._api.addUsers(chatId, users);
  }

  private async _addUser(chatId: number, user: number): Promise<void> {
    await this._api.addUser(chatId, user);
  }

  private async _deleteUsers(chatId: number, users: number[]): Promise<void> {
    await this._api.deleteUsers(chatId, users);
  }

  private async _getChatToken(chatId: number): Promise<void> {
    await this._api.getChatToken(chatId);
  }

  private async _request(req: () => Promise<void>, errorMessage = '') {
    store.set('chats.loading', true);
    store.set('chats.error', null);

    try {
      await req();
    } catch (err) {
      if (err instanceof Error) {
        store.set('chats.error', `${errorMessage} ${err.message}`);
      }
    } finally {
      store.set('chats.loading', false);
    }
  }
}

export default new ChatsController();
