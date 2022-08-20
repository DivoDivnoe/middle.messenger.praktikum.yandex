import template from './500.hbs';
import * as styles from './500.module.css';
import errorStyles from '../../modules/errorMessage';

window.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');
  app.classList.add(styles.serverErrorPage);

  app.innerHTML = template({ errorStyles });
});
