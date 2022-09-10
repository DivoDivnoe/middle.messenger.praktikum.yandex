import { TemplateDelegate } from 'handlebars';
import template from './MessagesBlock.hbs';
import styles from './MessagesBlock.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import Avatar from '@/components/Avatar';
import '@/utils/helpers/condition';
import ArrowButton from '@/components/ArrowButton';
import { ArrowButtonSide } from '@/components/ArrowButton/ArrowButton';
import ConversationBlock, { ConversationBlockProps } from '../ConversationBlock/ConversationBlock';

interface MessagesBlockProps {
  isEmpty?: boolean;
  src?: string;
  userName?: string;
  data?: ConversationBlockProps[];
}

class MessagesBlock extends BaseComponent {
  constructor({
    props: { isEmpty = false, src = '', userName = '', data = [] },
    listeners = {},
  }: ComponentProps<MessagesBlockProps>) {
    super({
      props: { styles, isEmpty, src, userName, data, isActiveUserButton: false },
      listeners,
    });
  }

  protected override init(): void {
    if (!this._props.isEmpty) {
      const avatar = MessagesBlock._initAvatar(this._props.src as string);
      const arrowButton = MessagesBlock._initArrowButton();
      const messagesBlocks = MessagesBlock._initBlocks(
        this._props.data as ConversationBlockProps[],
      );

      this.addChildren({ avatar, arrowButton, messagesBlocks });
    }
  }

  private static _initAvatar(src: string): Avatar {
    const avatar = new Avatar({
      props: { src },
    });

    return avatar;
  }

  private static _initArrowButton(): ArrowButton {
    const arrowButton = new ArrowButton({
      props: { side: ArrowButtonSide.RIGHT },
    });

    return arrowButton;
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

export default MessagesBlock;
