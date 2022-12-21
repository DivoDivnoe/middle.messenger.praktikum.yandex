import { TemplateDelegate } from 'handlebars';
import template from './profile.hbs';
import styles from './profile.module.css';
import BaseComponent from '@/utils/components/BaseComponent';
import Profile, { ProfileProps } from '@/modules/Profile';
import AvatarForm, { AvatarFormProps } from '@/modules/AvatarForm';
import BackArrow from '@/modules/BackArrow/BackArrow';
import { User } from '@/api/types';

const mockUser: User = {
  id: 111,
  email: 'some.email@gmail.com',
  login: 'login',
  first_name: 'Andrey',
  second_name: 'Ivanov',
  display_name: 'Andrey Ivanov',
  phone: '+79999999999',
  avatar: '',
};

const onSubmit = (value: FormDataEntryValue) => console.log(value);

class ProfilePage extends BaseComponent {
  // constructor({ props, listeners = {} }: ComponentProps<ProfileProps>) {
  constructor({ listeners = {} }) {
    // const { user } = props;

    super({
      props: { user: mockUser, styles, isVisiblePopup: false, avatar: { onSubmit } },
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

export default ProfilePage;
