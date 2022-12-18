import { TemplateDelegate } from 'handlebars';
import template from './Profile.hbs';
import styles from './Profile.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import Avatar from '@/components/Avatar';
import { AvatarSize } from '@/components/Avatar/Avatar';
import UserData from '../UserData';
import { UserProps } from '../UserData/UserData';
import LogoutButton from '../LogoutButton';

export type ProfileProps = {
  user: UserProps;
};

class Profile extends BaseComponent {
  constructor({ props: { user }, listeners = {} }: ComponentProps<ProfileProps>) {
    super({
      props: { styles, user },
      listeners,
    });
  }

  protected override init(): void {
    const avatar = Profile._initAvatar();
    const userData = Profile._initUserData(this._props.user as UserProps);
    const logoutButton = Profile._initLogoutButton();

    this.addChildren({ avatar, userData, logoutButton });
  }

  private static _initAvatar(): Avatar {
    const avatar = new Avatar({
      props: {
        className: String(styles.avatar),
        size: AvatarSize.LARGE,
        isEditable: true,
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
