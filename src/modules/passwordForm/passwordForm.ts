import { TemplateDelegate } from 'handlebars';
import template from './PasswordForm.hbs';
import styles from './PasswordForm.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import Button from '@/components/Button';
import { ButtonType } from '@/components/Button/Button';
import Input from '@/components/Input';
import { InputType } from '@/components/Input/Input';
import Avatar from '@/components/Avatar';
import { AvatarSize } from '@/components/Avatar/Avatar';

class PasswordForm extends BaseComponent {
  constructor({ listeners = {} }: ComponentProps) {
    const avatar = PasswordForm._initAvatar();
    const button = PasswordForm._initButton();
    const oldPasswordInput = PasswordForm._initOldPasswordInput();
    const newPasswordInput = PasswordForm._initNewPasswordInput();
    const newPasswordExtraInput = PasswordForm._initNewPasswordExtraInput();

    super({
      props: { styles, avatar, button, oldPasswordInput, newPasswordInput, newPasswordExtraInput },
      listeners,
    });
  }

  private static _initAvatar(): Avatar {
    const avatar = new Avatar({
      props: {
        size: AvatarSize.LARGE,
      },
    });

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

  private static _initOldPasswordInput(): Input {
    const input = new Input({
      props: {
        id: 'old_password',
        name: 'old_password',
        type: InputType.PASSWORD,
        placeholder: 'Старый пароль',
        required: true,
      },
    });

    return input;
  }

  private static _initNewPasswordInput(): Input {
    const input = new Input({
      props: {
        id: 'new_password',
        name: 'new_password',
        type: InputType.PASSWORD,
        placeholder: 'Новый пароль',
        required: true,
      },
    });

    return input;
  }

  private static _initNewPasswordExtraInput(): Input {
    const input = new Input({
      props: {
        id: 'new_password_extra',
        name: 'new_password_extra',
        type: InputType.PASSWORD,
        placeholder: 'Повторите новый пароль',
        required: true,
      },
    });

    return input;
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default PasswordForm;
