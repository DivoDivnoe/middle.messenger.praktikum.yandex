import { TemplateDelegate } from 'handlebars';
import template from './SignupForm.hbs';
import styles from './SignupForm.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import Input from '@/components/Input';
import { InputType } from '@/components/Input/Input';
import Button from '@/components/Button';
import { ButtonType } from '@/components/Button/Button';
import RegularExp from '@/configs/RegularExp';

type InputProps = {
  id: string;
  name: string;
  type: InputType;
  placeholder: string;
  required: boolean;
  validationRule: RegExp;
};

type InputsProps = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string | null;
  password: string;
  password_extra: string;
};

export type SubmitDataProps = InputsProps;

type SignupFormProps = {
  onSubmit: (data: SubmitDataProps) => void;
};

class SignupForm extends BaseComponent {
  private _inputs: InputsProps = {
    email: '',
    login: '',
    first_name: '',
    second_name: '',
    phone: '',
    password: '',
    password_extra: '',
  };

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
      id: 'phone',
      name: 'phone',
      type: InputType.TEXT,
      placeholder: 'Телефон',
      required: true,
      validationRule: RegularExp.PHONE,
    },
    {
      id: 'password',
      name: 'password',
      type: InputType.PASSWORD,
      placeholder: 'Пароль',
      required: true,
      validationRule: RegularExp.PASSWORD,
    },
    {
      id: 'password_extra',
      name: 'password_extra',
      type: InputType.PASSWORD,
      placeholder: 'Пароль (ещё раз)',
      required: true,
      validationRule: RegularExp.PASSWORD,
    },
  ];

  constructor({ props: { onSubmit } }: ComponentProps<SignupFormProps>) {
    super({
      props: { styles },
      listeners: {
        submit: [
          (evt) => {
            evt.preventDefault();

            if (this._validate()) {
              onSubmit(this._inputs);
            }
          },
        ],
      },
    });
  }

  protected override init(): void {
    const [
      emailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      phoneInput,
      passwordInput,
      passwordExtraInput,
    ] = this._initInputs();

    const button = SignupForm._initButton();

    this.addChildren({
      button,
      emailInput: emailInput!,
      loginInput: loginInput!,
      firstNameInput: firstNameInput!,
      secondNameInput: secondNameInput!,
      phoneInput: phoneInput!,
      passwordInput: passwordInput!,
      passwordExtraInput: passwordExtraInput!,
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

  private _initInputs(): Input[] {
    return SignupForm._inputsProps.map((options) => {
      const validate = (): void => {
        if (options.name === 'password_extra') {
          input.extraValidate = (): boolean => {
            return this._inputs.password_extra === this._inputs.password;
          };
        }

        input.validate();
      };

      const input = new Input({
        props: {
          ...options,
          value: '',
          disabled: false,
        },
        listeners: {
          change: [
            (evt) => {
              const key = options.name as keyof InputsProps;
              this._inputs[key] = evt.target.value;
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

  private _validate(): boolean {
    const inputs = Object.values(this.getChildren()).filter(
      (item) => item instanceof Input,
    ) as Input[];

    return inputs.reduce((acc, cur) => {
      return acc && cur.validate();
    }, true);
  }
}

export default SignupForm;
