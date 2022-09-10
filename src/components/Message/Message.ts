import { TemplateDelegate } from 'handlebars';
import template from './Message.hbs';
import styles from './Message.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';

export enum UserMessageType {
  DEFAULT = 'default',
  INTERLOCUTOR = 'interlocutor',
}

export interface MessageProps {
  text: string;
  userType: UserMessageType;
  time: string;
}

class Message extends BaseComponent {
  constructor({ props, listeners = {} }: ComponentProps<MessageProps>) {
    const { userType = UserMessageType.DEFAULT } = props;

    const messageProps = {
      ...props,
      styles,
      userType,
    };

    super({ props: messageProps, listeners });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default Message;
