import { TemplateDelegate } from 'handlebars';
import template from './ProfileForm.hbs';
import styles from './ProfileForm.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import Avatar from '@/components/Avatar';
import { AvatarSize } from '@/components/Avatar/Avatar';
import UserData from '../UserData';
import { UserDataInputType, UserProps } from '../UserData/UserData';
import Button from '@/components/Button';
import { ButtonType } from '@/components/Button/Button';

type InputsProps = Record<UserDataInputType, string>;

export type ProfileFormProps = {
  user: UserProps;
  onSubmit: (data: InputsProps) => void;
};

class ProfileForm extends BaseComponent {
  private _inputsData: InputsProps;

  constructor({ props: { user, onSubmit } }: ComponentProps<ProfileFormProps>) {
    super({
      props: { styles, user, onSubmit },
      listeners: {
        submit: [
          (evt) => {
            evt.preventDefault();

            if ((this.getChild('userData') as UserData).validate()) {
              onSubmit(this._inputsData);
            }
          },
        ],
      },
    });

    this._inputsData = {
      email: user.email,
      login: user.login,
      first_name: user.first_name,
      second_name: user.second_name,
      display_name: user.display_name ?? '',
      phone: user.phone,
    };
  }

  protected override init(): void {
    const avatar = ProfileForm._initAvatar();
    const userData = this._initUserData();
    const button = ProfileForm._initButton();

    this.addChildren({ avatar, userData, button });
  }

  private static _initAvatar(): Avatar {
    const avatar = new Avatar({
      props: {
        className: String(styles.avatar),
        size: AvatarSize.LARGE,
        isEditable: false,
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

  private _initUserData(): UserData {
    const userData = new UserData({
      props: {
        user: this._props.user as UserProps,
        isEditable: true,
        className: String(styles.userData),
        onChange: (name: UserDataInputType, value: string) => {
          this._inputsData[name] = value;
        },
      },
    });

    return userData;
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }

  protected override componentDidUpdate(
    oldTarget: ProfileFormProps,
    target: ProfileFormProps,
  ): boolean {
    if (oldTarget.user !== target.user) {
      (this.getChild('userData') as BaseComponent).updateProps({ user: target.user });
    }

    return true;
  }
}

export default ProfileForm;
