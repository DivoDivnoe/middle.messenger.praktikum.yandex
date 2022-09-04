import styles from './profileForm.module.css';
import renderDOM from '@/utils/helpers/renderDOM';
import ArrowButton from '@/components/ArrowButton';
import { UserProps } from '@/modules/UserData/UserData';
import ProfileForm from '@/modules/ProfileForm';

const mockUser: UserProps = {
  email: 'some.email@gmail.com',
  login: 'login',
  first_name: 'Andrey',
  second_name: 'Ivanov',
};

window.addEventListener('DOMContentLoaded', () => {
  const profileForm = new ProfileForm({ props: { user: mockUser } });
  const arrowButton = new ArrowButton({ props: {} });

  const app = renderDOM('#app', profileForm);
  renderDOM('#app', arrowButton);

  app.classList.add(String(styles.profileFormPage));
});
