import { TemplateDelegate } from 'handlebars';
import template from './ProfileForm.hbs';
import styles from './ProfileForm.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import Avatar from '@/components/Avatar';
import { AvatarSize } from '@/components/Avatar/Avatar';
import UserData from '../UserData';
import { UserProps } from '../UserData/UserData';
import Button from '@/components/Button';
import { ButtonType } from '@/components/Button/Button';

type ProfileFormProps = {
  user: UserProps;
};

class ProfileForm extends BaseComponent {
  constructor({ props: { user }, listeners = {} }: ComponentProps<ProfileFormProps>) {
    const avatar = ProfileForm._initAvatar();
    const userData = ProfileForm._initUserData(user);
    const button = ProfileForm._initButton();

    super({
      props: { styles, avatar, userData, button, user },
      listeners,
    });
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

  private static _initUserData(user: UserProps): UserData {
    const userData = new UserData({
      props: {
        user,
        isEditable: true,
        className: String(styles.userData),
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
  ): void {
    if (oldTarget.user !== target.user) {
      this.getChild('userData')?.updateProps({ user: target.user });
    }
  }
}

export default ProfileForm;
