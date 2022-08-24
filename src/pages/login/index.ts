import template from './login.hbs';
import loginStyles from '../../modules/loginForm';
import loginPageStyles from './login.module.css';
import buttonStyles from '../../components/button';
import inputStyles from '../../components/input';

window.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');

  if (!app) throw new Error('no #app element');

  app.classList.add(loginPageStyles.loginPage);
  app.innerHTML = template({ loginStyles, buttonStyles, inputStyles });
});
