import template from './404.hbs';
import * as styles from './404.module.css';
import errorStyles from '../../modules/errorMessage';

window.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');
  app.classList.add(styles.notFoundPage);

  app.innerHTML = template({ errorStyles });
});
