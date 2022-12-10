import { TemplateDelegate } from 'handlebars';
import template from './ProfileBlock.hbs';
import styles from './ProfileBlock.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import ArrowButton from '@/components/ArrowButton';
import { ArrowButtonType } from '@/components/ArrowButton/ArrowButton';
import Profile, { ProfileProps } from '../Profile';

class ProfileBlock extends BaseComponent {
  constructor({ props, listeners = {} }: ComponentProps<ProfileProps>) {
    const { user } = props;

    super({
      props: { user, styles },
      listeners,
    });
  }

  protected override init(): void {
    const profile = new Profile({ props: this._props as ProfileProps });
    const arrowButton = new ArrowButton({ props: { type: ArrowButtonType.SIDE } });

    this.addChildren({ profile, arrowButton });
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

export default ProfileBlock;
