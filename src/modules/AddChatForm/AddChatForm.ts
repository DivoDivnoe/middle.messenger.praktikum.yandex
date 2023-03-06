import { TemplateDelegate } from 'handlebars';
import template from './AddChatForm.hbs';
import styles from './AddChatForm.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import Button from '@/components/Button';
import { ButtonType } from '@/components/Button/Button';
import chatsController from '@/controllers/ChatsController';
import Input from '@/components/Input';
import { InputType } from '@/components/Input/Input';
import withPopup from '@/hocs/withPopup';

export type AddChatFormType = {
  onEscape: () => void;
};
export type AddChatFormProps = AddChatFormType & { styles: typeof styles };

class AddChatForm<
  P extends AddChatFormType = AddChatFormType,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<AddChatFormProps> {
  constructor({ props }: O) {
    const onSubmit = async (evt: FormDataEvent) => {
      evt.preventDefault();

      await chatsController.create({ title: this._getTitle() });

      (this.getChild('input') as Input).updateProps({ value: '' });
      props.onEscape();
    };

    super({
      props: { ...props, styles },
      listeners: {
        submit: [onSubmit],
      },
    });
  }

  protected override init(): void {
    const input = AddChatForm._initInput();
    const submitButton = AddChatForm._initButton();

    this.addChildren({ input, submitButton });
  }

  private static _initInput() {
    return new Input({
      props: {
        type: InputType.TEXT,
        required: true,
        name: 'chat_title',
        placeholder: 'Название чата',
      },
    });
  }

  private static _initButton(): Button {
    return new Button({ props: { type: ButtonType.SUBMIT, content: 'Добавить' } });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }

  private _getTitle(): string {
    const input = this.getChild('input') as Input;
    return input.getProps().value || '';
  }

  public override componentWasShown(): void {
    this._subscribeEscape();
  }

  public override componentWasHidden(): void {
    this._unsubscribeEscape();
  }

  private _subscribeEscape(): void {
    document.addEventListener('keydown', this._onEscape);
  }

  private _unsubscribeEscape(): void {
    document.removeEventListener('keydown', this._onEscape);
  }

  private _onEscape = (evt: KeyboardEvent): void => {
    if (evt.code === 'Escape') {
      this._props.onEscape();
    }
  };
}

export default withPopup<AddChatFormType>(AddChatForm);
