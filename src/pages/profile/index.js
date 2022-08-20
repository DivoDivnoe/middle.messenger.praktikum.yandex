import template from './profile.hbs';
import profileStyles from '../../modules/profile';
import * as profilePageStyles from './profile.module.css';
import avatarStyles from '../../components/avatar';
import userDataStyles from '../../modules/userData';
import inputStyles from '../../components/input';

window.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');
  app.classList.add(profilePageStyles.profilePage);

  app.innerHTML = template({
    avatarStyles, userDataStyles, profileStyles, inputStyles,
  });
});
