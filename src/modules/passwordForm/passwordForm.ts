import { TemplateDelegate } from 'handlebars';
import template from './PasswordForm.hbs';
import styles from './PasswordForm.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import Button from '@/components/Button';
import { ButtonType } from '@/components/Button/Button';
import Input from '@/components/Input';
import { InputType } from '@/components/Input/Input';
import Avatar from '@/modules/Avatar';
import RegularExp from '@/configs/RegularExp';
import { AvatarSize } from '@/components/Avatar/Avatar';

export type PasswordFormPropsType = {
  src: string;
  onSubmit: (oldPassword: string, newPassword: string, newPasswordExtra: string) => void;
};

export type PasswordFormProps = {
  src: string;
  styles: typeof styles;
};

class PasswordForm<
  P extends PasswordFormPropsType = PasswordFormPropsType,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<PasswordFormProps> {
  private _old_password = '';
  private _new_password = '';
  private _new_password_extra = '';

  constructor({ props: { onSubmit, src } }: O) {
    super({
      props: { styles, src },
      listeners: {
        submit: [
          (evt) => {
            evt.preventDefault();

            if (this._validate()) {
              onSubmit(this._old_password, this._new_password, this._new_password_extra);
            }
          },
        ],
      },
    });
  }

  protected override init(): void {
    const avatar = PasswordForm._initAvatar();
    const button = PasswordForm._initButton();
    const oldPasswordInput = this._initOldPasswordInput();
    const newPasswordInput = this._initNewPasswordInput();
    const newPasswordExtraInput = this._initNewPasswordExtraInput();

    this.addChildren({ avatar, button, oldPasswordInput, newPasswordInput, newPasswordExtraInput });
  }

  private static _initAvatar() {
    const avatar = new Avatar({ props: { size: AvatarSize.LARGE } });

    return avatar;
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

  private _initOldPasswordInput(): Input {
    const validate = (): void => {
      input.validate();
    };

    const input = new Input({
      props: {
        id: 'old_password',
        name: 'old_password',
        type: InputType.PASSWORD,
        placeholder: 'Старый пароль',
        required: true,
        validationRule: RegularExp.PASSWORD,
      },
      listeners: {
        change: [
          (evt) => {
            this._old_password = evt.target.value;
          },
        ],
        focus: [validate],
        blur: [validate],
      },
    });

    return input;
  }

  private _initNewPasswordInput(): Input {
    const validate = (): void => {
      input.validate();
    };

    const input = new Input({
      props: {
        id: 'new_password',
        name: 'new_password',
        type: InputType.PASSWORD,
        placeholder: 'Новый пароль',
        required: true,
        validationRule: RegularExp.PASSWORD,
      },
      listeners: {
        change: [
          (evt) => {
            this._new_password = evt.target.value;
          },
        ],
        focus: [validate],
        blur: [validate],
      },
    });

    return input;
  }

  private _initNewPasswordExtraInput(): Input {
    const validate = (): void => {
      input.validate();
    };

    const input = new Input({
      props: {
        id: 'new_password_extra',
        name: 'new_password_extra',
        type: InputType.PASSWORD,
        placeholder: 'Повторите новый пароль',
        required: true,
        validationRule: RegularExp.PASSWORD,
      },
      listeners: {
        change: [
          (evt) => {
            this._new_password_extra = evt.target.value;
          },
        ],
        focus: [validate],
        blur: [validate],
      },
    });

    input.extraValidate = (): boolean => {
      return this._new_password_extra === this._new_password;
    };

    return input;
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }

  private _validate(): boolean {
    return (
      (this.getChild('oldPasswordInput') as Input).validate() &&
      (this.getChild('newPasswordInput') as Input).validate() &&
      (this.getChild('newPasswordExtraInput') as Input).validate()
    );
  }
}

export default PasswordForm;
