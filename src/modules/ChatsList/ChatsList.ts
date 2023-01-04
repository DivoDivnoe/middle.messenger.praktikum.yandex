import { TemplateDelegate } from 'handlebars';
import template from './ChatsList.hbs';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import '@/utils/helpers/condition';
import Chat from '../Chat';
import { ChatPropsType } from '../Chat/Chat';
import { ChatType } from '@/api/types';
import getChatTime from '@/utils/helpers/getChatTime';
import chatsController from '@/controllers/ChatsController';
import withCurrentChatStore, { CurrentChatProps } from '@/hocs/withCurrentChat';

export type ChatsBlockPropsType = { chats: ChatType[] };
export type ChatsBlockProps = ChatsBlockPropsType & CurrentChatProps;

export class ChatsList<
  P extends ChatsBlockProps = ChatsBlockProps,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<ChatsBlockProps> {
  constructor({ props }: O) {
    super({ props });
  }

  protected override init(): void {
    const chats = ChatsList._initChatsItems(this._props.chats, this._props.currentChat);

    this.addChildren({ chats });
  }

  private static _initChatsItems(chats: ChatType[], currentChat: number | null): Chat[] {
    return chats.map((chat) => {
      const { id, title, avatar: src, unread_count: newMessagesAmount, last_message } = chat;

      let props: ChatPropsType = {
        id,
        title,
        src,
        newMessagesAmount,
        isActive: currentChat === id,
        onClick: () => {
          chatsController.selectChat(id);
        },
      };

      if (last_message) {
        const { time, content: messageText } = last_message;
        const date = getChatTime(time);

        props = { ...props, date, messageText };
      }

      return new Chat({ props });
    });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }

  protected override componentDidUpdate(
    oldTarget: ChatsBlockProps,
    target: ChatsBlockProps,
  ): boolean {
    if (oldTarget.currentChat !== target.currentChat) {
      const [oldCurrentChat, newCurrentChat] = [oldTarget, target].map((item) => {
        const chats = this.getChild('chats') as Chat[];
        return chats.find((chat) => chat.getProps().id === item.currentChat);
      });

      if (oldCurrentChat) {
        oldCurrentChat.updateProps({ isActive: false });
      }

      if (newCurrentChat) {
        newCurrentChat.updateProps({ isActive: true });
      }

      return false;
    }

    if (oldTarget.chats !== target.chats) {
      this.init();
    }

    return true;
  }
}

export default withCurrentChatStore<ChatsBlockPropsType>(ChatsList);
