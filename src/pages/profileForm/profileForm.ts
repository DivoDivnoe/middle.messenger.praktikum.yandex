import { TemplateDelegate } from 'handlebars';
import template from './profileForm.hbs';
import styles from './profileForm.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import ProfileForm from '@/modules/ProfileForm';
import BackArrow from '@/modules/BackArrow/BackArrow';
import { User } from '@/api/types';

// const mockUser: User = {
//   id: 111,
//   email: 'some.email@gmail.com',
//   login: 'login',
//   first_name: 'Andrey',
//   second_name: 'Ivanov',
//   display_name: 'Andrey Ivanov',
//   phone: '+79999999999',
//   avatar: '',
// };

type SubmitType = (...args: any[]) => void;

export type ProfileFormPageType = {
  user: User;
};

type ProfileFormPageProps = ProfileFormPageType & {
  styles: typeof styles;
  onSubmit: SubmitType;
};

const onSubmit: SubmitType = (...args) => {
  console.log(...args);
};

class ProfileFormPage<
  P extends ProfileFormPageType = ProfileFormPageType,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<ProfileFormPageProps> {
  constructor({ props: { user } }: O) {
    super({ props: { user, styles, onSubmit } });
  }

  protected override init(): void {
    const profileForm = new ProfileForm({ props: this._props });
    const arrowButton = new BackArrow() as BaseComponent;

    this.addChildren({ profileForm, arrowButton });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }

  protected override componentDidUpdate(
    oldTarget: ProfileFormPageProps,
    target: ProfileFormPageProps,
  ): boolean {
    if (oldTarget.user !== target.user || oldTarget.onSubmit !== target.onSubmit) {
      const profileForm = new ProfileForm({ props: target });
      this.addChildren({ profileForm });
    }

    return true;
  }
}

export default ProfileFormPage;
