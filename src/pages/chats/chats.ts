import { TemplateDelegate } from 'handlebars';
import template from './chats.hbs';
import styles from './chats.module.css';
import BaseComponent from '@/utils/components/BaseComponent';
import MessagesBlock from '@/modules/MessagesBlock';
import Chats from '@/modules/Chats';
import chatsController from '@/controllers/ChatsController';
import ConfirmDeleteChat from '@/modules/ConfirmDeleteChat';
import ChatAddUserForm from '@/modules/ChatAddUserForm';
import ChatRemoveUserForm from '@/modules/ChatRemoveUserForm';

type ChatBlockProps = { styles: typeof styles };

class ChatsPage extends BaseComponent<ChatBlockProps> {
  constructor() {
    super({ props: { styles } });
  }

  protected override init(): void {
    const chatsList = ChatsPage._initChats();
    const messages = ChatsPage._initMessages();
    const confirmDeleteChat = new ConfirmDeleteChat({ props: {} });
    const chatAddUserForm = new ChatAddUserForm({ props: {} });
    const chatRemoveUserForm = new ChatRemoveUserForm({ props: {} });

    this.addChildren({
      chatsList,
      messages,
      confirmDeleteChat,
      chatAddUserForm,
      chatRemoveUserForm,
    });

    chatsController.getFilteredList();
  }

  private static _initChats() {
    return new Chats({ props: {} });
  }

  private static _initMessages() {
    return new MessagesBlock({ props: {} });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default ChatsPage;
