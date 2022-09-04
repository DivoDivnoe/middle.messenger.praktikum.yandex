import styles from './login.module.css';
import LoginForm from '@/modules/LoginForm';
import renderDOM from '@/utils/helpers/renderDOM';

window.addEventListener('DOMContentLoaded', () => {
  const loginForm = new LoginForm({ props: {} });
  const app = renderDOM('#app', loginForm);

  app.classList.add(String(styles.loginPage));
});
