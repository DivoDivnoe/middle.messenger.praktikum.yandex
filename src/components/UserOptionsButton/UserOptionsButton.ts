import { TemplateDelegate } from 'handlebars';
import template from './UserOptionsButton.hbs';
import styles from './UserOptionsButton.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';

export type UserOptionsButtonType = {
  isActive: boolean;
};

type UserOptionsButtonProps = UserOptionsButtonType & { styles: typeof styles };

class UserOptionsButton<
  P extends UserOptionsButtonType = UserOptionsButtonType,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<UserOptionsButtonProps> {
  constructor({ props, listeners = {} }: O) {
    super({ props: { ...props, styles }, listeners });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default UserOptionsButton;
