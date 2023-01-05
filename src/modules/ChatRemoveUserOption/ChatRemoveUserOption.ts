import ChatUserOption from '../ChatUserOption';
import { ChatUserOptionType } from '../ChatUserOption/ChatUserOption';
import chatsController from '@/controllers/ChatsController';

export class ChatRemoveUserOption extends ChatUserOption<ChatUserOptionType> {
  constructor() {
    super({
      props: { addUser: false },
      listeners: {
        click: [
          (evt: Event) => {
            evt.stopPropagation();
            chatsController.wantRemoveUserFromChat(true);
          },
        ],
      },
    });
  }
}

export default ChatRemoveUserOption;
