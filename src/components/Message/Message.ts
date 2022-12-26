import { TemplateDelegate } from 'handlebars';
import template from './Message.hbs';
import styles from './Message.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';

export enum UserMessageType {
  DEFAULT = 'default',
  INTERLOCUTOR = 'interlocutor',
}

export type MessagePropsType = {
  text: string;
  userType: UserMessageType;
  time: string;
};

export type MessageProps = MessagePropsType & { styles: typeof styles };

class Message<
  P extends MessagePropsType = MessagePropsType,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<MessageProps> {
  constructor({ props, listeners = {} }: O) {
    const { userType = UserMessageType.DEFAULT } = props;

    super({ props: { ...props, styles, userType }, listeners });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default Message;
