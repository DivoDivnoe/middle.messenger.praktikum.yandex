import { TemplateDelegate } from 'handlebars';
import template from './passwordForm.hbs';
import styles from './passwordForm.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import PasswordForm from '@/modules/PasswordForm';
import BackArrow from '@/modules/BackArrow/BackArrow';

type SubmitType = (...args: any[]) => void;

export type PasswordFormPagePropsType = {
  src: string;
};

type PasswordFormPageProps = PasswordFormPagePropsType & {
  styles: typeof styles;
  onSubmit: SubmitType;
};

const onSubmit: SubmitType = (...args) => {
  console.log(...args);
};

class PasswordFormPage<
  P extends PasswordFormPagePropsType = PasswordFormPagePropsType,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<PasswordFormPageProps> {
  constructor({ props: { src } }: O) {
    super({ props: { onSubmit, styles, src } });
  }

  protected override init(): void {
    const passwordForm = new PasswordForm({
      props: { src: this._props.src, onSubmit: this._props.onSubmit },
    });
    // const arrowButton = new ArrowButton({ props: { type: ArrowButtonType.SIDE } });
    const arrowButton = new BackArrow() as BaseComponent;

    this.addChildren({ passwordForm, arrowButton });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default PasswordFormPage;
