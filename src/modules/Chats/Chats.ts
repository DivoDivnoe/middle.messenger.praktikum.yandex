import { TemplateDelegate } from 'handlebars';
import template from './Chats.hbs';
import styles from './Chats.module.css';
import BaseComponent, { ComponentProps, PropsTypes } from '@/utils/components/BaseComponent';
import '@/utils/helpers/condition';
import withChatsStore, { ChatsProps } from '@/hocs/withChatsStore';
import { ChatType } from '@/api/types';
import ChatsList from '../ChatsList';

export type ChatsBlockProps = ChatsProps & {
  styles: typeof styles;
  filteredChats: ChatType[];
  inputValue: string;
};

export class Chats<
  P extends ChatsProps = ChatsProps,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<ChatsBlockProps> {
  constructor({ props }: O) {
    const { chats } = props;

    super({ props: { chats, styles, filteredChats: chats, inputValue: '' } });
  }

  protected override init(): void {
    const filteredChatsBlock = Chats._initChatsItems(this._props.filteredChats);

    this.addChildren({ filteredChatsBlock });
  }

  private static _initChatsItems(chats: ChatType[]): ChatsList {
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
      console.log('update input value');
      const chats = this._getFilteredChats(target.inputValue);
      (this.getChild('filteredChatsBlock') as ChatsList).updateProps({ chats });
      return false;
    }

    if (oldTarget.chats !== target.chats) {
      const chats = this._getFilteredChats(target.inputValue);
      (this.getChild('filteredChatsBlock') as ChatsList).updateProps({ chats });
      return false;
    }

    console.log('rerender');

    this._unsubscribeInput();

    return true;
  }

  protected override _subscribe(addListeners?: boolean): void {
    super._subscribe(addListeners);
    this._subscribeInput();
  }

  private _subscribeInput() {
    const input = this.getContent().querySelector(`.${styles.input}`) as HTMLInputElement;

    input.oninput = (evt: Event) => {
      const { value } = evt.target as HTMLInputElement;
      this.updateProps({ inputValue: value });
    };
  }

  private _unsubscribeInput() {
    const input = this.getContent().querySelector(`.${styles.input}`) as HTMLInputElement;

    input.oninput = null;
  }

  _getFilteredChats(inputValue: string) {
    return this._props.chats.filter((chat) => {
      return chat.title.indexOf(inputValue) >= 0;
    });
  }
}

export default withChatsStore<PropsTypes>(Chats);
