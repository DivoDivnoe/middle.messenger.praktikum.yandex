import { TemplateDelegate } from 'handlebars';
import template from './PasswordFormBlock.hbs';
import styles from './PasswordFormBlock.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import PasswordForm, { PasswordFormProps } from '../PasswordForm/PasswordForm';
import ArrowButton from '@/components/ArrowButton';
import { ArrowButtonType } from '@/components/ArrowButton/ArrowButton';

class PasswordFormBlock extends BaseComponent {
  constructor({ props, listeners = {} }: ComponentProps<PasswordFormProps>) {
    const { onSubmit } = props;

    super({
      props: { onSubmit, styles },
      listeners,
    });
  }

  protected override init(): void {
    const passwordForm = new PasswordForm({ props: this._props as PasswordFormProps });
    const arrowButton = new ArrowButton({ props: { type: ArrowButtonType.SIDE } });

    this.addChildren({ passwordForm, arrowButton });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }

  protected override componentDidUpdate(
    oldTarget: PasswordFormProps,
    target: PasswordFormProps,
  ): boolean {
    if (oldTarget.onSubmit !== target.onSubmit) {
      const passwordForm = new PasswordForm({ props: this._props as PasswordFormProps });
      this.addChildren({ passwordForm });
    }

    return true;
  }
}

export default PasswordFormBlock;
