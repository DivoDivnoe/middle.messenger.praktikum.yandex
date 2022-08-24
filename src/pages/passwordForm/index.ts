import template from './passwordForm.hbs';
import passwordFormStyles from '../../modules/passwordForm';
import passwordFormPageStyles from './passwordForm.module.css';
import avatarStyles from '../../components/avatar';
import buttonStyles from '../../components/button';
import arrowButtonStyles from '../../components/arrowButton';
import inputStyles from '../../components/input';

window.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');

  if (!app) throw new Error('no #app element');

  app.classList.add(passwordFormPageStyles.passwordFormPage);
  app.innerHTML = template({
    avatarStyles,
    passwordFormStyles,
    arrowButtonStyles,
    buttonStyles,
    inputStyles,
  });
});
