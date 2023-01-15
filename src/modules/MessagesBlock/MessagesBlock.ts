import { TemplateDelegate } from 'handlebars';
import template from './MessagesBlock.hbs';
import styles from './MessagesBlock.module.css';
import BaseComponent, {
  ComponentProps,
  IBaseComponent,
  PropsTypes,
} from '@/utils/components/BaseComponent';
import ArrowButton from '@/components/ArrowButton';
import { ArrowButtonSide } from '@/components/ArrowButton/ArrowButton';
import Input from '@/components/Input';
import { InputType } from '@/components/Input/Input';
import RegularExp from '@/configs/RegularExp';
import withChatMainDataStore, { ChatMainDataProps } from '@/hocs/withChatMainData';
import Avatar from '@/components/Avatar';
import ChatUserOptions from '../ChatUserOptions';
import UserOptionsButton from '@/components/UserOptionsButton';
import isEqual from '@/utils/helpers/isEqual';
import MessagesList from '../MessagesList/MessagesList';
import messagesController from '@/controllers/MessagesController';

export type MessagesBlockProps = ChatMainDataProps & {
  styles: typeof styles;
  isShownUserOptions: boolean;
};

export class MessagesBlock<
  P extends ChatMainDataProps = ChatMainDataProps,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<MessagesBlockProps> {
  private _message = '';

  constructor({ props: { chat } }: O) {
    super({
      props: { styles, chat, isShownUserOptions: false },
      listeners: {
        submit: [
          (evt) => {
            evt.preventDefault();

            if (this._validate()) {
              this._onSubmit(this._message);
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
      const messagesList = this._initMessagesList();
      const input = this._initInput();
      const chatUserOptions = this._initChatUserOptions();
      const userOptionsButton = this._initUserOptionsButton();

      this.addChildren({
        avatar,
        arrowButton,
        messagesList,
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
      props: {
        className: String(styles.userOptions),
        onClick: () => {
          this.updateProps({ isShownUserOptions: false });
        },
      },
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

  private _initMessagesList() {
    const messagesList = new MessagesList({
      props: {
        className: String(styles.content),
        onRender: this._onRenderMessagesList,
      },
    });

    return messagesList;
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

    if (oldTarget.chat !== target.chat) {
      if ([oldTarget, target].some((item) => item.chat === null)) {
        this.init();

        if (!oldTarget.chat) {
          this._subscribe();
        }
      } else {
        if (oldTarget.chat?.avatar !== target.chat?.avatar) {
          (this.getChild('avatar') as Avatar).updateProps({ src: target.chat?.avatar || null });
        }

        return false;
      }
    }

    return !isEqual(oldTarget, target);
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

  get input() {
    return this.getChild('input') as Input;
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

  _onSubmit = (message: string) => {
    if (!this._props.chat) return;

    messagesController.sendMessage(this._props.chat.id, message);
    this.input.updateProps({ value: '' });
    this._message = '';
  };

  _onRenderMessagesList = () => {
    const contentWrapper = this.getContent().querySelector(
      `.${styles.contentWrapper}`,
    ) as HTMLDivElement | null;

    if (contentWrapper) {
      contentWrapper.scrollTop = contentWrapper.scrollHeight;
    }
  };

  protected override componentDidRender(): void {
    const contentWrapper = this.getContent().querySelector(
      `.${styles.contentWrapper}`,
    ) as HTMLDivElement | null;

    if (contentWrapper) {
      contentWrapper.style.height = `${contentWrapper.offsetHeight}px`;
      contentWrapper.scrollTop = contentWrapper.scrollHeight;
    }
  }
}

export default withChatMainDataStore<PropsTypes>(MessagesBlock);
