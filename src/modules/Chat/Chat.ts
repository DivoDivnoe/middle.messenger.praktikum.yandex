import { TemplateDelegate } from 'handlebars';
import template from './Chat.hbs';
import styles from './Chat.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import '@/utils/helpers/condition';
import Avatar from '@/components/Avatar';

export type ChatPropsType = {
  id: number;
  title: string;
  date?: string;
  messageText?: string;
  newMessagesAmount: number;
  src: string | null;
  isActive?: boolean;
};

export type ChatProps = ChatPropsType & {
  styles: typeof styles;
};

class Chat<
  P extends ChatPropsType = ChatPropsType,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<ChatProps> {
  constructor({ props }: O) {
    const { messageText = '', date = '', isActive = false } = props;

    super({ props: { ...props, styles, messageText, date, isActive } });
  }

  protected override init(): void {
    const avatar = Chat._initAvatar(this._props.src as string);

    this.addChildren({ avatar });
  }

  private static _initAvatar(src: string) {
    return new Avatar({ props: { className: String(styles.avatar), src } });
  }

  protected override componentDidUpdate(oldTarget: ChatProps, target: ChatProps): boolean {
    if (oldTarget.src !== target.src) {
      (this.getChild('avatar') as BaseComponent).updateProps({ src: target.src });
    }

    return true;
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default Chat;
