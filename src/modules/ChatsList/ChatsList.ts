import { TemplateDelegate } from 'handlebars';
import template from './ChatsList.hbs';
import BaseComponent, {
  ComponentDidUpdateType,
  ComponentProps,
} from '@/utils/components/BaseComponent';
import Chat from '../Chat';
import { ChatPropsType } from '../Chat/Chat';
import { ChatType } from '@/api/types';
import getChatTime from '@/utils/helpers/getChatTime';
import chatsController from '@/controllers/ChatsController';
import withCurrentChatStore, { CurrentChatProps } from '@/hocs/withCurrentChat';
import DeleteChatPopup from '@/components/DeleteChatPopup';

export type ChatsBlockPropsType = { chats: ChatType[] };
export type ChatsBlockProps = ChatsBlockPropsType & CurrentChatProps;
export type ChatsBlockType = ChatsBlockProps & { chatToDelete: number | null };

enum EventType {
  CONFIRM_DELETE_CHAT = 'confirm-delete-chat',
  DELETE_CHAT = 'delete-chat',
}

export class ChatsList<
  P extends ChatsBlockProps = ChatsBlockProps,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<ChatsBlockType> {
  constructor({ props }: O) {
    super({ props: { ...props, chatToDelete: null } });
  }

  protected override _subscribe(addListeners?: boolean): void {
    super._subscribe(addListeners);

    this._eventEmitter.on(EventType.CONFIRM_DELETE_CHAT, (chatId: number) => {
      chatsController.selectDeletedChat(chatId);
    });
    this._eventEmitter.on(EventType.DELETE_CHAT, (chatId: number) => {
      chatsController.delete(chatId);
    });
  }

  protected override init(): void {
    const chats = this._initChatsItems();
    const deleteChatPopup = this._initDeleteChatPopup();

    this.addChildren({ chats, deleteChatPopup });
  }

  private _initChatsItems(): Chat[] {
    return this._props.chats.map((chat) => {
      const { id, title, avatar: src, unread_count: newMessagesAmount, last_message } = chat;

      let props: ChatPropsType = {
        id,
        title,
        src,
        newMessagesAmount,
        isActive: this._props.currentChat === id,
        onClick: () => {
          chatsController.selectChat(id);
        },
      };

      if (last_message) {
        const { time, content: messageText } = last_message;
        const date = getChatTime(time);

        props = { ...props, date, messageText };
      }

      return new Chat({
        props,
        listeners: {
          contextmenu: [
            (evt) => {
              evt.preventDefault();

              const { pageX: left, pageY: top } = evt;

              this.deleteChatPopup.getContent().style.top = `${top}px`;
              this.deleteChatPopup.getContent().style.left = `${left}px`;

              this.updateProps({ chatToDelete: id });
            },
          ],
        },
      });
    });
  }

  protected _initDeleteChatPopup(): DeleteChatPopup {
    const deleteChatPopup = new DeleteChatPopup({
      listeners: {
        click: [
          (evt: Event) => {
            evt.stopPropagation();
            chatsController.selectDeletedChat(this._props.chatToDelete);
            this.updateProps({ chatToDelete: null });
          },
        ],
      },
    });

    deleteChatPopup.componentWasShown = () => {
      this._subscribeClickDocument();
    };

    deleteChatPopup.componentWasHidden = () => {
      this._unsubscribeClickDocument();
    };

    return deleteChatPopup;
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }

  protected override componentDidUpdate: ComponentDidUpdateType<ChatsBlockType> = (
    oldTarget,
    target,
  ) => {
    if (oldTarget.currentChat !== target.currentChat) {
      const [oldCurrentChat, newCurrentChat] = [oldTarget, target].map((item) => {
        const chats = this.getChild('chats') as Chat[];
        return chats.find((chat) => chat.getProps().id === item.currentChat);
      });

      if (oldCurrentChat) {
        oldCurrentChat.updateProps({ isActive: false });
      }

      if (newCurrentChat) {
        newCurrentChat.updateProps({ isActive: true });
      }

      return false;
    }

    if (oldTarget.chatToDelete !== target.chatToDelete) {
      if (target.chatToDelete !== null) {
        this.deleteChatPopup.show();
      } else {
        this.deleteChatPopup.hide();
      }

      return false;
    }

    if (oldTarget.chats !== target.chats) {
      this.init();
    }

    return true;
  };

  _subscribeClickDocument() {
    document.addEventListener('click', this._onClickDocument);
  }

  _unsubscribeClickDocument() {
    document.removeEventListener('click', this._onClickDocument);
  }

  _onClickDocument = () => {
    this.updateProps({ chatToDelete: null });
  };

  get deleteChatPopup() {
    return this.getChild('deleteChatPopup') as DeleteChatPopup;
  }
}

export default withCurrentChatStore<ChatsBlockPropsType>(ChatsList);
