import { TemplateDelegate } from 'handlebars';
import template from './LoginForm.hbs';
import styles from './LoginForm.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import Button from '@/components/Button';
import { ButtonType } from '@/components/Button/Button';
import Input from '@/components/Input';
import { InputType } from '@/components/Input/Input';

type LoginFormProps = {
  onSubmit: (login: string, password: string) => void;
};

class LoginForm extends BaseComponent {
  private _login = '';
  private _password = '';

  constructor({ props: { onSubmit } }: ComponentProps<LoginFormProps>) {
    super({
      props: { onSubmit, styles },
      listeners: {
        submit: [
          (evt) => {
            evt.preventDefault();
            onSubmit(this._login as string, this._password as string);
          },
        ],
      },
    });
  }

  protected override init(): void {
    const button = LoginForm._initButton();
    const loginInput = this._initLoginInput();
    const passwordInput = this._initPasswordInput();

    this.addChildren({ button, loginInput, passwordInput });
  }

  private static _initButton(): Button {
    const button = new Button({
      props: {
        content: 'Авторизоваться',
        type: ButtonType.SUBMIT,
      },
    });

    return button;
  }

  private _initLoginInput(value = ''): Input {
    const input = new Input({
      props: {
        id: 'login',
        name: 'login',
        type: InputType.TEXT,
        placeholder: 'Логин',
        value,
        required: true,
      },
      listeners: {
        change: [
          (evt) => {
            this._login = evt.target.value;
          },
        ],
      },
    });

    return input;
  }

  private _initPasswordInput(value = ''): Input {
    const input = new Input({
      props: {
        id: 'password',
        name: 'password',
        type: InputType.PASSWORD,
        placeholder: 'Пароль',
        value,
        required: true,
      },
      listeners: {
        change: [
          (evt) => {
            this._password = evt.target.value;
          },
        ],
      },
    });

    return input;
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default LoginForm;
