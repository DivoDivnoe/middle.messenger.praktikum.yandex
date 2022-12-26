import { TemplateDelegate } from 'handlebars';
import template from './profile.hbs';
import styles from './profile.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import Profile, { ProfileProps } from '@/modules/Profile';
import AvatarForm from '@/modules/AvatarForm';
import BackArrow from '@/modules/BackArrow/BackArrow';
import withUserStore from '@/hocs/withUserStore';
import { User } from '@/api/types';

type SubmitType = (value: FormDataEntryValue) => void;

const onSubmit: SubmitType = (value) => console.log(value);

type ProfilePageType = {
  user: User;
};

type ProfilePageProps = ProfilePageType & {
  styles: typeof styles;
  isVisiblePopup: boolean;
  avatar: {
    src: string;
    onSubmit: SubmitType;
  };
};

export class ProfilePage<
  P extends ProfilePageType = ProfilePageType,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<ProfilePageProps> {
  constructor({ props, listeners = {} }: O) {
    super({
      props: {
        ...props,
        styles,
        isVisiblePopup: false,
        avatar: { src: props.user.avatar, onSubmit },
      },
      listeners,
    });
  }

  protected override init(): void {
    const profile = new Profile({ props: { user: this._props.user } });
    const arrowButton = new BackArrow() as BaseComponent;
    const avatarForm = new AvatarForm({ props: this._props.avatar });

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

export default withUserStore<ProfilePageProps>(ProfilePage);
