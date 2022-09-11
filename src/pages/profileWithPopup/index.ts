import styles from './profileWithPopup.module.css';
import renderDOM from '@/utils/helpers/renderDOM';
import ArrowButton from '@/components/ArrowButton';
import { UserProps } from '@/modules/UserData/UserData';
import Profile from '@/modules/Profile';
import AvatarForm from '@/modules/AvatarForm';
import { ArrowButtonType } from '@/components/ArrowButton/ArrowButton';

const mockUser: UserProps = {
  email: 'some.email@gmail.com',
  login: 'login',
  first_name: 'Andrey',
  second_name: 'Ivanov',
};

window.addEventListener('DOMContentLoaded', () => {
  const profile = new Profile({ props: { user: mockUser } });
  const arrowButton = new ArrowButton({ props: { type: ArrowButtonType.SIDE } });
  const avatarForm = new AvatarForm({ props: { onSubmit: () => console.log('send file') } });

  const app = renderDOM('#app', profile);
  renderDOM('#app', arrowButton);
  renderDOM('#app', avatarForm);

  app.classList.add(String(styles.profilePage));
});
