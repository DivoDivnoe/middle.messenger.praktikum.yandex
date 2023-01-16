import { TemplateDelegate } from 'handlebars';
import template from './Chats.hbs';
import styles from './Chats.module.css';
import BaseComponent, {
  ComponentProps,
  IBaseComponent,
  PropsTypes,
} from '@/utils/components/BaseComponent';
import '@/utils/helpers/condition';
import withChatsStore, { ChatsProps } from '@/hocs/withChatsStore';
import { ChatType } from '@/api/types';
import ChatsList from '../ChatsList';
import { ChatsBlockPropsType } from '../ChatsList/ChatsList';
import AddChatForm from '../AddChatForm';
import { AddChatFormType } from '../AddChatForm/AddChatForm';
import isEqual from '@/utils/helpers/isEqual';

export type ChatsBlockProps = ChatsProps & {
  styles: typeof styles;
  filteredChats: ChatType[];
  inputValue: string;
  wantAddChat: boolean;
};

export class Chats<
  P extends ChatsProps = ChatsProps,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<ChatsBlockProps> {
  constructor({ props }: O) {
    const { chats } = props;

    super({ props: { chats, styles, filteredChats: chats, inputValue: '', wantAddChat: false } });
  }

  protected override init(): void {
    const filteredChatsBlock = Chats._initChatsItems(this._props.filteredChats);
    const addChatForm = this._initAddChatsForm();

    this.addChildren({ filteredChatsBlock, addChatForm });
  }

  private _initAddChatsForm() {
    const addChatsForm = new AddChatForm({
      props: {
        onEscape: () => {
          console.log('escape');
          this.updateProps({ wantAddChat: false });
        },
      },
    });

    return addChatsForm;
  }

  private static _initChatsItems(chats: ChatType[]) {
    return new ChatsList({ props: { chats } });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }

  protected override componentDidUpdate(
    oldTarget: ChatsBlockProps,
    target: ChatsBlockProps,
  ): boolean {
    if (oldTarget.inputValue !== target.inputValue) {
      const chats = this._getFilteredChats(target.inputValue);
      this.filteredChatsBlock.updateProps({ chats });
      return false;
    }

    if (oldTarget.wantAddChat !== target.wantAddChat) {
      if (target.wantAddChat) {
        this.addChatForm.show();
      } else {
        this.addChatForm.hide();
      }

      return false;
    }

    if (!isEqual(oldTarget.chats, target.chats)) {
      const chats = this._getFilteredChats(target.inputValue);
      this.filteredChatsBlock.updateProps({ chats });
      return false;
    }

    this._unsubscribeInput();
    this._unsubscribeAddChat();

    return true;
  }

  protected override _subscribe(addListeners?: boolean): void {
    super._subscribe(addListeners);
    this._subscribeInput();
    this._subscribeAddChat();
  }

  private _subscribeInput() {
    this.input.oninput = (evt: Event) => {
      const { value } = evt.target as HTMLInputElement;
      this.updateProps({ inputValue: value });
    };
  }

  private _unsubscribeInput() {
    this.input.oninput = null;
  }

  _getFilteredChats(inputValue: string) {
    return this._props.chats.filter((chat) => {
      return chat.title.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0;
    });
  }

  private _subscribeAddChat(): void {
    this.addChatButton.onclick = () => {
      console.log('click');
      this.updateProps({ wantAddChat: true });
    };
  }

  private _unsubscribeAddChat(): void {
    this.addChatButton.onclick = null;
  }

  get input() {
    return this.getContent().querySelector(`.${styles.input}`) as HTMLInputElement;
  }

  get addChatButton() {
    return this.getContent().querySelector(`.${styles.addButton}`) as HTMLButtonElement;
  }

  get addChatForm() {
    return this.getChild('addChatForm') as IBaseComponent<AddChatFormType>;
  }

  get filteredChatsBlock() {
    return this.getChild('filteredChatsBlock') as IBaseComponent<ChatsBlockPropsType>;
  }
}

export default withChatsStore<PropsTypes>(Chats);
