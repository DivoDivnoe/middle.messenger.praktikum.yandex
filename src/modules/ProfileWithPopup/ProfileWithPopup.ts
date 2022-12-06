import { TemplateDelegate } from 'handlebars';
import template from './ProfileWithPopup.hbs';
import styles from './ProfileWithPopup.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import AvatarForm, { AvatarFormProps } from '@/modules/AvatarForm';
import { ProfileProps } from '@/modules/Profile';
import ProfileBlock from '@/modules/ProfileBlock';

type ProfileWithPopupProps = {
  profile: ProfileProps;
  avatar: AvatarFormProps;
};

class ProfileWithPopup extends BaseComponent {
  constructor({ props, listeners = {} }: ComponentProps<ProfileWithPopupProps>) {
    const { profile, avatar } = props;

    super({
      props: { profile, styles, avatar },
      listeners,
    });
  }

  protected override init(): void {
    const profileBlock = new ProfileBlock({ props: this._props.profile as ProfileProps });
    const avatarForm = new AvatarForm({
      props: this._props.avatar as AvatarFormProps,
    });

    this.addChildren({ profileBlock, avatarForm });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }

  protected override componentDidUpdate(
    oldTarget: ProfileWithPopupProps,
    target: ProfileWithPopupProps,
  ): boolean {
    if (oldTarget.profile !== target.profile) {
      const profileBlock = new ProfileBlock({ props: target.profile });
      this.addChildren({ profileBlock });
    }

    if (oldTarget.avatar !== target.avatar) {
      const avatarForm = new AvatarForm({ props: target.avatar });
      this.addChildren({ avatarForm });
    }

    return true;
  }
}

export default ProfileWithPopup;
