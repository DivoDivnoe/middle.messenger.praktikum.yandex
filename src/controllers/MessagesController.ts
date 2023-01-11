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
    const token = await ChatsController.getChatToken(chatId);
    const { id: userId } = store.getState().user.data as User;

    const transport = new WSTransport(`${ApiUrl.WSS}/${userId}/${chatId}/${token}`);
    await transport.connect();
    transport.on(SocketEvent.MESSAGE, this._receiveMessage.bind(this, chatId));

    this._transports[chatId] = transport;

    this.getOldMessages(chatId);
  }

  private async _receiveMessage(
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
    const index = chats.data.findIndex((item) => item.id === chatId);

    if (!lastMessage || index < 0) return;

    const { user_id, time, content } = lastMessage;

    const { first_name, second_name, avatar, email, login, phone } =
      await userController.getUserById(user_id);

    const newLastMessage: LastMessageType = {
      user: { first_name, second_name, avatar, email, login, phone },
      time,
      content,
    };

    store.set(`chats.data.${index}.last_message`, newLastMessage);
  }

  public async getOldMessages(chatId: number) {
    const transport = this._transports[chatId];

    if (!transport) {
      throw new Error(`no ws transport for chat ${chatId}`);
    }

    transport.send({ type: TransportType.GET_OLD_MESSAGES, content: '0' });
  }

  public sendMessage(chatId: number, content: string): void {
    const transport = this._transports[chatId];

    if (!transport) {
      throw new Error(`no ws transport for chat ${chatId}`);
    }

    transport.send({ type: TransportType.MESSAGE, content });
  }
}

export default new MessagesController();
