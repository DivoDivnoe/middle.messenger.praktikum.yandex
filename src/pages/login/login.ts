import { TemplateDelegate } from 'handlebars';
import template from './login.hbs';
import styles from './login.module.css';
import BaseComponent from '@/utils/components/BaseComponent';
import Button from '@/components/Button';
import { ButtonType } from '@/components/Button/Button';
import Input from '@/components/Input';
import { InputType } from '@/components/Input/Input';
import RegularExp from '@/configs/RegularExp';

// type LoginFormProps = {
//   onSubmit: (login: string, password: string) => void;
// };

const onSubmit = (login: string, password: string) => {
  console.log(login, password);
};

class LoginPage extends BaseComponent {
  private _login = '';
  private _password = '';

  // constructor({ props: { onSubmit } }: ComponentProps<LoginFormProps>) {
  constructor() {
    super({
      props: { onSubmit, styles },
      listeners: {
        submit: [
          (evt) => {
            evt.preventDefault();

            if (this._validate()) {
              onSubmit(this._login as string, this._password as string);
            }
          },
        ],
      },
    });
  }

  protected override init(): void {
    const button = LoginPage._initButton();
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
    const validate = (): void => {
      input.validate();
    };

    const input = new Input({
      props: {
        id: 'login',
        name: 'login',
        type: InputType.TEXT,
        placeholder: 'Логин',
        value,
        required: true,
        validationRule: RegularExp.LOGIN,
      },
      listeners: {
        change: [
          (evt) => {
            this._login = evt.target.value;
          },
        ],
        focus: [validate],
        blur: [validate],
      },
    });

    return input;
  }

  private _initPasswordInput(value = ''): Input {
    const validate = (): void => {
      input.validate();
    };

    const input = new Input({
      props: {
        id: 'password',
        name: 'password',
        type: InputType.PASSWORD,
        placeholder: 'Пароль',
        value,
        required: true,
        validationRule: RegularExp.PASSWORD,
      },
      listeners: {
        change: [
          (evt) => {
            this._password = evt.target.value;
          },
        ],
        focus: [validate],
        blur: [validate],
      },
    });

    return input;
  }

  private _validate(): boolean {
    return (
      (this.getChild('loginInput') as Input).validate() &&
      (this.getChild('passwordInput') as Input).validate()
    );
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default LoginPage;
