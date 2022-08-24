import template from './signup.hbs';
import signupStyles from '../../modules/signupForm';
import * as signupPageStyles from './signup.module.css';
import buttonStyles from '../../components/button';
import inputStyles from '../../components/input';

window.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');
  app.classList.add(signupPageStyles.signupPage);

  app.innerHTML = template({ signupStyles, buttonStyles, inputStyles });
});
