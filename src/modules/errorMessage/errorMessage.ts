import { TemplateDelegate } from 'handlebars';
import template from './ErrorMessage.hbs';
import styles from './ErrorMessage.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';

type BaseErrorMessageProps = {
  errorCode: number;
  errorText: string;
  styles: Record<string, string>;
};

type ErrorMessageProps = {
  errorCode: number;
  errorText: string;
};

class ErrorMessage extends BaseComponent<BaseErrorMessageProps> {
  constructor({ props, listeners = {} }: ComponentProps<ErrorMessageProps>) {
    super({ props: { ...props, styles }, listeners });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default ErrorMessage;
