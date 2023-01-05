import withPopup from '@/hocs/withPopup';
import ChatUserForm from '../ChatUserForm';
import { ChatUserFormProps, ChatUserFormType } from '../ChatUserForm/ChatUserForm';
import {
  BaseComponentConstructor,
  ComponentProps,
  PropsTypes,
} from '@/utils/components/BaseComponent';
import withRemoveUserFromChat, {
  RemoveUserFromChatStoreProps,
} from '@/hocs/withRemoveUserFromChat';
import chatsController from '@/controllers/ChatsController';

export type ChatRemoveUserFormProps = ChatUserFormType & RemoveUserFromChatStoreProps;

class ChatRemoveUserForm<
  P extends RemoveUserFromChatStoreProps = RemoveUserFromChatStoreProps,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends ChatUserForm<ChatUserFormType> {
  constructor({ props: { removeUserFromChat } }: O) {
    super({ props: { addUser: false, removeUserFromChat } });
  }

  protected override componentDidUpdate(
    oldTarget: ChatUserFormProps,
    target: ChatUserFormProps,
  ): boolean {
    if (oldTarget.removeUserFromChat !== target.removeUserFromChat) {
      if (target.removeUserFromChat) {
        this.show();
      } else {
        this.hide();
      }

      return false;
    }

    return true;
  }

  public override componentWasShown(): void {
    this._subscribeEscape();
  }

  public override componentWasHidden(): void {
    this._unsubscribeEscape();
  }

  _subscribeEscape() {
    document.addEventListener('keydown', this._onEscape);
  }

  _unsubscribeEscape() {
    document.removeEventListener('keydown', this._onEscape);
  }

  _onEscape = (evt: KeyboardEvent) => {
    if (evt.code === 'Escape') {
      chatsController.cancelRemoveUsers();
    }
  };
}

const WithRemoveUserFromChatForm = withRemoveUserFromChat<PropsTypes>(
  ChatRemoveUserForm as BaseComponentConstructor,
);
export default withPopup(WithRemoveUserFromChatForm);
