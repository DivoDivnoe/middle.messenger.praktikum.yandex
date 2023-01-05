import { TemplateDelegate } from 'handlebars';
import template from './MessagesBlock.hbs';
import styles from './MessagesBlock.module.css';
import BaseComponent, { ComponentProps, IBaseComponent } from '@/utils/components/BaseComponent';
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
import ChatUserOptions from '../ChatUserOptions';
import UserOptionsButton from '@/components/UserOptionsButton';

export type MessagesBlockCoreProps = {
  data?: ConversationBlockPropsType[];
  onSubmit: (message: string) => void;
};

export type MessagesBlockPropsType = MessagesBlockCoreProps & ChatMainDataProps;

export type MessagesBlockProps = Omit<MessagesBlockPropsType, 'onSubmit'> & {
  styles: typeof styles;
  isShownUserOptions: boolean;
};

export class MessagesBlock<
  P extends MessagesBlockPropsType = MessagesBlockPropsType,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<MessagesBlockProps> {
  private _message = '';

  constructor({ props: { data = [], onSubmit, chat } }: O) {
    super({
      props: { styles, chat, data, isShownUserOptions: false },
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
      const arrowButton = MessagesBlock._initArrowButton();
      const messagesBlocks = MessagesBlock._initBlocks(
        this._props.data as ConversationBlockProps[],
      );
      const input = this._initInput();
      const chatUserOptions = this._initChatUserOptions();
      const userOptionsButton = this._initUserOptionsButton();

      this.addChildren({
        avatar,
        arrowButton,
        messagesBlocks,
        input,
        chatUserOptions,
        userOptionsButton,
      });
    } else {
      this.clearChildren();
    }
  }

  private _initChatUserOptions() {
    const chatUserOptions = new ChatUserOptions({
      props: { className: String(styles.userOptions) },
    });

    chatUserOptions.componentWasShown = () => {
      this._subscribeClickDocument();
    };

    chatUserOptions.componentWasHidden = () => {
      this._unsubscribeClickDocument();
    };

    return chatUserOptions;
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

  private _initUserOptionsButton() {
    return new UserOptionsButton({
      props: { isActive: this._props.isShownUserOptions },
      listeners: {
        click: [
          (evt: Event) => {
            evt.stopPropagation();
            this._onClickUserOptionsButton();
          },
        ],
      },
    });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }

  protected override componentDidUpdate(
    oldTarget: MessagesBlockProps,
    target: MessagesBlockProps,
  ): boolean {
    if (oldTarget.isShownUserOptions !== target.isShownUserOptions) {
      if (target.isShownUserOptions) {
        this.chatUserOptions.show();
      } else {
        this.chatUserOptions.hide();
      }

      this.userOptionsButton.updateProps({ isActive: target.isShownUserOptions });

      return false;
    }

    if (oldTarget.data !== target.data) {
      const messagesBlocks = MessagesBlock._initBlocks(
        (target.data ?? []) as ConversationBlockProps[],
      );
      this.addChildren({ messagesBlocks });
    }

    if (oldTarget.chat !== target.chat) {
      this.init();

      if (!oldTarget.chat) {
        this._subscribe;
      }
    }

    return true;
  }

  private _onClickUserOptionsButton = () => {
    this.updateProps({ isShownUserOptions: !this._props.isShownUserOptions });
  };

  private _validate(): boolean {
    return (this.getChild('input') as Input).validate();
  }

  get chatUserOptions() {
    return this.getChild('chatUserOptions') as IBaseComponent;
  }

  get userOptionsButton() {
    return this.getChild('userOptionsButton') as UserOptionsButton;
  }

  _subscribeClickDocument() {
    document.addEventListener('click', this._onClickDocument);
  }

  _unsubscribeClickDocument() {
    document.removeEventListener('click', this._onClickDocument);
  }

  _onClickDocument = () => {
    this.updateProps({ isShownUserOptions: false });
  };
}

export default withChatMainDataStore<MessagesBlockCoreProps>(MessagesBlock);
