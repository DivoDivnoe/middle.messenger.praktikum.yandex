import styles from './profile.module.css';
import renderDOM from '@/utils/helpers/renderDOM';
import ArrowButton from '@/components/ArrowButton';
import Profile from '@/modules/Profile';
import { UserProps } from '@/modules/UserData/UserData';

const mockUser: UserProps = {
  email: 'some.email@gmail.com',
  login: 'login',
  first_name: 'Andrey',
  second_name: 'Ivanov',
};

window.addEventListener('DOMContentLoaded', () => {
  const profile = new Profile({ props: { user: mockUser } });
  const arrowButton = new ArrowButton({ props: {} });

  const app = renderDOM('#app', profile);
  renderDOM('#app', arrowButton);

  app.classList.add(String(styles.profilePage));
});
