import template from './login.hbs';
import loginStyles from '../../modules/loginForm';
import * as loginPageStyles from './login.module.css';
import buttonStyles from '../../components/button';
import inputStyles from '../../components/input';

window.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');
  app.classList.add(loginPageStyles.loginPage);

  app.innerHTML = template({ loginStyles, buttonStyles, inputStyles });
});
