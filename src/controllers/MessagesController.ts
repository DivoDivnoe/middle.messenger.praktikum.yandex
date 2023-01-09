import store from '@/store/Store';
import ChatsController from './ChatsController';
import { ChatMessage, User } from '@/api/types';
import WSTransport, { SocketEvent } from '@/utils/components/WSTransport';
import ApiUrl from '@/api/Url';

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
  }

  private _receiveMessage(chatId: number, message: ChatMessage | ChatMessage[]): void {
    const { messages } = store.getState();
    store.set(`messages.${chatId}`, (messages[chatId] || []).concat(message));
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
