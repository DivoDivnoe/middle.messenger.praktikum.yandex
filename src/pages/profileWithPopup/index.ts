import styles from './profileWithPopup.module.css';
import renderDOM from '@/utils/helpers/renderDOM';
import ArrowButton from '@/components/ArrowButton';
import { UserProps } from '@/modules/UserData/UserData';
import Profile from '@/modules/Profile';
import AvatarForm from '@/modules/AvatarForm';

const mockUser: UserProps = {
  email: 'some.email@gmail.com',
  login: 'login',
  first_name: 'Andrey',
  second_name: 'Ivanov',
};

window.addEventListener('DOMContentLoaded', () => {
  const profile = new Profile({ props: { user: mockUser } });
  const arrowButton = new ArrowButton({ props: {} });
  const avatarForm = new AvatarForm({ props: {} });

  const app = renderDOM('#app', profile);
  renderDOM('#app', arrowButton);
  renderDOM('#app', avatarForm);

  app.classList.add(String(styles.profilePage));
});