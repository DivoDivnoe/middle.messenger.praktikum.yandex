import { TemplateDelegate } from 'handlebars';
import template from './ConversationBlock.hbs';
import styles from './ConversationBlock.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import Message, { MessageProps } from '@/components/Message/Message';

export interface ConversationBlockProps {
  date: string;
  messagesData: MessageProps[];
}

class ConversationBlock extends BaseComponent {
  constructor({ props, listeners = {} }: ComponentProps<ConversationBlockProps>) {
    const { date, messagesData } = props;

    super({
      props: { date, styles, messagesData },
      listeners,
    });
  }

  protected override init(): void {
    const messages = ConversationBlock._initMessages(this._props.messagesData as MessageProps[]);

    this.addChildren({ messages });
  }

  private static _initMessages(messagesData: MessageProps[]): Message[] {
    const messages = messagesData.map((item) => {
      const contact = new Message({
        props: item,
      });

      return contact;
    });

    return messages;
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default ConversationBlock;
