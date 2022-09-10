import styles from './chats.module.css';
import renderDOM from '@/utils/helpers/renderDOM';
import ContactsBlock from '@/modules/ContactsBlock/ContactsBlock';
import { ChatItemProps } from '@/modules/ChatItem/ChatItem';
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

window.addEventListener('DOMContentLoaded', () => {
  const contactsBlock = new ContactsBlock({ props: { users: mockUsers } });
  const app = renderDOM('#app', contactsBlock);

  app.classList.add(String(styles.chatsPage));
});
