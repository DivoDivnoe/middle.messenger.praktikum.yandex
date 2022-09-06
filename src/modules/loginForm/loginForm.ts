import { TemplateDelegate } from 'handlebars';
import template from './LoginForm.hbs';
import styles from './LoginForm.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import Button from '@/components/Button';
import { ButtonType } from '@/components/Button/Button';
import Input from '@/components/Input';
import { InputType } from '@/components/Input/Input';

class LoginForm extends BaseComponent {
  constructor({ listeners = {} }: ComponentProps) {
    const button = LoginForm._initButton();
    const loginInput = LoginForm._initLoginInput();
    const passwordInput = LoginForm._initPasswordInput();

    super({ props: { styles, button, loginInput, passwordInput }, listeners });
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

  private static _initLoginInput(): Input {
    const input = new Input({
      props: {
        id: 'login',
        name: 'login',
        type: InputType.TEXT,
        placeholder: 'Логин',
        required: true,
      },
    });

    return input;
  }

  private static _initPasswordInput(): Input {
    const input = new Input({
      props: {
        id: 'password',
        name: 'password',
        type: InputType.PASSWORD,
        placeholder: 'Пароль',
        required: true,
      },
    });

    return input;
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default LoginForm;
