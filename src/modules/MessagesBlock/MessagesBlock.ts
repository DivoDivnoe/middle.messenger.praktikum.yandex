import { TemplateDelegate } from 'handlebars';
import template from './MessagesBlock.hbs';
import styles from './MessagesBlock.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import Avatar from '@/components/Avatar';
import ArrowButton from '@/components/ArrowButton';
import { ArrowButtonSide } from '@/components/ArrowButton/ArrowButton';
import ConversationBlock, { ConversationBlockProps } from '../ConversationBlock/ConversationBlock';
import Input from '@/components/Input';
import { InputType } from '@/components/Input/Input';
import RegularExp from '@/configs/RegularExp';

export type MessagesBlockProps = {
  isEmpty?: boolean;
  src?: string;
  userName?: string;
  data?: ConversationBlockProps[];
  onSubmit: (message: string) => void;
};

class MessagesBlock extends BaseComponent {
  private _message = '';

  constructor({
    props: { isEmpty = false, src = '', userName = '', data = [], onSubmit },
  }: ComponentProps<MessagesBlockProps>) {
    super({
      props: { styles, isEmpty, src, userName, data, onSubmit, isActiveUserButton: false },
      listeners: {
        submit: [
          (evt) => {
            evt.preventDefault();

            if (this._validate()) {
              onSubmit(this._message);
            }
          },
        ],
      },
    });
  }

  protected override init(): void {
    if (!this._props.isEmpty) {
      const avatar = MessagesBlock._initAvatar(this._props.src as string);
      const arrowButton = MessagesBlock._initArrowButton();
      const messagesBlocks = MessagesBlock._initBlocks(
        this._props.data as ConversationBlockProps[],
      );
      const input = this._initInput();

      this.addChildren({ avatar, arrowButton, messagesBlocks, input });
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
      props: { side: ArrowButtonSide.RIGHT, isSubmit: true },
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

  private _initInput(value = ''): Input {
    const validate = (): void => {
      input.validate();
    };

    const input = new Input({
      props: {
        id: 'message',
        name: 'message',
        type: InputType.TEXT,
        placeholder: 'Сообщение',
        value,
        required: false,
        validationRule: RegularExp.MESSAGE,
      },
      listeners: {
        change: [
          (evt) => {
            this._message = evt.target.value;
          },
        ],
        focus: [validate],
        blur: [validate],
      },
    });

    return input;
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }

  protected override componentDidUpdate(
    oldTarget: MessagesBlockProps,
    target: MessagesBlockProps,
  ): boolean {
    if (oldTarget.data !== target.data) {
      const messagesBlocks = MessagesBlock._initBlocks(
        (target.data ?? []) as ConversationBlockProps[],
      );
      this.addChildren({ messagesBlocks });
    }

    if (oldTarget.src !== target.src) {
      (this.getChild('avatar') as Avatar).updateProps({ src: target.src });
    }

    return true;
  }

  private _validate(): boolean {
    return (this.getChild('input') as Input).validate();
  }
}

export default MessagesBlock;
