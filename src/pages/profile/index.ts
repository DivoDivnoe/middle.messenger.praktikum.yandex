import styles from './profile.module.css';
import renderDOM from '@/utils/helpers/renderDOM';
import ArrowButton from '../../components/ArrowButton';
import Profile from '../../modules/Profile';
import { UserProps } from '../../modules/UserData/UserData';
import { ArrowButtonType } from '../../components/ArrowButton/ArrowButton';

const mockUser: UserProps = {
  email: 'some.email@gmail.com',
  login: 'login',
  first_name: 'Andrey',
  second_name: 'Ivanov',
  phone: '+79999999999',
};

window.addEventListener('DOMContentLoaded', () => {
  const profile = new Profile({ props: { user: mockUser } });
  const arrowButton = new ArrowButton({ props: { type: ArrowButtonType.SIDE } });

  const app = renderDOM('#app', profile);
  renderDOM('#app', arrowButton);

  app.classList.add(String(styles.profilePage));
});
