import { TemplateDelegate } from 'handlebars';
import template from './UserData.hbs';
import styles from './UserData.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import Input from '@/components/Input';
import { InputType } from '@/components/Input/Input';

export type UserProps = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name?: string;
  phone?: string;
};

type BaseUserDataProps = {
  styles: Record<string, string>;
  emailInput: Input;
  loginInput: Input;
  firstNameInput: Input;
  secondNameInput: Input;
  displayNameInput: Input;
  phoneInput: Input;
  isEditable: boolean;
  className: string;
};

type UserDataProps = {
  isEditable?: boolean;
  user: UserProps;
  className?: string;
};

type InputProps = {
  id: string;
  name: keyof UserProps;
  type: InputType;
  placeholder: string;
  required: boolean;
};

class UserData extends BaseComponent<BaseUserDataProps> {
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
      id: 'display_name',
      name: 'display_name',
      type: InputType.TEXT,
      placeholder: 'Имя в чате',
      required: true,
    },
    {
      id: 'phone',
      name: 'phone',
      type: InputType.TEXT,
      placeholder: 'Телефон',
      required: false,
    },
  ];

  constructor({ props, listeners = {} }: ComponentProps<UserDataProps>) {
    const { user, isEditable = true, className = '' } = props;

    const [emailInput, loginInput, firstNameInput, secondNameInput, displayNameInput, phoneInput] =
      UserData._initInputs(user, !isEditable);

    super({
      props: {
        styles,
        emailInput: emailInput!,
        loginInput: loginInput!,
        firstNameInput: firstNameInput!,
        secondNameInput: secondNameInput!,
        displayNameInput: displayNameInput!,
        phoneInput: phoneInput!,
        isEditable,
        className,
      },
      listeners,
    });
  }

  private static _initInputs(user: UserProps, disabled: boolean): Input[] {
    return UserData._inputsProps.map((options) => {
      const input = new Input({
        props: {
          ...options,
          value: user[options.name]!,
          disabled,
        },
      });

      return input;
    });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default UserData;
