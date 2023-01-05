import { ComponentProps } from '@/utils/components/BaseComponent';
import ChatUserOption from '../ChatUserOption';
import { ChatUserOptionType } from '../ChatUserOption/ChatUserOption';
import chatsController from '@/controllers/ChatsController';

export type ChatAddUserProps = { onClick: () => void };

class ChatAddUserOption<
  P extends ChatAddUserProps = ChatAddUserProps,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends ChatUserOption<ChatUserOptionType> {
  constructor({ props: { onClick } }: O) {
    super({
      props: { addUser: true },
      listeners: {
        click: [
          (evt: Event) => {
            evt.stopPropagation();
            chatsController.wantAddUserToChat(true);
            onClick();
          },
        ],
      },
    });
  }
}

export default ChatAddUserOption;
