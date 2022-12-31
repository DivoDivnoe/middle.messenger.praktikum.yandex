import { TemplateDelegate } from 'handlebars';
import template from './ChatItem.hbs';
import styles from './ChatItem.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import Avatar from '@/modules/Avatar';
import '@/utils/helpers/condition';

export type ChatItemPropsType = {
  userName: string;
  date?: string;
  messageText?: string;
  newMessagesAmount?: number;
  src?: string;
  isActive?: boolean;
};

export type ChatItemProps = ChatItemPropsType & {
  styles: typeof styles;
  isMessagesCounterHidden: boolean;
};

class ChatItem<
  P extends ChatItemPropsType = ChatItemPropsType,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<ChatItemProps> {
  constructor({ props, listeners = {} }: O) {
    const {
      newMessagesAmount = 0,
      src = '',
      messageText = '',
      date = '',
      isActive = false,
    } = props;

    super({
      props: {
        ...props,
        styles,
        newMessagesAmount,
        src,
        messageText,
        date,
        isActive,
        isMessagesCounterHidden: newMessagesAmount === 0,
      },
      listeners,
    });
  }

  protected override init(): void {
    const avatar = ChatItem._initAvatar();

    this.addChildren({ avatar });
  }

  private static _initAvatar() {
    return new Avatar({ props: { className: String(styles.avatar) } });
  }

  // protected override componentDidUpdate(oldTarget: ChatItemProps,
  // target: ChatItemProps): boolean {
  //   if (oldTarget.src !== target.src) {
  //     (this.getChild('avatar') as BaseComponent).updateProps({ src: target.src });
  //   }

  //   return true;
  // }?

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default ChatItem;
