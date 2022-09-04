import styles from './passwordForm.module.css';
import renderDOM from '@/utils/helpers/renderDOM';
import PasswordForm from '@/modules/PasswordForm';
import ArrowButton from '@/components/ArrowButton';

window.addEventListener('DOMContentLoaded', () => {
  const passwordForm = new PasswordForm({ props: {} });
  const arrowButton = new ArrowButton({ props: {} });

  const app = renderDOM('#app', passwordForm);
  renderDOM('#app', arrowButton);

  app.classList.add(String(styles.passwordFormPage));
});
