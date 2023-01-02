import { TemplateDelegate } from 'handlebars';
import template from './ChatsList.hbs';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import '@/utils/helpers/condition';
import Chat from '../Chat';
import { ChatPropsType } from '../Chat/Chat';
import { ChatType } from '@/api/types';
import getChatTime from '@/utils/helpers/getChatTime';

export type ChatsBlockProps = {
  chats: ChatType[];
};

export class ChatsList<
  P extends ChatsBlockProps = ChatsBlockProps,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<ChatsBlockProps> {
  constructor({ props }: O) {
    super({ props });
  }

  protected override init(): void {
    const chats = ChatsList._initChatsItems(this._props.chats);

    this.addChildren({ chats });
  }

  private static _initChatsItems(chats: ChatType[]): Chat[] {
    return chats.map((chat) => {
      const { id, title, avatar: src, unread_count: newMessagesAmount, last_message } = chat;

      let props: ChatPropsType = { id, title, src, newMessagesAmount };

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
    if (oldTarget.chats !== target.chats) {
      this.init();
    }

    return true;
  }
}

export default ChatsList;
