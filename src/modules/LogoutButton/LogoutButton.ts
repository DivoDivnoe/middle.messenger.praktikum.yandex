import { TemplateDelegate } from 'handlebars';
import template from './LogoutButton.hbs';
import styles from './LogoutButton.module.css';
import BaseComponent from '@/utils/components/BaseComponent';
import AuthController from '@/controllers/AuthController';

type LogoutProps = {
  styles: typeof styles;
};

class LogoutButton extends BaseComponent<LogoutProps> {
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
