import { TemplateDelegate } from 'handlebars';
import template from './ChatUserForm.hbs';
import styles from './ChatUserForm.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import Button from '@/components/Button';
import { ButtonType } from '@/components/Button/Button';
import chatsController from '@/controllers/ChatsController';
import Input from '@/components/Input';
import { InputType } from '@/components/Input/Input';
import userController from '@/controllers/UserController';

export type ChatUserFormType = {
  addUser: boolean;
  addUserToChat?: boolean;
  removeUserFromChat?: boolean;
};
export type ChatUserFormProps = ChatUserFormType & { styles: typeof styles };

class ChatUserForm<
  P extends ChatUserFormType = ChatUserFormType,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<ChatUserFormProps> {
  constructor({ props: { addUser } }: O) {
    const onSubmit = async (evt: FormDataEvent) => {
      evt.preventDefault();

      if (addUser) {
        await userController.getUsersToAddByLogin(this._getLogin());
        await chatsController.addUsers();
      } else {
        await userController.getUsersToRemoveByLogin(this._getLogin());
        await chatsController.deleteUsers();
      }
    };

    super({
      props: { addUser, styles },
      listeners: {
        submit: [onSubmit],
      },
    });
  }

  protected override init(): void {
    const input = ChatUserForm._initInput();
    const submitButton = ChatUserForm._initButton(this._props.addUser);

    this.addChildren({ input, submitButton });
  }

  private static _initInput() {
    return new Input({
      props: {
        type: InputType.TEXT,
        required: true,
        name: 'login',
        placeholder: 'Логин',
      },
    });
  }

  private static _initButton(addUserFlag: boolean) {
    const content = addUserFlag ? 'Добавить' : 'Удалить';

    return new Button({ props: { type: ButtonType.SUBMIT, content } });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }

  private _getLogin(): string {
    const input = this.getChild('input') as Input;
    return input.getProps().value || '';
  }
}

export default ChatUserForm;
