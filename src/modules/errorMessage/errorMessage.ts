import { TemplateDelegate } from 'handlebars';
import template from './ErrorMessage.hbs';
import styles from './ErrorMessage.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';

type ErrorMessageProps = {
  errorCode: number;
  errorText: string;
};

class ErrorMessage extends BaseComponent {
  constructor({ props, listeners = {} }: ComponentProps<ErrorMessageProps>) {
    super({ props: { ...props, styles }, listeners });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default ErrorMessage;
