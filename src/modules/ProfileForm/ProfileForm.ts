import { TemplateDelegate } from 'handlebars';
import template from './ProfileForm.hbs';
import styles from './ProfileForm.module.css';
import BaseComponent, { ComponentProps, IBaseComponent } from '@/utils/components/BaseComponent';
import Avatar from '@/modules/Avatar';
import UserData from '../UserData';
import { ProfileProps, UserDataInputType } from '../UserData/UserData';
import Button from '@/components/Button';
import { ButtonType } from '@/components/Button/Button';
import { AvatarSize } from '@/components/Avatar/Avatar';
import { User } from '@/api/types';

type InputsProps = Record<UserDataInputType, string>;

export type ProfileFormPropsType = {
  user: User;
  onSubmit: (data: InputsProps) => void;
};

export type ProfileFormProps = {
  user: User;
  styles: typeof styles;
};

class ProfileForm<
  P extends ProfileFormPropsType = ProfileFormPropsType,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<ProfileFormProps> {
  private _inputsData: InputsProps;

  constructor({ props: { user, onSubmit } }: O) {
    super({
      props: { user, styles },
      listeners: {
        submit: [
          (evt) => {
            evt.preventDefault();

            if (
              (
                this.getChild('userData') as IBaseComponent<ProfileProps> & {
                  validate: () => boolean;
                }
              ).validate()
            ) {
              onSubmit(this._inputsData);
            }
          },
        ],
      },
    });

    this._initInputsData();
  }

  private _initInputsData(): void {
    this._inputsData = { ...this._props.user, display_name: this._props.user.display_name ?? '' };
  }

  protected override init(): void {
    const avatar = ProfileForm._initAvatar();
    const userData = this._initUserData();
    const button = ProfileForm._initButton();

    this.addChildren({ avatar, userData, button });
  }

  private static _initAvatar() {
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

  private _initUserData() {
    const userData = new UserData({
      props: {
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
      this._initInputsData();
      return false;
    }

    return true;
  }
}

export default ProfileForm;
