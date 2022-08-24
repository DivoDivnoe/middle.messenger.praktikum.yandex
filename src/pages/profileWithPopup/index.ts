import template from './profileWithPopup.hbs';
import profileStyles from '../../modules/profile';
import avatarFormStyles from '../../modules/avatarForm';
import profilePageStyles from './profileWithPopup.module.css';
import avatarStyles from '../../components/avatar';
import buttonStyles from '../../components/button';
import userDataStyles from '../../modules/userData';
import arrowButtonStyles from '../../components/arrowButton';
import inputStyles from '../../components/input';

window.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');

  if (!app) throw new Error('no #app element');

  app.classList.add(profilePageStyles.profilePage);

  const user = {
    login: 'Andrey',
    name: 'Andrey',
    secondName: 'Ivanov',
    email: 'andrey.ivanov@gmail.ru',
    phone: '+7 (999) 999 99 99',
    displayedName: 'Andrey',
  };

  app.innerHTML = template({
    avatarStyles,
    userDataStyles,
    profileStyles,
    arrowButtonStyles,
    avatarFormStyles,
    inputStyles,
    buttonStyles,
    user,
  });
});
