import { ComponentProps } from '@/utils/components/BaseComponent';
import ChatUserOption from '../ChatUserOption';
import { ChatUserOptionType } from '../ChatUserOption/ChatUserOption';
import chatsController from '@/controllers/ChatsController';

export type ChatRemoveUserProps = { onClick: () => void };

export class ChatRemoveUserOption<
  P extends ChatRemoveUserProps = ChatRemoveUserProps,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends ChatUserOption<ChatUserOptionType> {
  constructor({ props: { onClick } }: O) {
    super({
      props: { addUser: false },
      listeners: {
        click: [
          (evt: Event) => {
            evt.stopPropagation();
            chatsController.wantRemoveUserFromChat(true);
            onClick();
          },
        ],
      },
    });
  }
}

export default ChatRemoveUserOption;
