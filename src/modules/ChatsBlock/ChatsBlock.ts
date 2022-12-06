import { TemplateDelegate } from 'handlebars';
import template from './ChatsBlock.hbs';
import styles from './ChatsBlock.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import { ChatItemProps } from '@/modules/ChatItem/ChatItem';
import MessagesBlock, { MessagesBlockProps } from '@/modules/MessagesBlock/MessagesBlock';
import ContactsBlock from '../ContactsBlock';

export type ChatBlockProps = {
  users?: ChatItemProps[];
  messages: MessagesBlockProps;
};

class ChatsBlock extends BaseComponent {
  constructor({ props, listeners = {} }: ComponentProps<ChatBlockProps>) {
    const { users = [], messages } = props;

    super({
      props: { users, styles, messages },
      listeners,
    });
  }

  protected override init(): void {
    const contacts = ChatsBlock._initContacts(this._props.users as ChatItemProps[]);
    const messages = ChatsBlock._initMessages(this._props.messages as MessagesBlockProps);

    this.addChildren({ contacts, messages });
  }

  private static _initContacts(users: ChatItemProps[]): ContactsBlock {
    const contacts = new ContactsBlock({ props: { users } });

    return contacts;
  }

  private static _initMessages(messages: MessagesBlockProps): MessagesBlock {
    const items = new MessagesBlock({ props: messages });

    return items;
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }

  protected override componentDidUpdate(
    oldTarget: ChatBlockProps,
    target: ChatBlockProps,
  ): boolean {
    if (oldTarget.users !== target.users) {
      const contacts = ChatsBlock._initContacts(target.users as ChatItemProps[]);
      this.addChildren({ contacts });
    }

    if (oldTarget.messages !== target.messages) {
      const items = ChatsBlock._initMessages(target.messages as MessagesBlockProps);
      this.addChildren({ messages: items });
    }

    return true;
  }
}

export default ChatsBlock;
