import template from './profile.hbs';
import profileStyles from '../../modules/profile';
import * as profilePageStyles from './profile.module.css';
import avatarStyles from '../../components/avatar';
import userDataStyles from '../../modules/userData';
import inputStyles from '../../components/input';

window.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');
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
    inputStyles,
    user,
  });
});
