import { TemplateDelegate } from 'handlebars';
import template from './LogoutButton.hbs';
import styles from './LogoutButton.module.css';
import BaseComponent from '@/utils/components/BaseComponent';
import AuthController from '@/controllers/AuthController';

class LogoutButton extends BaseComponent {
  constructor() {
    super({
      props: { styles },
      listeners: {
        click: [
          () => {
            AuthController.logout();
          },
        ],
      },
    });
  }

  protected override getTemplate(): TemplateDelegate {
    return template;
  }
}

export default LogoutButton;
