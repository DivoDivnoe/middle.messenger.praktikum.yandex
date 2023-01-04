import { TemplateDelegate } from 'handlebars';
import template from './chats.hbs';
import styles from './chats.module.css';
import BaseComponent from '@/utils/components/BaseComponent';
import MessagesBlock, { MessagesBlockCoreProps } from '@/modules/MessagesBlock/MessagesBlock';
import { ConversationBlockPropsType } from '@/modules/ConversationBlock/ConversationBlock';
import { UserMessageType } from '@/components/Message/Message';
import Chats from '@/modules/Chats';
import chatsController from '@/controllers/ChatsController';
import ConfirmDeleteChat from '@/modules/ConfirmDeleteChat';

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
  messages: MessagesBlockCoreProps;
};

type ChatBlockProps = ChatBlockPropsType & { styles: typeof styles };

const mocks: MessagesBlockCoreProps = {
  data: mockMessagesData,
  onSubmit: (message: string) => console.log(message),
  isActiveUserButton: false,
};

class ChatsPage extends BaseComponent<ChatBlockProps> {
  constructor() {
    super({
      props: { styles, messages: mocks },
    });
  }

  protected override init(): void {
    const chats = ChatsPage._initChats();
    const messages = ChatsPage._initMessages(this._props.messages);
    const confirmDeleteChat = new ConfirmDeleteChat({ props: {} });

    this.addChildren({ chats, messages, confirmDeleteChat });

    chatsController.getFilteredList();
  }

  private static _initChats() {
    return new Chats({ props: {} });
  }

  private static _initMessages(messages: MessagesBlockCoreProps) {
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
