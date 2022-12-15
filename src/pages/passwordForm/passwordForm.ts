import { TemplateDelegate } from 'handlebars';
import template from './passwordForm.hbs';
import styles from './passwordForm.module.css';
import BaseComponent from '@/utils/components/BaseComponent';
import PasswordForm, { PasswordFormProps } from '@/modules/PasswordForm';
import BackArrow from '@/modules/BackArrow/BackArrow';

const onSubmit = (...args: any[]) => {
  console.log(...args);
};

class PasswordFormPage extends BaseComponent {
  // constructor({ props, listeners = {} }: ComponentProps<PasswordFormProps>) {
  constructor() {
    // const { onSubmit } = props;

    super({ props: { onSubmit, styles } });
  }

  protected override init(): void {
    const passwordForm = new PasswordForm({ props: this._props as PasswordFormProps });
    // const arrowButton = new ArrowButton({ props: { type: ArrowButtonType.SIDE } });
    const arrowButton = new BackArrow() as BaseComponent;

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
      const passwordForm = new PasswordForm({ props: target });
      this.addChildren({ passwordForm });
    }

    return true;
  }
}

export default PasswordFormPage;
