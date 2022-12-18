import { TemplateDelegate } from 'handlebars';
import template from './login.hbs';
import styles from './login.module.css';
import BaseComponent from '@/utils/components/BaseComponent';
import LoginForm from '@/modules/LoginForm';

const onSubmit = (login: string, password: string) => {
  console.log(login, password);
};

class LoginPage extends BaseComponent {
  constructor() {
    super({ props: { styles } });
  }

  protected override init(): void {
    const loginForm = new LoginForm({ props: { onSubmit } });

    this.addChildren({ loginForm });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default LoginPage;
