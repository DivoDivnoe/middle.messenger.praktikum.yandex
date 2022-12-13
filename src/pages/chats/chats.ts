import { TemplateDelegate } from 'handlebars';
import template from './chats.hbs';
import styles from './chats.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import { ChatItemProps } from '@/modules/ChatItem/ChatItem';
import MessagesBlock, { MessagesBlockProps } from '@/modules/MessagesBlock/MessagesBlock';
import ContactsBlock from '@/modules/ContactsBlock';
import { ConversationBlockProps } from '@/modules/ConversationBlock/ConversationBlock';
import { UserMessageType } from '@/components/Message/Message';
import image from '/static/avatar.svg';

const mockUsers: ChatItemProps[] = [
  {
    userName: 'Vadim',
    date: '17:53',
    messageText: 'Привет! Сегодня хороший день, чтобы сгонять на пляж! Ай да со мной!',
    newMessagesAmount: 1,
    src: image,
  },
  {
    userName: 'Sergey',
  },
];

const mockMessagesData: ConversationBlockProps[] = [
  {
    date: '15 ноября',
    messagesData: [
      {
        text: 'Привет! Сегодня хороший день, чтобы сгонять на пляж! Ай да со мной!',
        userType: UserMessageType.INTERLOCUTOR,
        time: '17:54',
      },
      {
        text: 'Привет! Го',
        userType: UserMessageType.DEFAULT,
        time: '17:55',
      },
    ],
  },
];

const mocks = {
  users: mockUsers,
  messages: {
    isEmpty: false,
    src: image,
    userName: 'Vadim',
    data: mockMessagesData,
    onSubmit: (message: string) => console.log(message),
  },
};

export type ChatBlockProps = {
  users?: ChatItemProps[];
  messages: MessagesBlockProps;
};

class ChatsPage extends BaseComponent {
  // constructor({ props, listeners = {} }: ComponentProps<ChatBlockProps>) {
  constructor({ listeners = {} }: ComponentProps<ChatBlockProps>) {
    // const { users = [], messages } = props;

    super({
      props: { users: mocks.users, styles, messages: mocks.messages },
      listeners,
    });
  }

  protected override init(): void {
    const contacts = ChatsPage._initContacts(this._props.users as ChatItemProps[]);
    const messages = ChatsPage._initMessages(this._props.messages as MessagesBlockProps);

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
      const contacts = ChatsPage._initContacts(target.users as ChatItemProps[]);
      this.addChildren({ contacts });
    }

    if (oldTarget.messages !== target.messages) {
      const items = ChatsPage._initMessages(target.messages as MessagesBlockProps);
      this.addChildren({ messages: items });
    }

    return true;
  }
}

export default ChatsPage;
