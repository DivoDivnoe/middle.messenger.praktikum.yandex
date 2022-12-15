import { TemplateDelegate } from 'handlebars';
import template from './profileForm.hbs';
import styles from './profileForm.module.css';
import BaseComponent from '@/utils/components/BaseComponent';
import ProfileForm, { ProfileFormProps } from '@/modules/ProfileForm';
import { UserProps } from '@/modules/UserData/UserData';
import BackArrow from '@/modules/BackArrow/BackArrow';

const mockUser: UserProps = {
  email: 'some.email@gmail.com',
  login: 'login',
  first_name: 'Andrey',
  second_name: 'Ivanov',
  phone: '+79999999999',
};

const onSubmit = (...args: any[]) => {
  console.log(...args);
};

class ProfileFormPage extends BaseComponent {
  // constructor({ props, listeners = {} }: ComponentProps<ProfileFormProps>) {
  constructor() {
    super({ props: { user: mockUser, styles, onSubmit } });
  }

  protected override init(): void {
    const profileForm = new ProfileForm({ props: this._props as ProfileFormProps });
    // const arrowButton = new ArrowButton({ props: { type: ArrowButtonType.SIDE } });
    const arrowButton = new BackArrow() as BaseComponent;

    this.addChildren({ profileForm, arrowButton });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }

  protected override componentDidUpdate(
    oldTarget: ProfileFormProps,
    target: ProfileFormProps,
  ): boolean {
    if (oldTarget.user !== target.user || oldTarget.onSubmit !== target.onSubmit) {
      const profileForm = new ProfileForm({ props: target });
      this.addChildren({ profileForm });
    }

    return true;
  }
}

export default ProfileFormPage;
