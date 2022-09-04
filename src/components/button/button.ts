import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';
import { TemplateDelegate } from 'handlebars';
import template from './Button.hbs';
import styles from './Button.module.css';

export enum ButtonType {
  BUTTON = 'button',
  SUBMIT = 'submit',
}

type BaseButtonProps = {
  content: string;
  type: ButtonType;
  styles: Record<string, string>;
};

export type ButtonProps = {
  content?: string;
  type?: ButtonType;
};

class Button extends BaseComponent<BaseButtonProps> {
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
