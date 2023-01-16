import { TemplateDelegate } from 'handlebars';
import template from './Input.hbs';
import styles from './Input.module.css';
import BaseComponent, {
  ComponentDidUpdateType,
  ComponentProps,
} from '@/utils/components/BaseComponent';

export enum InputType {
  TEXT = 'text',
  NUMBER = 'number',
  EMAIL = 'email',
  PASSWORD = 'password',
  DATE = 'date',
  FILE = 'file',
}

export type InputPropsType = {
  id?: string;
  type?: InputType;
  placeholder?: string;
  name?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  validationRule?: RegExp;
};

export type InputProps = InputPropsType & { styles: typeof styles };

class Input<
  P extends InputPropsType = InputPropsType,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<InputProps> {
  constructor({ props, listeners = {} }: O) {
    const { type = InputType.DATE, value = '', required = false, disabled = false } = props;

    super({
      props: { ...props, styles, type, value, required, disabled },
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

  protected override componentDidUpdate: ComponentDidUpdateType<InputProps> = (
    oldTarget,
    target,
  ) => {
    if (
      oldTarget.disabled !== target.disabled ||
      (oldTarget.value !== target.value && !target.value?.length) ||
      (this._props.disabled && oldTarget.value !== target.value)
    )
      return true;

    return false;
  };
}

export default Input;
