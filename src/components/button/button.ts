import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import { TemplateDelegate } from 'handlebars';
import template from './Button.hbs';
import styles from './Button.module.css';

export enum ButtonType {
  BUTTON = 'button',
  SUBMIT = 'submit',
}

export type ButtonPropsType = {
  content?: string;
  type?: ButtonType;
};

export type ButtonProps = ButtonPropsType & { styles: typeof styles };

class Button<
  P extends ButtonPropsType = ButtonPropsType,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<ButtonProps> {
  constructor({ props: { content = '', type = ButtonType.BUTTON }, listeners = {} }: O) {
    super({ props: { content, styles, type }, listeners });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default Button;
