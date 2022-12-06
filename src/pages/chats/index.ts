import styles from './chats.module.css';
import renderDOM from '@/utils/helpers/renderDOM';
// import ContactsBlock from '@/modules/ContactsBlock';
import { ChatItemProps } from '@/modules/ChatItem/ChatItem';
import image from '/static/avatar.svg';
// import MessagesBlock from '@/modules/MessagesBlock';
import { ConversationBlockProps } from '@/modules/ConversationBlock/ConversationBlock';
import { UserMessageType } from '@/components/Message/Message';
import ChatsBlock from '@/modules/ChatsBlock/ChatsBlock';

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

window.addEventListener('DOMContentLoaded', () => {
  const props = {
    users: mockUsers,
    messages: {
      isEmpty: false,
      src: image,
      userName: 'Vadim',
      data: mockMessagesData,
      onSubmit: (message: string) => console.log(message),
    },
  };

  const chatsBlock = new ChatsBlock({ props });
  const app = renderDOM('#app', chatsBlock);

  app.classList.add(String(styles.chatsPage));
});
