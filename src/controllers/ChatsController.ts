import ChatsApi, { CreateChatType, GetChatsListType } from '@/api/ChatsApi';
import store from '@/store/Store';
import messagesController from './MessagesController';

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

  public async addUsers(): Promise<void> {
    const { data: chatId } = store.getState().currentChat;
    const { usersToAddToChat: users } = store.getState();

    if (chatId !== null && users.length) {
      await this._request(() => this._addUsers(chatId, users), 'add chat users error');
    }

    this.cancelAddUsers();
  }

  public cancelAddUsers(): void {
    store.set('addUserToChat', false);
    store.set('usersToAddToChat', []);
  }

  public cancelRemoveUsers(): void {
    store.set('removeUserFromChat', false);
    store.set('usersToRemoveFromChat', []);
  }

  public addUser(chatId: number, user: number): Promise<void> {
    return this._request(() => this._addUser(chatId, user), 'add chat user error');
  }

  public async addUserToCurrentChat(user: number): Promise<void> {
    const chatId = store.getState().currentChat?.data;

    if (chatId) {
      await this.addUser(chatId, user);
    }
  }

  public async deleteUsers(): Promise<void> {
    const { data: chatId } = store.getState().currentChat;
    const { usersToRemoveFromChat: users } = store.getState();

    if (chatId !== null && users.length) {
      await this._request(() => this._deleteUsers(chatId, users), 'delete chat users error');
    }

    this.cancelRemoveUsers();
  }

  public deleteUser(chatId: number, user: number): Promise<void> {
    return this._request(() => this._deleteUser(chatId, user), 'delete chat user error');
  }

  public async removeUserFromCurrentChat(user: number): Promise<void> {
    const chatId = store.getState().currentChat?.data;

    if (chatId) {
      await this.deleteUser(chatId, user);
    }
  }

  public selectChat(chatId: number | null): void {
    console.log('select chat', chatId);
    store.set('currentChat.data', chatId);

    if (chatId !== null && !store.getState().messages[chatId]) {
      store.set(`messages.${chatId}`, []);
      messagesController.getOldMessages(chatId);
    }
  }

  public selectDeletedChat(chatId: number | null): void {
    store.set('deletedChat', chatId);
  }

  public wantAddUserToChat(flag: boolean): void {
    console.log('controller add user', flag);
    store.set('addUserToChat', flag);
  }

  public wantRemoveUserFromChat(flag: boolean): void {
    store.set('removeUserFromChat', flag);
  }

  private async _getFilteredList(data: GetChatsListType): Promise<void> {
    const chats = await this._api.getFilteredList(data);

    const promises = chats.map((chat) => messagesController.connect(chat.id));
    await Promise.all(promises);

    store.set('chats.data', chats);
  }

  private async _create(data: CreateChatType): Promise<void> {
    await this._api.create(data);
    await this._getFilteredList(data);
  }

  private async _delete(chatId: number): Promise<void> {
    await this._api.delete(chatId);

    messagesController.disconnect(chatId);
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
    store.set('addUserToChat', false);
    store.set('usersToAddToChat', []);
  }

  private async _addUser(chatId: number, user: number): Promise<void> {
    await this._api.addUser(chatId, user);
  }

  private async _deleteUsers(chatId: number, users: number[]): Promise<void> {
    await this._api.deleteUsers(chatId, users);
    store.set('removeUserFromChat', false);
    store.set('usersToRemoveFromChat', []);
  }

  private async _deleteUser(chatId: number, user: number): Promise<void> {
    await this._api.deleteUser(chatId, user);
  }

  public async getChatToken(chatId: number): Promise<string> {
    return this._api.getChatToken(chatId);
  }

  private async _request(req: () => Promise<void>, errorMessage = '') {
    store.set('chats.loading', true);
    store.set('chats.error', null);

    try {
      await req();
    } catch (err) {
      if (err instanceof Error) {
        store.set('chats.error', `${errorMessage} ${err.message}`);
        alert(`${errorMessage} ${err.message}`);
      }
    } finally {
      store.set('chats.loading', false);
    }
  }
}

export default new ChatsController();
