import { TemplateDelegate } from 'handlebars';
import template from './ProfileFormBlock.hbs';
import styles from './ProfileFormBlock.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import ArrowButton from '@/components/ArrowButton';
import { ArrowButtonType } from '@/components/ArrowButton/ArrowButton';
import ProfileForm, { ProfileFormProps } from '@/modules/ProfileForm';

class ProfileFormBlock extends BaseComponent {
  constructor({ props, listeners = {} }: ComponentProps<ProfileFormProps>) {
    const { user, onSubmit } = props;

    super({
      props: { user, styles, onSubmit },
      listeners,
    });
  }

  protected override init(): void {
    const profileForm = new ProfileForm({ props: this._props as ProfileFormProps });
    const arrowButton = new ArrowButton({ props: { type: ArrowButtonType.SIDE } });

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

export default ProfileFormBlock;
