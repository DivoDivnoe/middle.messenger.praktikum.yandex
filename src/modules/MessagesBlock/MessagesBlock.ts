import { TemplateDelegate } from 'handlebars';
import template from './MessagesBlock.hbs';
import styles from './MessagesBlock.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import Avatar from '@/components/Avatar';
import '@/utils/helpers/condition';
import ArrowButton from '@/components/ArrowButton';
import { ArrowButtonSide } from '@/components/ArrowButton/ArrowButton';
import ConversationBlock, { ConversationBlockProps } from '../ConversationBlock/ConversationBlock';

type MessagesBlockProps = {
  isEmpty?: boolean;
  src?: string;
  userName?: string;
  data?: ConversationBlockProps[];
};

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

  protected override componentDidUpdate(
    oldTarget: MessagesBlockProps,
    target = [] as MessagesBlockProps,
  ): boolean {
    if (oldTarget.data !== target.data) {
      const messagesBlocks = MessagesBlock._initBlocks(target.data as ConversationBlockProps[]);
      this.addChildren({ messagesBlocks });
    }

    if (oldTarget.src !== target.src) {
      (this.getChild('avatar') as Avatar).updateProps({ src: target.src });
    }

    return true;
  }
}

export default MessagesBlock;
