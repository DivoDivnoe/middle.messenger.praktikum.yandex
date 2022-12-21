import { TemplateDelegate } from 'handlebars';
import template from './UserData.hbs';
import styles from './UserData.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import Input from '@/components/Input';
import { InputType } from '@/components/Input/Input';
import RegularExp from '@/configs/RegularExp';
import { User } from '@/api/types';

export type UserProps = User;

export type UserDataInputType =
  | 'email'
  | 'login'
  | 'first_name'
  | 'second_name'
  | 'display_name'
  | 'phone';

type InputProps = {
  id: string;
  name: UserDataInputType;
  type: InputType;
  placeholder: string;
  required: boolean;
  validationRule?: RegExp;
};

type onChangeType = (name: UserDataInputType, value: string) => void;

type UserDataProps = {
  isEditable?: boolean;
  user: UserProps;
  className?: string;
  onChange?: onChangeType;
};

class UserData extends BaseComponent {
  private static _inputsProps: InputProps[] = [
    {
      id: 'email',
      name: 'email',
      type: InputType.EMAIL,
      placeholder: 'Почта',
      required: true,
      validationRule: RegularExp.EMAIL,
    },
    {
      id: 'login',
      name: 'login',
      type: InputType.TEXT,
      placeholder: 'Логин',
      required: true,
      validationRule: RegularExp.LOGIN,
    },
    {
      id: 'first_name',
      name: 'first_name',
      type: InputType.TEXT,
      placeholder: 'Имя',
      required: true,
      validationRule: RegularExp.NAME,
    },
    {
      id: 'second_name',
      name: 'second_name',
      type: InputType.TEXT,
      placeholder: 'Фамилия',
      required: true,
      validationRule: RegularExp.NAME,
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
      validationRule: RegularExp.PHONE,
    },
  ];

  constructor({ props, listeners = {} }: ComponentProps<UserDataProps>) {
    const { user, isEditable = true, className = '', onChange } = props;

    super({
      props: { styles, isEditable, user, className, onChange },
      listeners,
    });
  }

  protected override init(): void {
    const [emailInput, loginInput, firstNameInput, secondNameInput, displayNameInput, phoneInput] =
      this._initInputs(this._props.user as UserProps, !this._props.isEditable);

    this.addChildren({
      emailInput: emailInput!,
      loginInput: loginInput!,
      firstNameInput: firstNameInput!,
      secondNameInput: secondNameInput!,
      displayNameInput: displayNameInput!,
      phoneInput: phoneInput!,
    });
  }

  private _initInputs(user: UserProps, disabled: boolean): Input[] {
    return UserData._inputsProps.map((options) => {
      const validate = (): void => {
        input.validate();
      };

      const input = new Input({
        props: {
          ...options,
          value: String(user[options.name])!,
          disabled,
        },
        listeners: {
          change: [
            (evt) => {
              if (this._props.isEditable) {
                (this._props.onChange as onChangeType)(options.name, evt.target.value);
              }
            },
          ],
          focus: [validate],
          blur: [validate],
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

  public validate(): boolean {
    const inputs = Object.values(this.getChildren()).filter(
      (item) => item instanceof Input,
    ) as Input[];

    return inputs.reduce((acc, cur) => {
      return acc && cur.validate();
    }, true);
  }
}

export default UserData;
