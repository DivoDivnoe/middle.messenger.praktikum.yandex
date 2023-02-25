import { TemplateDelegate } from 'handlebars';
import template from './ErrorMessage.hbs';
import styles from './ErrorMessage.module.css';
import BaseComponent, { ComponentProps } from '@/utils/components/BaseComponent';

type ErrorMessagePropsType = {
  errorCode: number;
  errorText: string;
};

type ErrorMessageProps = ErrorMessagePropsType & { styles: typeof styles };

class ErrorMessage<
  P extends ErrorMessagePropsType = ErrorMessagePropsType,
  O extends ComponentProps<P> = ComponentProps<P>,
> extends BaseComponent<ErrorMessageProps> {
  constructor({ props, listeners = {} }: O) {
    super({ props: { ...props, styles }, listeners });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default ErrorMessage;
