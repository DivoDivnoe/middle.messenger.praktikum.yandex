import { TemplateDelegate } from 'handlebars';
import template from './profile.hbs';
import styles from './profile.module.css';
import BaseComponent from '@/utils/components/BaseComponent';
import Profile, { ProfileProps } from '@/modules/Profile';
import AvatarForm, { AvatarFormProps } from '@/modules/AvatarForm';
import BackArrow from '@/modules/BackArrow/BackArrow';
import withUserStore from '@/hocs/withUserStore';

const onSubmit = (value: FormDataEntryValue) => console.log(value);

class ProfilePage extends BaseComponent {
  constructor({ props = {}, listeners = {} }) {
    super({
      props: { ...props, styles, isVisiblePopup: false, avatar: { onSubmit } },
      listeners,
    });
  }

  protected override init(): void {
    const profile = new Profile({ props: this._props as ProfileProps });
    const arrowButton = new BackArrow() as BaseComponent;
    const avatarForm = new AvatarForm({
      props: this._props.avatar as AvatarFormProps,
    });

    this.addChildren({ profile, arrowButton, avatarForm });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }

  protected override componentDidUpdate(oldTarget: ProfileProps, target: ProfileProps): boolean {
    if (oldTarget.user !== target.user) {
      const profile = new Profile({ props: target });
      this.addChildren({ profile });
    }

    return true;
  }
}

export default withUserStore(ProfilePage);
