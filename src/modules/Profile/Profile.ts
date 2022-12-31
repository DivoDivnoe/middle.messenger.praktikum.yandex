import { TemplateDelegate } from 'handlebars';
import template from './Profile.hbs';
import styles from './Profile.module.css';
import BaseComponent from '@/utils/components/BaseComponent';
import Avatar from '@/modules/Avatar';
import UserData from '../UserData';
import LogoutButton from '../LogoutButton';
import { AvatarSize } from '@/components/Avatar/Avatar';

export type ProfileProps = { styles: typeof styles };

class Profile extends BaseComponent<ProfileProps> {
  constructor() {
    super({ props: { styles } });
  }

  protected override init(): void {
    const avatar = Profile._initAvatar();
    const userData = Profile._initUserData();
    const logoutButton = Profile._initLogoutButton();

    this.addChildren({ avatar, userData, logoutButton });
  }

  private static _initAvatar() {
    const avatar = new Avatar({
      props: {
        className: String(styles.avatar),
        size: AvatarSize.LARGE,
        isEditable: true,
      },
    });

    return avatar;
  }

  private static _initUserData() {
    const userData = new UserData({
      props: { isEditable: false, className: String(styles.userData) },
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
}

export default Profile;
