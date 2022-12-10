import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import { TemplateDelegate } from 'handlebars';
import template from './Button.hbs';
import styles from './Button.module.css';

export enum ButtonType {
  BUTTON = 'button',
  SUBMIT = 'submit',
}

export type ButtonProps = {
  content?: string;
  type?: ButtonType;
};

class Button extends BaseComponent {
  constructor({
    props: { content = '', type = ButtonType.BUTTON },
    listeners = {},
  }: ComponentProps<ButtonProps>) {
    super({ props: { content, styles, type }, listeners });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default Button;
