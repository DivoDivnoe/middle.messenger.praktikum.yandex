import { TemplateDelegate } from 'handlebars';
import template from './ConversationBlock.hbs';
import styles from './ConversationBlock.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import ConversationBlock, { ConversationBlockProps } from '../ConversationBlock/ConversationBlock';

interface ConversationProps {
  data: ConversationBlockProps[];
}

class Conversation extends BaseComponent {
  constructor({ props, listeners = {} }: ComponentProps<ConversationProps>) {
    const { data } = props;

    super({
      props: { data, styles },
      listeners,
    });
  }

  protected override init(): void {
    const messagesBlocks = Conversation._initBlocks(this._props.data as ConversationBlockProps[]);

    this.addChildren({ messagesBlocks });
  }

  private static _initBlocks(data: ConversationBlockProps[]): ConversationBlock[] {
    const messages = data.map((item) => {
      const contact = new ConversationBlock({
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

export default Conversation;
