import { TemplateDelegate } from 'handlebars';
import template from './ConversationBlock.hbs';
import styles from './ConversationBlock.module.css';
import BaseComponent, {
  ComponentDidUpdateType,
  ComponentProps,
} from '@/utils/components/BaseComponent';
import Message, { MessageProps, MessagePropsType } from '@/components/Message/Message';

export type ConversationBlockPropsType = {
  date: string;
  messagesData: MessagePropsType[];
};

export type ConversationBlockProps = ConversationBlockPropsType & { styles: typeof styles };

class ConversationBlock<
  P extends ConversationBlockPropsType = ConversationBlockPropsType,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<ConversationBlockProps> {
  constructor({ props, listeners = {} }: O) {
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

  protected override componentDidUpdate: ComponentDidUpdateType<ConversationBlockProps> = (
    oldTarget,
    target,
  ) => {
    if (oldTarget.messagesData !== target.messagesData) {
      const messages = ConversationBlock._initMessages(target.messagesData as MessageProps[]);
      this.addChildren({ messages });
    }

    return true;
  };

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default ConversationBlock;
