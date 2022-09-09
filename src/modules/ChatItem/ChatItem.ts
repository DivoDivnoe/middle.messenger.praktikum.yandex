import { TemplateDelegate } from 'handlebars';
import template from './AvatarForm.hbs';
import styles from './AvatarForm.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import Avatar from '@/components/Avatar';
import '@/utils/helpers/condition';

type ChatItemProps = {
  userName: string;
  date?: string;
  messageText?: string;
  newMessagesAmount?: number;
  src?: string;
};

class ChatItem extends BaseComponent {
  constructor({ props, listeners = {} }: ComponentProps<ChatItemProps>) {
    const { newMessagesAmount = 0, src = '', messageText = '', date = '' } = props;

    super({
      props: {
        ...props,
        styles,
        newMessagesAmount,
        src,
        messageText,
        date,
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

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default ChatItem;
