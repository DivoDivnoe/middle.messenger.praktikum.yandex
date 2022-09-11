import Handlebars, { TemplateDelegate } from 'handlebars';
import template from './Input.hbs';
import styles from './Input.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';

export enum InputType {
  TEXT = 'text',
  NUMBER = 'number',
  EMAIL = 'email',
  PASSWORD = 'password',
  DATE = 'date',
  FILE = 'file',
}

export type InputProps = {
  id?: string;
  type?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
};

class Input extends BaseComponent {
  constructor({ props, listeners = {} }: ComponentProps<InputProps>) {
    const { type = InputType.DATE, value = '', required = false, disabled = false } = props;

    Handlebars.registerHelper('condition', (condition: boolean, value: string) =>
      condition ? value : '',
    );

    const inputProps = {
      ...props,
      type,
      value,
      required,
      disabled,
      styles,
    };
    super({ props: inputProps, listeners });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default Input;
