import ChatUserOption from '../ChatUserOption';
import { ChatUserOptionType } from '../ChatUserOption/ChatUserOption';
import chatsController from '@/controllers/ChatsController';

class ChatAddUserOption extends ChatUserOption<ChatUserOptionType> {
  constructor() {
    super({
      props: { addUser: true },
      listeners: {
        click: [
          (evt: Event) => {
            evt.stopPropagation();
            chatsController.wantAddUserToChat(true);
          },
        ],
      },
    });
  }
}

export default ChatAddUserOption;
