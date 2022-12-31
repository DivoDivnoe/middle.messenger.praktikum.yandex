import { TemplateDelegate } from 'handlebars';
import template from './UserData.hbs';
import styles from './UserData.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import Input from '@/components/Input';
import { InputType } from '@/components/Input/Input';
import RegularExp from '@/configs/RegularExp';
import { User, UserMainData } from '@/api/types';
import withUserStore, { UserProps } from '@/hocs/withUserStore';

export type UserDataInputType = keyof UserMainData;

type InputProps = {
  id: string;
  name: UserDataInputType;
  type: InputType;
  placeholder: string;
  required: boolean;
  validationRule?: RegExp;
};

type onChangeType = (name: UserDataInputType, value: string) => void;

export type ProfileProps = {
  className?: string;
  isEditable: boolean;
  onChange?: onChangeType;
};

type UserDataPropsType = ProfileProps & UserProps;
type UserDataProps = UserDataPropsType & { styles: typeof styles };

export class UserData<
  P extends UserDataPropsType = UserDataPropsType,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<UserDataProps> {
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

  constructor({ props, listeners = {} }: O) {
    const { isEditable = true, className = '' } = props;

    super({
      props: { ...props, styles, isEditable, className },
      listeners,
    });
  }

  protected override init(): void {
    const [emailInput, loginInput, firstNameInput, secondNameInput, displayNameInput, phoneInput] =
      this._initInputs(this._props.user as User, !this._props.isEditable) as [
        Input,
        Input,
        Input,
        Input,
        Input,
        Input,
      ];

    this.addChildren({
      emailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      displayNameInput,
      phoneInput,
    });
  }

  private _initInputs(user: User, disabled: boolean): Input[] {
    return UserData._inputsProps.map((options) => {
      const validate = (): void => {
        input.validate();
      };

      const props = { ...options, value: user[options.name] || '', disabled };

      const listeners = disabled
        ? {}
        : {
            change: [
              (evt: InputEvent) => {
                if (this._props.isEditable) {
                  (this._props.onChange as onChangeType)(
                    options.name,
                    (evt.target as HTMLInputElement).value,
                  );
                }
              },
            ],
            focus: [validate],
            blur: [validate],
          };

      const input = new Input({ props, listeners });

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

const UserDataWithStore = withUserStore<ProfileProps>(UserData);
export default UserDataWithStore;
