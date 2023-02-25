import withPopup from '@/hocs/withPopup';
import ChatUserForm from '../ChatUserForm';
import { ChatUserFormProps, ChatUserFormType } from '../ChatUserForm/ChatUserForm';
import withAddUserToChat, { AddUserToChatStoreProps } from '@/hocs/withAddUserToChat';
import {
  BaseComponentConstructor,
  ComponentDidUpdateType,
  ComponentProps,
  PropsTypes,
} from '@/utils/components/BaseComponent';
import chatsController from '@/controllers/ChatsController';

export type ChatAddUserFormProps = ChatUserFormType & AddUserToChatStoreProps;

class ChatAddUserForm<
  P extends AddUserToChatStoreProps = AddUserToChatStoreProps,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends ChatUserForm<ChatUserFormType> {
  constructor({ props: { addUserToChat } }: O) {
    super({ props: { addUser: true, addUserToChat } });
  }

  protected override componentDidUpdate: ComponentDidUpdateType<ChatUserFormProps> = (
    oldTarget,
    target,
  ) => {
    console.log('update add user form props', oldTarget, target);
    if (oldTarget.addUserToChat !== target.addUserToChat) {
      if (target.addUserToChat) {
        this.show();
      } else {
        this.hide();
      }

      return false;
    }

    return true;
  };

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
      chatsController.cancelAddUsers();
    }
  };
}

const WithAddUserToChatForm = withAddUserToChat<PropsTypes>(
  ChatAddUserForm as BaseComponentConstructor,
);
export default withPopup(WithAddUserToChatForm);
