import template from './500.hbs';
import styles from './500.module.css';
import errorStyles from '../../modules/errorMessage';

window.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');

  if (!app) throw new Error('no #app element');

  app.classList.add(styles.serverErrorPage);
  app.innerHTML = template({ errorStyles });
});
