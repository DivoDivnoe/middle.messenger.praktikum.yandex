import { TemplateDelegate } from 'handlebars';
import template from './ChatItem.hbs';
import styles from './ChatItem.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import Avatar from '@/components/Avatar';
import '@/utils/helpers/condition';

export type ChatItemProps = {
  userName: string;
  date?: string;
  messageText?: string;
  newMessagesAmount?: number;
  src?: string;
  isActive?: boolean;
};

class ChatItem extends BaseComponent {
  constructor({ props, listeners = {} }: ComponentProps<ChatItemProps>) {
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
    const avatar = ChatItem._initAvatar(this._props.src as string | undefined);

    this.addChildren({ avatar });
  }

  private static _initAvatar(src = ''): Avatar {
    const avatar = new Avatar({
      props: {
        className: String(styles.avatar),
        src,
      },
    });

    return avatar;
  }

  protected override componentDidUpdate(oldTarget: ChatItemProps, target: ChatItemProps): boolean {
    if (oldTarget.src !== target.src) {
      (this.getChild('avatar') as BaseComponent).updateProps({ src: target.src });
    }

    return true;
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default ChatItem;
