import { TemplateDelegate } from 'handlebars';
import template from './MessagesBlock.hbs';
import styles from './MessagesBlock.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import ArrowButton from '@/components/ArrowButton';
import { ArrowButtonSide } from '@/components/ArrowButton/ArrowButton';
import ConversationBlock, {
  ConversationBlockProps,
  ConversationBlockPropsType,
} from '../ConversationBlock/ConversationBlock';
import Input from '@/components/Input';
import { InputType } from '@/components/Input/Input';
import RegularExp from '@/configs/RegularExp';
import withChatMainDataStore, { ChatMainDataProps } from '@/hocs/withChatMainData';
import Avatar from '@/components/Avatar';

export type MessagesBlockCoreProps = {
  data?: ConversationBlockPropsType[];
  onSubmit: (message: string) => void;
  isActiveUserButton: boolean;
};

export type MessagesBlockPropsType = MessagesBlockCoreProps & ChatMainDataProps;

export type MessagesBlockProps = Omit<MessagesBlockPropsType, 'onSubmit'> & {
  styles: typeof styles;
};

export class MessagesBlock<
  P extends MessagesBlockPropsType = MessagesBlockPropsType,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<MessagesBlockProps> {
  private _message = '';

  constructor({ props: { data = [], isActiveUserButton = false, onSubmit, chat } }: O) {
    super({
      props: {
        styles,
        chat,
        data,
        isActiveUserButton,
      },
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
    if (this._props.chat) {
      const avatar = MessagesBlock._initAvatar(this._props.chat?.avatar || null);
      console.log('avatar', avatar);

      const arrowButton = MessagesBlock._initArrowButton();
      const messagesBlocks = MessagesBlock._initBlocks(
        this._props.data as ConversationBlockProps[],
      );
      const input = this._initInput();

      this.addChildren({ avatar, arrowButton, messagesBlocks, input });
    }
  }

  private static _initAvatar(src: string | null) {
    return new Avatar({ props: { src } });
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
    console.log('update messages');
    if (oldTarget.data !== target.data) {
      const messagesBlocks = MessagesBlock._initBlocks(
        (target.data ?? []) as ConversationBlockProps[],
      );
      this.addChildren({ messagesBlocks });
    }

    if (!oldTarget.chat && target.chat) {
      this.init();
    }

    return true;
  }

  private _validate(): boolean {
    return (this.getChild('input') as Input).validate();
  }
}

export default withChatMainDataStore<MessagesBlockCoreProps>(MessagesBlock);
