import { TemplateDelegate } from 'handlebars';
import template from './chats.hbs';
import styles from './chats.module.css';
import BaseComponent from '@/utils/components/BaseComponent';
import MessagesBlock, { MessagesBlockPropsType } from '@/modules/MessagesBlock/MessagesBlock';
import { ConversationBlockPropsType } from '@/modules/ConversationBlock/ConversationBlock';
import { UserMessageType } from '@/components/Message/Message';
import image from '/static/avatar.svg';
import Chats from '@/modules/Chats';
import chatsController from '@/controllers/ChatsController';

const mockMessagesData: ConversationBlockPropsType[] = [
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

export type ChatBlockPropsType = {
  messages: MessagesBlockPropsType;
};

type ChatBlockProps = ChatBlockPropsType & { styles: typeof styles };

const mocks: ChatBlockPropsType = {
  messages: {
    isEmpty: false,
    src: image,
    userName: 'Vadim',
    data: mockMessagesData,
    onSubmit: (message: string) => console.log(message),
    isActiveUserButton: false,
  },
};

class ChatsPage extends BaseComponent<ChatBlockProps> {
  constructor() {
    const { messages } = mocks;

    super({
      props: { styles, messages },
    });
  }

  protected override init(): void {
    const chats = ChatsPage._initChats();
    const messages = ChatsPage._initMessages(this._props.messages);

    this.addChildren({ chats, messages });

    chatsController.getFilteredList();
  }

  private static _initChats() {
    return new Chats({ props: {} });
  }

  private static _initMessages(messages: MessagesBlockPropsType): MessagesBlock {
    return new MessagesBlock({ props: messages });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }

  protected override componentDidUpdate(
    oldTarget: ChatBlockProps,
    target: ChatBlockProps,
  ): boolean {
    if (oldTarget.messages !== target.messages) {
      const items = ChatsPage._initMessages(target.messages);
      this.addChildren({ messages: items });
    }

    return true;
  }
}

export default ChatsPage;
