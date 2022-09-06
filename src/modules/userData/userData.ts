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

class UserData extends BaseComponent {
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
        user,
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

  protected override componentDidUpdate(oldTarget: UserDataProps, target: UserDataProps): void {
    if (oldTarget.user === target.user) return;

    const [oldUser, newUser] = [oldTarget.user, target.user];

    if (oldUser.email !== newUser.email) {
      this.getChild('emailInput')?.updateProps({ value: newUser.email });
    }

    if (oldUser.login !== newUser.login) {
      this.getChild('loginInput')?.updateProps({ value: newUser.login });
    }

    if (oldUser.first_name !== newUser.first_name) {
      this.getChild('firstNameInput')?.updateProps({ value: newUser.first_name });
    }

    if (oldUser.second_name !== newUser.second_name) {
      this.getChild('secondNameInput')?.updateProps({ value: newUser.second_name });
    }

    if (oldUser.display_name !== newUser.display_name) {
      this.getChild('displayNameInput')?.updateProps({ value: newUser.display_name });
    }

    if (oldUser.phone !== newUser.phone) {
      this.getChild('phoneInput')?.updateProps({ value: newUser.phone });
    }
  }
}

export default UserData;
