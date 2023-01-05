import { TemplateDelegate } from 'handlebars';
import template from './ChatUserOptions.hbs';
import styles from './ChatUserOptions.module.css';
import BaseComponent, {
  BaseComponentConstructor,
  ComponentProps,
} from '@/utils/components/BaseComponent';
import ChatAddUserOption from '../ChatAddUserOption';
import ChatRemoveUserOption from '../ChatRemoveUserOption';
import withRemoveUserFromChat, {
  RemoveUserFromChatStoreProps,
} from '@/hocs/withRemoveUserFromChat';
import withAddUserToChat, { AddUserToChatStoreProps } from '@/hocs/withAddUserToChat';

export type ChatUserOptionsType = { className?: string } & AddUserToChatStoreProps &
  RemoveUserFromChatStoreProps;
export type ChatUserOptionsProps = ChatUserOptionsType & { styles: typeof styles };

class ChatUserOptions<
  P extends ChatUserOptionsType = ChatUserOptionsType,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<ChatUserOptionsProps> {
  constructor({ props }: O) {
    const { className = '' } = props;

    super({ props: { ...props, className, styles } });

    this.hide();
  }

  protected override init(): void {
    const addUserOption = new ChatAddUserOption();
    const removeUserOption = new ChatRemoveUserOption();

    this.addChildren({ addUserOption, removeUserOption });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }

  protected override componentDidUpdate(
    oldTarget: ChatUserOptionsProps,
    target: ChatUserOptionsProps,
  ): boolean {
    if (
      (!oldTarget.addUserToChat && target.addUserToChat) ||
      (!oldTarget.removeUserFromChat && target.removeUserFromChat)
    ) {
      this.hide();
      return false;
    }

    return true;
  }
}

const WithAddUserToChatForm = withAddUserToChat<
  { className?: string } & RemoveUserFromChatStoreProps
>(ChatUserOptions as BaseComponentConstructor<{ className?: string }>);

const WithRemoveUserFromChatForm = withRemoveUserFromChat<{ className?: string }>(
  WithAddUserToChatForm,
);

export default WithRemoveUserFromChatForm;
