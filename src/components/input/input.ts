import { TemplateDelegate } from 'handlebars';
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
  validationRule?: RegExp;
};

class Input extends BaseComponent {
  constructor({ props, listeners = {} }: ComponentProps<InputProps>) {
    const {
      type = InputType.DATE,
      value = '',
      required = false,
      disabled = false,
      validationRule,
    } = props;

    const inputProps = {
      ...props,
      type,
      value,
      required,
      disabled,
      styles,
      validationRule,
    };
    super({
      props: inputProps,
      listeners: {
        ...listeners,
        input: [
          (evt) => {
            this._props.value = evt.target.value;
          },
        ],
      },
    });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }

  public validate(): boolean {
    if (this._props.validationRule) {
      const isValid =
        this.extraValidate() &&
        (this._props.validationRule as RegExp).test(this._props.value as string);

      this.getContent().classList.toggle('error', !isValid);

      return isValid;
    }

    return true;
  }

  public extraValidate(): boolean {
    return true;
  }

  protected override componentDidUpdate(oldTarget: InputProps, target: InputProps): boolean {
    if (oldTarget.disabled !== target.disabled) return true;

    return false;
  }
}

export default Input;
