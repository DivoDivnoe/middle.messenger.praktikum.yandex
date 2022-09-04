import { TemplateDelegate } from 'handlebars';
import template from './SignupForm.hbs';
import styles from './SignupForm.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import Input from '@/components/Input';
import { InputType } from '@/components/Input/Input';
import Button from '@/components/Button';
import { ButtonType } from '@/components/Button/Button';

type BaseSignupFormProps = {
  styles: Record<string, string>;
  emailInput: Input;
  loginInput: Input;
  firstNameInput: Input;
  secondNameInput: Input;
  phoneInput: Input;
  passwordInput: Input;
  passwordExtraInput: Input;
  button: Button;
};

type InputProps = {
  id: string;
  name: string;
  type: InputType;
  placeholder: string;
  required: boolean;
};

class SignupForm extends BaseComponent<BaseSignupFormProps> {
  private static _inputsProps: InputProps[] = [
    {
      id: 'email',
      name: 'email',
      type: InputType.EMAIL,
      placeholder: 'Почта',
      required: true,
    },
    {
      id: 'login',
      name: 'login',
      type: InputType.TEXT,
      placeholder: 'Логин',
      required: true,
    },
    {
      id: 'first_name',
      name: 'first_name',
      type: InputType.TEXT,
      placeholder: 'Имя',
      required: true,
    },
    {
      id: 'second_name',
      name: 'second_name',
      type: InputType.TEXT,
      placeholder: 'Фамилия',
      required: true,
    },
    {
      id: 'phone',
      name: 'phone',
      type: InputType.TEXT,
      placeholder: 'Телефон',
      required: false,
    },
    {
      id: 'password',
      name: 'password',
      type: InputType.PASSWORD,
      placeholder: 'Пароль',
      required: true,
    },
    {
      id: 'password_extra',
      name: 'password_extra',
      type: InputType.PASSWORD,
      placeholder: 'Пароль (ещё раз)',
      required: true,
    },
  ];

  constructor({ listeners = {} }: ComponentProps) {
    const [
      emailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      phoneInput,
      passwordInput,
      passwordExtraInput,
    ] = SignupForm._initInputs();

    const button = SignupForm._initButton();

    super({
      props: {
        styles,
        button,
        emailInput: emailInput!,
        loginInput: loginInput!,
        firstNameInput: firstNameInput!,
        secondNameInput: secondNameInput!,
        phoneInput: phoneInput!,
        passwordInput: passwordInput!,
        passwordExtraInput: passwordExtraInput!,
      },
      listeners,
    });
  }

  private static _initButton(): Button {
    const button = new Button({
      props: {
        content: 'Сохранить',
        type: ButtonType.SUBMIT,
      },
    });

    return button;
  }

  private static _initInputs(): Input[] {
    return SignupForm._inputsProps.map((options) => {
      const input = new Input({
        props: {
          ...options,
          value: '',
          disabled: false,
        },
      });

      return input;
    });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default SignupForm;
