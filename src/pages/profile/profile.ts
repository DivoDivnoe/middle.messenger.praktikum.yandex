import { TemplateDelegate } from 'handlebars';
import template from './profile.hbs';
import styles from './profile.module.css';
import BaseComponent from '@/utils/components/BaseComponent';
import Profile from '@/modules/Profile';
import AvatarForm from '@/modules/AvatarForm';
import BackArrow from '@/modules/BackArrow/BackArrow';

type SubmitType = (value: FormDataEntryValue) => void;

const onSubmit: SubmitType = (value) => console.log(value);

type ProfilePageProps = {
  styles: typeof styles;
  isVisiblePopup: boolean;
  avatar: {
    onSubmit: SubmitType;
  };
};

export class ProfilePage extends BaseComponent<ProfilePageProps> {
  constructor() {
    super({ props: { styles, isVisiblePopup: false, avatar: { onSubmit } } });
  }

  protected override init(): void {
    const profile = new Profile();
    const arrowButton = new BackArrow();
    const avatarForm = new AvatarForm({ props: this._props.avatar });

    this.addChildren({ profile, arrowButton, avatarForm });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default ProfilePage;
