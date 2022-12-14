import { TemplateDelegate } from 'handlebars';
import template from './profile.hbs';
import styles from './profile.module.css';
import BaseComponent from '@/utils/components/BaseComponent';
import ArrowButton from '@/components/ArrowButton';
import { ArrowButtonType } from '@/components/ArrowButton/ArrowButton';
import Profile, { ProfileProps } from '@/modules/Profile';
import { UserProps } from '@/modules/UserData/UserData';
import AvatarForm, { AvatarFormProps } from '@/modules/AvatarForm';

const mockUser: UserProps = {
  email: 'some.email@gmail.com',
  login: 'login',
  first_name: 'Andrey',
  second_name: 'Ivanov',
  phone: '+79999999999',
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
    const arrowButton = new ArrowButton({ props: { type: ArrowButtonType.SIDE } });
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
