import { TemplateDelegate } from 'handlebars';
import template from './Chats.hbs';
import styles from './Chats.module.css';
import BaseComponent, { ComponentProps, PropsTypes } from '@/utils/components/BaseComponent';
import '@/utils/helpers/condition';
import Chat from '../Chat';
import { ChatPropsType } from '../Chat/Chat';
import withChatsStore, { ChatsProps } from '@/hocs/withChatsStore';
import { ChatType } from '@/api/types';
import getChatTime from '@/utils/helpers/getChatTime';

export type ChatsBlockProps = ChatsProps & { styles: typeof styles };

export class Chats<
  P extends ChatsProps = ChatsProps,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<ChatsBlockProps> {
  constructor({ props }: O) {
    const { chats } = props;

    super({ props: { chats, styles } });
  }

  protected override init(): void {
    const chats = Chats._initChatsItems(this._props.chats);

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
      const chats = Chats._initChatsItems(target.chats);
      this.addChildren({ chats });
    }

    return true;
  }
}

export default withChatsStore<PropsTypes>(Chats);
