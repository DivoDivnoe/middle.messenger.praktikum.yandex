import { TemplateDelegate } from 'handlebars';
import template from './404.hbs';
import styles from './404.module.css';
import BaseComponent from '@/utils/components/BaseComponent';
import ErrorMessage from '@/modules/ErrorMessage';

class NotFoundPage extends BaseComponent<{ styles: typeof styles }> {
  constructor() {
    super({ props: { styles } });
  }

  protected override init(): void {
    const errorMessage = new ErrorMessage({
      props: { errorCode: 404, errorText: 'Не туда попали' },
    });

    this.addChildren({ errorMessage });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default NotFoundPage;
