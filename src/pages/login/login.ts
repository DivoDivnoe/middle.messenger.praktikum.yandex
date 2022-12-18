import { TemplateDelegate } from 'handlebars';
import template from './login.hbs';
import styles from './login.module.css';
import BaseComponent from '@/utils/components/BaseComponent';
import LoginForm from '@/modules/LoginForm';
import AuthController from '@/controllers/AuthController';

// const onSubmit = (login: string, password: string) => {
//   console.log(login, password);
// };

class LoginPage extends BaseComponent {
  constructor() {
    super({ props: { styles } });
  }

  protected override init(): void {
    const loginForm = new LoginForm({ props: { onSubmit: LoginPage._onSubmit } });

    this.addChildren({ loginForm });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }

  private static _onSubmit = (login: string, password: string) => {
    AuthController.signin({ login, password });
  };
}

export default LoginPage;
