import { TemplateDelegate } from 'handlebars';
import template from './ProfileForm.hbs';
import styles from './ProfileForm.module.css';
import BaseComponent, {
  ComponentDidUpdateType,
  ComponentProps,
  IBaseComponent,
  PropsTypes,
} from '@/utils/components/BaseComponent';
import Avatar from '@/modules/Avatar';
import UserData from '../UserData';
import { ProfileProps, UserDataInputType } from '../UserData/UserData';
import Button from '@/components/Button';
import { ButtonType } from '@/components/Button/Button';
import { AvatarSize } from '@/components/Avatar/Avatar';
import withUserStore, { UserProps } from '@/hocs/withUserStore';
import userController from '@/controllers/UserController';

type InputsProps = Record<UserDataInputType, string>;

export type ProfileFormPropsType = UserProps;
export type ProfileFormProps = UserProps & {
  styles: typeof styles;
};

export class ProfileForm<
  P extends ProfileFormPropsType = ProfileFormPropsType,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<ProfileFormProps> {
  private _inputsData: InputsProps;

  constructor({ props: { user } }: O) {
    super({
      props: { user, styles },
      listeners: {
        submit: [
          async (evt) => {
            evt.preventDefault();

            if (
              (
                this.getChild('userData') as IBaseComponent<ProfileProps> & {
                  validate: () => boolean;
                }
              ).validate()
            ) {
              await this._onSubmit();
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

  protected override componentDidUpdate: ComponentDidUpdateType<ProfileFormProps> = (
    oldTarget,
    target,
  ) => {
    if (oldTarget.user !== target.user) {
      this._initInputsData();
      return false;
    }

    return true;
  };

  _onSubmit() {
    return userController.updateProfile(this._inputsData);
  }
}

export default withUserStore<PropsTypes>(ProfileForm);
