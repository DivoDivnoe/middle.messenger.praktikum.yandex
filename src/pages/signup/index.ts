import template from './signup.hbs';
import signupStyles from '../../modules/signupForm';
import signupPageStyles from './signup.module.css';
import buttonStyles from '../../components/button';
import inputStyles from '../../components/input';

window.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');

  if (!app) throw new Error('no #app element');

  app.classList.add(signupPageStyles.signupPage);
  app.innerHTML = template({ signupStyles, buttonStyles, inputStyles });
});
