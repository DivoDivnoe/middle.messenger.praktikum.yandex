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

    super({
      props: { styles, isEditable, user, className },
      listeners,
    });
  }

  protected override init(): void {
    const [emailInput, loginInput, firstNameInput, secondNameInput, displayNameInput, phoneInput] =
      UserData._initInputs(this._props.user as UserProps, !this._props.isEditable);

    this.addChildren({
      emailInput: emailInput!,
      loginInput: loginInput!,
      firstNameInput: firstNameInput!,
      secondNameInput: secondNameInput!,
      displayNameInput: displayNameInput!,
      phoneInput: phoneInput!,
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

  protected override componentDidUpdate(oldTarget: UserDataProps, target: UserDataProps): boolean {
    const [oldUser, newUser] = [oldTarget.user, target.user];

    if (oldUser.email !== newUser.email) {
      (this.getChild('emailInput') as BaseComponent).updateProps({ value: newUser.email });
    }

    if (oldUser.login !== newUser.login) {
      (this.getChild('loginInput') as BaseComponent).updateProps({ value: newUser.login });
    }

    if (oldUser.first_name !== newUser.first_name) {
      (this.getChild('firstNameInput') as BaseComponent).updateProps({ value: newUser.first_name });
    }

    if (oldUser.second_name !== newUser.second_name) {
      (this.getChild('secondNameInput') as BaseComponent).updateProps({
        value: newUser.second_name,
      });
    }

    if (oldUser.display_name !== newUser.display_name) {
      (this.getChild('displayNameInput') as BaseComponent).updateProps({
        value: newUser.display_name,
      });
    }

    if (oldUser.phone !== newUser.phone) {
      (this.getChild('phoneInput') as BaseComponent).updateProps({ value: newUser.phone });
    }

    return true;
  }
}

export default UserData;
