import { TemplateDelegate } from 'handlebars';
import template from './Profile.hbs';
import styles from './Profile.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import Avatar from '@/components/Avatar';
import { AvatarSize } from '@/components/Avatar/Avatar';
import UserData from '../UserData';
import { UserProps } from '../UserData/UserData';
import LogoutButton from '../LogoutButton';

export type ProfilePropsType = { user: UserProps };
export type ProfileProps = ProfilePropsType & { styles: typeof styles };

class Profile<
  P extends ProfilePropsType = ProfilePropsType,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<ProfileProps> {
  constructor({ props: { user }, listeners = {} }: O) {
    super({ props: { styles, user }, listeners });
  }

  protected override init(): void {
    const avatar = Profile._initAvatar(this._props.user.avatar);
    const userData = Profile._initUserData(this._props.user as UserProps);
    const logoutButton = Profile._initLogoutButton();

    this.addChildren({ avatar, userData, logoutButton });
  }

  private static _initAvatar(src: string): Avatar {
    const avatar = new Avatar({
      props: {
        className: String(styles.avatar),
        size: AvatarSize.LARGE,
        isEditable: true,
        src,
      },
    });

    return avatar;
  }

  private static _initUserData(user: UserProps): UserData {
    const userData = new UserData({
      props: {
        user,
        isEditable: false,
        className: String(styles.userData),
      },
    });

    return userData;
  }

  private static _initLogoutButton(): LogoutButton {
    const logoutButton = new LogoutButton();

    return logoutButton;
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }

  protected override componentDidUpdate(oldTarget: ProfileProps, target: ProfileProps): boolean {
    if (oldTarget.user !== target.user) {
      (this.getChild('userData') as BaseComponent)?.updateProps({ user: target.user });
    }

    return true;
  }
}

export default Profile;
