import { TemplateDelegate } from 'handlebars';
import template from './500.hbs';
import styles from './500.module.css';
import BaseComponent from '@/utils/components/BaseComponent';
import ErrorMessage from '@/modules/ErrorMessage';

class ServerErrorPage extends BaseComponent {
  constructor() {
    super({ props: { styles } });
  }

  protected override init(): void {
    const errorMessage = new ErrorMessage({
      props: { errorCode: 500, errorText: 'Мы уже фиксим' },
    });

    this.addChildren({ errorMessage });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default ServerErrorPage;
