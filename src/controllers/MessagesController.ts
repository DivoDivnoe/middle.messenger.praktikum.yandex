import store from '@/store/Store';
import ChatsController from './ChatsController';
import { ChatMessage, LastMessageType, User } from '@/api/types';
import WSTransport, { SocketEvent } from '@/utils/components/WSTransport';
import ApiUrl from '@/api/Url';
import userController from './UserController';

export enum TransportType {
  GET_OLD_MESSAGES = 'get old',
  MESSAGE = 'message',
}

class MessagesController {
  private _transports: Record<number, WSTransport> = {};

  public async connect(chatId: number) {
    if (this._transports[chatId]) return;

    const token = await ChatsController.getChatToken(chatId);
    const { id: userId } = store.getState().user as User;

    const transport = new WSTransport(`${ApiUrl.WSS}/${userId}/${chatId}/${token}`);
    await transport.connect();
    transport.on(SocketEvent.MESSAGE, this._onReceiveMessage.bind(this, chatId));
    transport.on(SocketEvent.CLOSE, this._onConnectionClose.bind(this, chatId));

    this._transports[chatId] = transport;

    this.getOldMessages(chatId);
  }

  public disconnect(chatId: number) {
    const transport = this._transports[chatId];

    if (!transport) return;

    transport.disconnect();
  }

  public disconnectAll() {
    Object.values(this._transports).forEach((transport) => transport.disconnect());
  }

  private _onConnectionClose(chatId: number) {
    delete this._transports[chatId];
    store.set(`messages.${chatId}`, []);
  }

  private async _onReceiveMessage(
    chatId: number,
    message: ChatMessage | ChatMessage[],
  ): Promise<void> {
    const { messages } = store.getState();

    if (Array.isArray(message)) {
      message.sort((prev, next) => {
        const [prevTimestamp, nextTimestamp] = [prev, next].map((item) =>
          new Date(item.time).getTime(),
        );

        return Number(prevTimestamp) - Number(nextTimestamp);
      });
    }
    store.set(`messages.${chatId}`, (messages[chatId] || []).concat(message));

    this._updateChatLastMessage(chatId);
  }

  async _updateChatLastMessage(chatId: number) {
    const { messages, chats } = store.getState();

    const lastMessage = messages[chatId]?.slice().pop();
    const index = chats.findIndex((item) => item.id === chatId);

    if (!lastMessage || index < 0) return;

    const { user_id, time, content } = lastMessage;

    const { first_name, second_name, avatar, email, login, phone } =
      await userController.getUserById(user_id);

    const newLastMessage: LastMessageType = {
      user: { first_name, second_name, avatar, email, login, phone },
      time,
      content,
    };

    store.set(`chats.${index}.last_message`, newLastMessage);
  }

  public async getOldMessages(chatId: number) {
    const transport = this._transports[chatId];

    if (!transport) {
      throw new Error(`no ws transport for chat ${chatId}`);
    }

    transport.send({ type: TransportType.GET_OLD_MESSAGES, content: '0' });
  }

  public async sendMessage(chatId: number, content: string): Promise<void> {
    let transport = this._transports[chatId];

    if (!transport) {
      await this.connect(chatId);
      transport = this._transports[chatId] as WSTransport;
    }

    transport.send({ type: TransportType.MESSAGE, content });
  }
}

export default new MessagesController();
