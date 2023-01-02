import { TemplateDelegate } from 'handlebars';
import template from './Profile.hbs';
import styles from './Profile.module.css';
import BaseComponent from '@/utils/components/BaseComponent';
import Avatar from '@/modules/Avatar';
import UserData from '../UserData';
import LogoutButton from '../LogoutButton';
import { AvatarSize } from '@/components/Avatar/Avatar';
import AvatarForm from '../AvatarForm';

export type ProfileProps = { isVisiblePopup: boolean; styles: typeof styles };

class Profile extends BaseComponent<ProfileProps> {
  constructor() {
    super({ props: { styles, isVisiblePopup: false } });
  }

  protected override init(): void {
    const avatar = this._initAvatar();
    const userData = Profile._initUserData();
    const logoutButton = Profile._initLogoutButton();
    const avatarForm = new AvatarForm();

    this.addChildren({ avatar, userData, logoutButton, avatarForm });
  }

  private _initAvatar() {
    const avatar = new Avatar({
      props: {
        className: String(styles.avatar),
        size: AvatarSize.LARGE,
        isEditable: true,
      },
      listeners: {
        click: [
          () => {
            this.updateProps({ isVisiblePopup: !this._props.isVisiblePopup });
          },
        ],
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
    return new LogoutButton();
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }

  private _onClickEscape = (evt: KeyboardEvent): void => {
    if (evt.code === 'Escape') {
      this.updateProps({ isVisiblePopup: false });
    }
  };

  private _subscribeKeydown() {
    document.addEventListener('keydown', this._onClickEscape);
  }

  private _unsubscribeKeydown() {
    document.removeEventListener('keydown', this._onClickEscape);
  }

  protected override componentDidUpdate(oldTarget: ProfileProps, target: ProfileProps): boolean {
    const hasChangedPopupState = oldTarget.isVisiblePopup !== target.isVisiblePopup;

    if (hasChangedPopupState) {
      if (target.isVisiblePopup) {
        this._subscribeKeydown();
      } else {
        this._unsubscribeKeydown();
      }
    }

    return hasChangedPopupState;
  }
}

export default Profile;
