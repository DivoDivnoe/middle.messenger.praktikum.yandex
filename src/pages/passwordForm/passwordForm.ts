import { TemplateDelegate } from 'handlebars';
import template from './passwordForm.hbs';
import styles from './passwordForm.module.css';
import BaseComponent from '@/utils/components/BaseComponent';
import PasswordForm from '@/modules/PasswordForm';
import BackArrow from '@/modules/BackArrow/BackArrow';

type PasswordFormPageProps = { styles: typeof styles };

class PasswordFormPage extends BaseComponent<PasswordFormPageProps> {
  constructor() {
    super({ props: { styles } });
  }

  protected override init(): void {
    const passwordFormComp = new PasswordForm();
    const arrowButton = new BackArrow();

    this.addChildren({ passwordFormComp, arrowButton });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default PasswordFormPage;
