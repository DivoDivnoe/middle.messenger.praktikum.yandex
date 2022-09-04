import { TemplateDelegate } from 'handlebars';
import template from './Profile.hbs';
import styles from './Profile.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import Avatar from '@/components/Avatar';
import { AvatarSize } from '@/components/Avatar/Avatar';
import UserData from '../UserData';
import { UserProps } from '../UserData/UserData';

type BaseProfileProps = {
  styles: Record<string, string>;
  avatar: Avatar;
  userData: UserData;
};

type ProfileProps = {
  user: UserProps;
};

class Profile extends BaseComponent<BaseProfileProps> {
  constructor({ props: { user }, listeners = {} }: ComponentProps<ProfileProps>) {
    const avatar = Profile._initAvatar();
    const userData = Profile._initUserData(user);

    super({
      props: { styles, avatar, userData },
      listeners,
    });
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

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default Profile;
